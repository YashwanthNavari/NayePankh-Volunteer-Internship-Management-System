import os
import re

root_dir = r"c:\Users\EikoMotsu\OneDrive\Documents\Desktop\My projects\nayenpakh foundation\nayepankh-volunteer-management-system"
path = os.path.join(root_dir, 'about.html')

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines, 1):
    # Find all divs or section opens/closes on this line
    tokens = re.findall(r'(<div[^>]*>|</div[^>]*>|<section[^>]*>|</section[^>]*>)', line)
    for token in tokens:
        if token.startswith('</'):
            tag = token[2:].split()[0].replace('>', '')
            if not stack:
                print(f"Line {i}: Error! Closing {tag} but stack is empty. Line content: {line.strip()}")
            else:
                last_open_i, last_open_tag = stack.pop()
                if last_open_tag != tag:
                    print(f"Line {i}: Mismatch! Closing {tag} but expected {last_open_tag} opened on line {last_open_i}")
        else:
            tag = token[1:].split()[0].replace('>', '')
            stack.append((i, tag))

print("Remaining in stack at EOF:")
for i, tag in stack:
    print(f"Opened on line {i}: {tag}")
