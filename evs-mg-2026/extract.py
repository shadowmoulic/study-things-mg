import pypdf
import os

def extract_pdf_text(pdf_path, txt_path):
    print(f"Extracting {pdf_path} to {txt_path}...")
    reader = pypdf.PdfReader(pdf_path)
    text = ""
    for i, page in enumerate(reader.pages):
        page_text = page.extract_text()
        text += f"\n--- Page {i+1} ---\n{page_text}\n"
    
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Extraction of {pdf_path} completed. Total length: {len(text)} characters.")

if __name__ == "__main__":
    files = [
        ("CA 3 June 10-26.pdf", "CA_3_June_10-26_extracted.txt"),
        ("ca 4-IT june 26.pdf", "ca_4-IT_june_26_extracted.txt"),
        ("biodiversity ugc.pdf", "biodiversity_ugc_extracted.txt")
    ]
    for pdf, txt in files:
        if os.path.exists(pdf):
            extract_pdf_text(pdf, txt)
        else:
            print(f"File not found: {pdf}")
