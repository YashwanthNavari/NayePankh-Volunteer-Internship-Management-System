import re
from bs4 import BeautifulSoup

file_path = r"C:\Users\EikoMotsu\.gemini\antigravity-ide\brain\fd780298-5d85-427b-8f62-af4682affc59\.system_generated\steps\52\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Clean metadata lines at the top
html_content = re.sub(r"^Title:.*?\n\n", "", html_content, flags=re.DOTALL)
html_content = re.sub(r"^Description:.*?\n\n", "", html_content, flags=re.DOTALL)
html_content = re.sub(r"^Source:.*?\n\n", "", html_content, flags=re.DOTALL)
html_content = re.sub(r"^---.*?\n\n", "", html_content, flags=re.DOTALL)

soup = BeautifulSoup(html_content, 'html.parser')

# Get all text
print("--- HEADINGS ---")
for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
    print(f"{h.name}: {h.get_text().strip()}")

print("\n--- IMAGES ---")
for img in soup.find_all('img'):
    print(f"SRC: {img.get('src') or img.get('data-src')} | ALT: {img.get('alt')}")

print("\n--- LINK TEXTS ---")
for a in soup.find_all('a'):
    text = a.get_text().strip()
    if text:
        print(f"LINK: {text} -> {a.get('href')}")
