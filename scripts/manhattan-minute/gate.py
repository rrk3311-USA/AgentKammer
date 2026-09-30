#!/usr/bin/env python3
"""Refuse a Manhattan Minute config that is not ready to build or publish.

Production needs a real date, a real deal, and a Pick / Consider / Wait / Pass
verdict. Placeholders stay unpublished. No en or em dashes.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

VERDICTS = {"Pick", "Consider", "Wait", "Pass"}
DASH = re.compile("[\u2013\u2014]")


def walk(obj, path=""):
    if isinstance(obj, dict):
        for key, value in obj.items():
            yield from walk(value, f"{path}.{key}" if path else key)
    elif isinstance(obj, list):
        for index, value in enumerate(obj):
            yield from walk(value, f"{path}[{index}]")
    elif isinstance(obj, str):
        yield path, obj


def inspect(cfg: dict) -> list[str]:
    errors = []
    date = str(cfg.get("date") or "").strip()
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
        errors.append("date must be YYYY-MM-DD")
    for key, value in walk(cfg):
        if DASH.search(value):
            errors.append(f"en or em dash in {key}")
    deal = cfg.get("deal") or {}
    verdict = str(deal.get("verdict") or "").strip()
    who = str(deal.get("who") or "").strip()
    address = str(cfg.get("r2") or "").strip()
    if verdict.lower() == "placeholder" or who.lower() == "placeholder":
        errors.append("deal.verdict / deal.who is placeholder (review only)")
    elif verdict and verdict.capitalize() not in VERDICTS:
        errors.append(f"deal.verdict must be Pick, Consider, Wait or Pass (got {verdict!r})")
    elif address and not verdict:
        errors.append("board has a deal (r2) but no deal.verdict")
    elif not address:
        errors.append("r2 (the deal) is empty")
    fine = str(cfg.get("fine") or "").strip()
    if fine and fine != "Educational commentary. Not advice. Opinions of Raphael Kammer.":
        errors.append("fine / disclaimer must use the exact approved wording")
    return errors


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def self_test() -> None:
    ready = {
        "date": "2026-09-30",
        "fine": "Educational commentary. Not advice. Opinions of Raphael Kammer.",
        "r2": "48 Jane Street",
        "deal": {"verdict": "Wait", "who": "pied-a-terre"},
    }
    assert inspect(ready) == []
    missing = dict(ready, r2="", deal={"verdict": ""})
    assert "r2 (the deal) is empty" in inspect(missing)
    placeholder = dict(ready, deal={"verdict": "placeholder"})
    assert any("placeholder" in item for item in inspect(placeholder))
    dashed = dict(ready, r3="five to eight")
    dashed["r3"] = "five–eight"
    assert any("dash" in item for item in inspect(dashed))
    print("gate self-test passed")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("config", nargs="?", type=Path)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return 0
    if not args.config:
        parser.error("config path required")
    errors = inspect(load(args.config))
    if errors:
        for item in errors:
            print(f"refusing: {item}", file=sys.stderr)
        return 2
    print(f"ready: {args.config}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
