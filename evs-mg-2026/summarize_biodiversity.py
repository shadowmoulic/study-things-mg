import re

with open("biodiversity_ugc_extracted.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Define start and end patterns for the sections based on line numbers or headers
sections = [
    ("4.1", "4.1 INTRODUCTION", "4.2 BIOGEOGRAPHIC CLASSIFICATION"),
    ("4.2", "4.2 BIOGEOGRAPHIC CLASSIFICATION", "4.3 VALUE OF BIODIVERSITY"),
    ("4.3", "4.3 VALUE OF BIODIVERSITY", "4.4 BIODIVERSITY AT GLOBAL"),
    ("4.4", "4.4 BIODIVERSITY AT GLOBAL", "4.5 INDIA AS A MEGA DIVERSITY"),
    ("4.5", "4.5 INDIA AS A MEGA DIVERSITY", "4.6 HOTSPOTS OF BIODIVERSITY"),
    ("4.6", "4.6 HOTSPOTS OF BIODIVERSITY", "4.7 THREATS TO BIODIVERSITY"),
    ("4.7", "4.7 THREATS TO BIODIVERSITY", "4.8 ENDANGERED AND ENDEMIC")
]

for sec_id, start_pat, end_pat in sections:
    print(f"\n================ SECTION {sec_id} ================")
    try:
        # Simple extraction between two keywords
        start_idx = text.lower().find(start_pat.lower())
        end_idx = text.lower().find(end_pat.lower(), start_idx)
        if start_idx != -1 and end_idx != -1:
            sec_text = text[start_idx:end_idx].strip()
            # Print the first 800 characters and last 400 characters to inspect
            print(sec_text[:800])
            print("\n... [TRUNCATED] ...\n")
            print(sec_text[-400:])
        else:
            print(f"Failed to locate start ({start_idx}) or end ({end_idx}) patterns.")
    except Exception as e:
        print(f"Error extracting section {sec_id}: {e}")
