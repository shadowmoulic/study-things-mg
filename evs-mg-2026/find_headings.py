import re

with open("biodiversity_ugc_extracted.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

print("Searching for headings and section numbers...")
for i, line in enumerate(lines):
    # Match lines that look like heading numbers like "4.1", "4.2", "4.8", "UNIT 4", etc.
    match = re.search(r'^\s*(?:Unit|Section|CHAPTER)?\s*(\d+\.\d+)\s+(.*)', line, re.IGNORECASE)
    if match:
        print(f"Line {i+1}: {line.strip()}")
    elif "4.8" in line or "Page 94" in line or "page 94" in line or "PAGE 94" in line:
        print(f"Line {i+1} (match content): {line.strip()}")
