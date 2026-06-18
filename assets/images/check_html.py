import os
import re

html_files = [
    'about.html',
    'contact.html',
    'dashboard.html',
    'index.html',
    'internship.html',
    'recommendation.html',
    'volunteer.html'
]

root_dir = r"c:\Users\EikoMotsu\OneDrive\Documents\Desktop\My projects\nayenpakh foundation\nayepankh-volunteer-management-system"

for f_name in html_files:
    path = os.path.join(root_dir, f_name)
    if not os.path.exists(path):
        print(f"File not found: {f_name}")
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check for duplicate IDs
    ids = re.findall(r'id=["\']([^"\']+)["\']', content)
    duplicates = set([x for x in ids if ids.count(x) > 1])
    if duplicates:
        print(f"[{f_name}] Duplicate IDs found: {duplicates}")
    else:
        print(f"[{f_name}] No duplicate IDs.")

    # Check for unclosed tags or syntax issues (very basic)
    # Check for matching tag count for some common containers
    divs_open = len(re.findall(r'<div', content))
    divs_close = len(re.findall(r'</div', content))
    if divs_open != divs_close:
        print(f"[{f_name}] Mismatched divs: open={divs_open}, close={divs_close}")
        
    sections_open = len(re.findall(r'<section', content))
    sections_close = len(re.findall(r'</section', content))
    if sections_open != sections_close:
        print(f"[{f_name}] Mismatched sections: open={sections_open}, close={sections_close}")
