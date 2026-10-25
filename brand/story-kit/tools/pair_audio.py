#!/usr/bin/env python3
"""Pair a rendered cover + end panel with a Manhattan Minute voiceover into a 1080x1920 MP4.
The end panel crossfades in (0.5 s) when the last script line (the sign-off) starts, so it sits under the voiceover tail.
Usage: python3 tools/pair_audio.py COVER.png END.png AUDIO.mp3 [AUDIO.json] -o OUT.mp4
AUDIO.json is the timing file produce.sh writes next to the MP3 (lines[].start, total). Without it, the end panel takes the last 5 s."""
import argparse, json, subprocess, os
ap = argparse.ArgumentParser()
ap.add_argument('cover'); ap.add_argument('end'); ap.add_argument('audio'); ap.add_argument('timing', nargs='?')
ap.add_argument('-o', '--out', required=True)
a = ap.parse_args()
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.audio]).decode().strip())
t_end = max(dur - 5.0, 1.0)
if a.timing and os.path.exists(a.timing):
    j = json.load(open(a.timing)); dur = float(j.get('total', dur))
    if j.get('lines'): t_end = float(j['lines'][-1]['start'])
fade = 0.5; off = max(t_end - fade, 0.5)
cmd = ['ffmpeg', '-v', 'error', '-y',
       '-loop', '1', '-t', f'{t_end:.3f}', '-i', a.cover,
       '-loop', '1', '-t', f'{dur - t_end + fade + 0.2:.3f}', '-i', a.end,
       '-i', a.audio,
       '-filter_complex', f'[0:v]format=yuv420p,setsar=1[a];[1:v]format=yuv420p,setsar=1[b];[a][b]xfade=transition=fade:duration={fade}:offset={off:.3f}[v]',
       '-map', '[v]', '-map', '2:a', '-c:v', 'libx264', '-r', '30', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', a.out]
subprocess.run(cmd, check=True)
print(f'wrote {a.out}  (end panel from {t_end:.2f}s of {dur:.2f}s)')
