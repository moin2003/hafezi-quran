import fitz
from PIL import Image
import os
import concurrent.futures

PDF_PATH = "Imdadia-Hafezi-Quran.pdf"
OUTPUT_DIR = "public/pages"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def process_page(args):
    page_idx, total = args
    doc = fitz.open(PDF_PATH)
    page = doc[page_idx]
    # Render at 180 DPI for crisp reading and high performance
    pix = page.get_pixmap(dpi=180)
    img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    w, h = img.size
    
    # Crop the bottom watermark text area
    cropped = img.crop((0, 0, w, h - 35))
    
    # Save as WebP
    out_file = os.path.join(OUTPUT_DIR, f"page_{page_idx}.webp")
    cropped.save(out_file, "WEBP", quality=82, method=6)
    doc.close()
    return page_idx

def main():
    doc = fitz.open(PDF_PATH)
    total_pages = len(doc)
    doc.close()
    print(f"Total pages to process: {total_pages}")
    
    tasks = [(i, total_pages) for i in range(total_pages)]
    with concurrent.futures.ProcessPoolExecutor() as executor:
        completed = 0
        for page_idx in executor.map(process_page, tasks):
            completed += 1
            if completed % 50 == 0 or completed == total_pages:
                print(f"Processed {completed}/{total_pages} pages...")
    print("All pages successfully extracted and optimized into WebP format!")

if __name__ == "__main__":
    main()
