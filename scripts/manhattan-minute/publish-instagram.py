#!/usr/bin/env python3
"""Post a prepared Manhattan Minute MP4 as an Instagram Story.

Stories publish immediately. There is no draft. This command refuses to run
unless Raphi passes --i-approve-publish and the Graph API secrets are set.

Required env:
  IG_USER_ID          Instagram professional account id
  IG_ACCESS_TOKEN     long-lived token with instagram_content_publish

Optional:
  IG_VIDEO_PUBLIC_URL  already-hosted HTTPS URL for this exact MP4
  IG_GRAPH_VERSION     default v21.0
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

GRAPH = os.environ.get("IG_GRAPH_VERSION", "v21.0")


def die(message: str, code: int = 2) -> None:
    print(f"refusing: {message}", file=sys.stderr)
    sys.exit(code)


def graph(path: str, payload: dict) -> dict:
    token = os.environ.get("IG_ACCESS_TOKEN") or ""
    if not token:
        die("IG_ACCESS_TOKEN is not set")
    url = f"https://graph.facebook.com/{GRAPH}/{path.lstrip('/')}"
    body = urllib.parse.urlencode({**payload, "access_token": token}).encode()
    req = urllib.request.Request(url, data=body, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=120) as res:
            return json.loads(res.read().decode())
    except urllib.error.HTTPError as err:
        detail = err.read().decode()
        die(f"Graph API {err.code}: {detail}")


def wait_for_container(container_id: str) -> None:
    token = os.environ.get("IG_ACCESS_TOKEN") or ""
    url = (
        f"https://graph.facebook.com/{GRAPH}/{container_id}"
        f"?fields=status_code&access_token={urllib.parse.quote(token)}"
    )
    for _ in range(40):
        with urllib.request.urlopen(url, timeout=30) as res:
            status = json.loads(res.read().decode()).get("status_code")
        if status == "FINISHED":
            return
        if status in {"ERROR", "EXPIRED"}:
            die(f"container {container_id} status {status}")
        time.sleep(3)
    die(f"container {container_id} did not finish")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", type=Path, nargs="?")
    parser.add_argument(
        "--i-approve-publish",
        action="store_true",
        help="required. Stories go live immediately.",
    )
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    if not args.i_approve_publish:
        die("pass --i-approve-publish after Raphi has approved this exact file")
    if args.video:
        if not args.video.exists():
            die(f"missing video {args.video}")
        if args.video.suffix.lower() != ".mp4":
            die("video must be an mp4")
    user = os.environ.get("IG_USER_ID") or ""
    if not user:
        die("IG_USER_ID is not set")
    public_url = os.environ.get("IG_VIDEO_PUBLIC_URL") or ""
    if args.dry_run:
        print(
            json.dumps(
                {
                    "dry_run": True,
                    "video": str(args.video) if args.video else None,
                    "ig_user_id": user,
                    "has_public_url": bool(public_url),
                }
            )
        )
        return 0
    if not public_url:
        die(
            "IG_VIDEO_PUBLIC_URL is required. Host this MP4 on HTTPS, then set the URL. "
            "The end-card link sticker is still placed by hand on Instagram."
        )
    created = graph(f"{user}/media", {"media_type": "STORIES", "video_url": public_url})
    container_id = created.get("id")
    if not container_id:
        die(f"no container id in {created}")
    wait_for_container(container_id)
    published = graph(f"{user}/media_publish", {"creation_id": container_id})
    print(json.dumps({"published": published, "container": container_id}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
