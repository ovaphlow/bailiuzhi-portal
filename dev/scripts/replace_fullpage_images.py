#!/usr/bin/env python3
import re, pathlib

PAGES = pathlib.Path(r"C:/Users/ovaph/Desktop/prototype/portal/src/pages")
DATA = pathlib.Path(r"C:/Users/ovaph/Desktop/prototype/portal/src/data")
BASE = "/assets/media/docs"

REPLACE = {
    f"{BASE}/company-profile/pages/v4-p15.jpg": f"{BASE}/company-profile/elements/v4-p15-a.jpg",
    f"{BASE}/company-profile/pages/v4-p20.jpg": f"{BASE}/company-profile/elements/v4-p20-a.jpg",
    f"{BASE}/company-profile/pages/v4-p24.jpg": f"{BASE}/company-profile/elements/v4-p24-a.jpg",
    f"{BASE}/company-profile/pages/v4-p27.jpg": f"{BASE}/company-profile/elements/v4-p27-a.jpg",
    f"{BASE}/company-profile/pages/v4-p31.jpg": f"{BASE}/company-profile/elements/v4-p31-a.jpg",
    f"{BASE}/company-profile/pages/v4-p32.jpg": f"{BASE}/company-profile/elements/v4-p32-a.jpg",
    f"{BASE}/company-profile/pages/v4-p33.jpg": f"{BASE}/company-profile/elements/v4-p33-a.jpg",
    f"{BASE}/company-profile/pages/v4-p34.jpg": f"{BASE}/company-profile/elements/v4-p34-a.jpg",
    f"{BASE}/company-profile/pages/v4-p36.jpg": f"{BASE}/company-profile/elements/v4-p36-a.jpg",
    f"{BASE}/company-profile/pages/v4-p44.jpg": f"{BASE}/company-profile/elements/v4-p44-a.jpg",
    f"{BASE}/company-profile/pages/v4-p45.jpg": f"{BASE}/company-profile/elements/v4-p45-a.jpg",
    f"{BASE}/company-profile/pages/v4-p47.jpg": f"{BASE}/company-profile/elements/v4-p47-a.jpg",
    f"{BASE}/company-profile/pages/v4-p48.jpg": f"{BASE}/company-profile/elements/v4-p48-a.jpg",
    f"{BASE}/company-profile/pages/v4-p49.jpg": f"{BASE}/company-profile/elements/v4-p49-a.jpg",
    f"{BASE}/company-profile/pages/v4-p50.jpg": f"{BASE}/company-profile/elements/v4-p50-a.jpg",
    # 3.0 -> 4.0 upgrade where 4.0 has the illustration
    f"{BASE}/company-profile/pages/page-27.jpg": f"{BASE}/company-profile/elements/v4-p27-a.jpg",
    f"{BASE}/company-profile/pages/page-36.jpg": f"{BASE}/company-profile/elements/v4-p36-a.jpg",
    f"{BASE}/company-profile/pages/page-41.jpg": f"{BASE}/company-profile/elements/v4-p41-a.jpg",
    f"{BASE}/company-profile/pages/page-42.jpg": f"{BASE}/company-profile/elements/v4-p42-a.jpg",
    # 3.0 fallback (4.0 unavailable)
    f"{BASE}/company-profile/pages/page-30.jpg": f"{BASE}/company-profile/elements3/v3-p30.jpg",
    f"{BASE}/company-profile/pages/page-39.jpg": f"{BASE}/company-profile/elements3/v3-p39.jpg",
    # machinery-annotate separate doc -> extracted elements
    f"{BASE}/machinery-annotate/pages/page-10.jpg": f"{BASE}/machinery-annotate/elements/ma-p10.jpg",
    f"{BASE}/machinery-annotate/pages/page-13.jpg": f"{BASE}/machinery-annotate/elements/ma-p13.jpg",
    f"{BASE}/machinery-annotate/pages/page-14.jpg": f"{BASE}/machinery-annotate/elements/ma-p14.jpg",
}

REMOVE = {
    f"{BASE}/company-profile/pages/v4-p16.jpg",
    f"{BASE}/company-profile/pages/v4-p17.jpg",
    f"{BASE}/company-profile/pages/v4-p23.jpg",
    f"{BASE}/company-profile/pages/v4-p28.jpg",
    f"{BASE}/company-profile/pages/v4-p29.jpg",
    f"{BASE}/company-profile/pages/v4-p35.jpg",
    f"{BASE}/company-profile/pages/v4-p37.jpg",
    f"{BASE}/company-profile/pages/v4-p38.jpg",
    f"{BASE}/company-profile/pages/v4-p39.jpg",
    f"{BASE}/company-profile/pages/page-25.jpg",
    f"{BASE}/company-profile/pages/page-26.jpg",
    f"{BASE}/company-profile/pages/page-28.jpg",
    f"{BASE}/company-profile/pages/page-29.jpg",
    f"{BASE}/machinery-annotate/pages/page-18.jpg",
    f"{BASE}/machinery-annotate/pages/page-21.jpg",
    f"{BASE}/machinery-annotate/pages/page-22.jpg",
}

PATH_RE = re.compile(r'(/assets/media/docs/[^"\'\s]+\.jpg)')


def process(lines):
    changed = False
    i = 0
    while i < len(lines):
        line = lines[i]
        m = PATH_RE.search(line)
        if not m:
            i += 1
            continue
        path = m.group(1)
        if path in REPLACE:
            lines[i] = line.replace(path, REPLACE[path])
            changed = True
            i += 1
            continue
        if path in REMOVE:
            # single-line Figure: <Figure img="..." />
            if line.strip().startswith("<Figure"):
                del lines[i]
                changed = True
                continue
            # prev non-empty line
            prev = None
            for j in range(i - 1, -1, -1):
                if lines[j].strip() != "":
                    prev = lines[j]
                    break
            if prev is not None and prev.strip().startswith("<Figure"):
                # multi-line Figure block: delete from <Figure to closing />
                fig_start = None
                for j in range(i - 1, -1, -1):
                    if lines[j].strip().startswith("<Figure"):
                        fig_start = j
                        break
                end = i
                while end < len(lines) and "/>" not in lines[end]:
                    end += 1
                del lines[fig_start:end + 1]
                changed = True
                continue
            # Feature block: remove img line + following alt/caption
            del lines[i]
            while i < len(lines) and re.search(r'^\s*(alt|caption)=', lines[i]):
                del lines[i]
            changed = True
            continue
        i += 1
    return changed


def main():
    targets = list(PAGES.glob("detail-*.astro")) + list(DATA.glob("*.ts"))
    for fp in targets:
        text = fp.read_text(encoding="utf-8")
        lines = text.split("\n")
        if process(lines):
            fp.write_text("\n".join(lines), encoding="utf-8")
            print("UPDATED:", fp.name)


if __name__ == "__main__":
    main()
