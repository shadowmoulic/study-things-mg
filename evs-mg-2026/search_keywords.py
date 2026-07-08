import os

txt_files = [
    "CA_3_June_10-26_extracted.txt",
    "ca_4-IT_june_26_extracted.txt",
    "biodiversity_ugc_extracted.txt"
]

for txt in txt_files:
    if os.path.exists(txt):
        print(f"=== Searching in {txt} ===")
        with open(txt, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Search for case-insensitive occurrences of marble, cancer, and gui
        for word in ["marble", "cancer", "guiyu", "nuclear", "borlaug", "1974", "1975"]:
            count = content.lower().count(word)
            print(f"'{word}': {count} occurrences")
            if count > 0:
                lines = content.split("\n")
                for line in lines:
                    if word in line.lower():
                        print(f"  Line: {line.strip()[:100]}")
    else:
        print(f"File not found: {txt}")
