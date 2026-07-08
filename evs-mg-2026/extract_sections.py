with open("biodiversity_ugc_extracted.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

def save_section(name, start_line, end_line):
    # lines are 0-indexed in python list, but find_headings.py reported 1-indexed line numbers
    sec_lines = lines[start_line - 1 : end_line - 1]
    content = "".join(sec_lines)
    filename = f"section_{name}.txt"
    with open(filename, "w", encoding="utf-8") as out:
        out.write(content)
    print(f"Saved {filename} with {len(sec_lines)} lines and {len(content)} characters.")

save_section("4_1", 33, 221)
save_section("4_2", 221, 251)
save_section("4_3", 251, 525)
save_section("4_4", 525, 581)
save_section("4_5", 581, 654)
save_section("4_6", 654, 721)
save_section("4_7", 721, 947)
