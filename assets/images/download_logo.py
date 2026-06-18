import urllib.request
import os

url = "https://assets.zyrosite.com/YKbL494Mv8Ip3qgy/logo-AVLW2LLWZkI8v845.png"
dest_dir = r"c:\Users\EikoMotsu\OneDrive\Documents\Desktop\My projects\nayenpakh foundation\nayepankh-volunteer-management-system\assets\images"
dest_path = os.path.join(dest_dir, "logo.png")

# Ensure directory exists
os.makedirs(dest_dir, exist_ok=True)

print(f"Downloading {url} to {dest_path}...")
try:
    urllib.request.urlretrieve(url, dest_path)
    print("Download completed successfully!")
except Exception as e:
    print(f"Error occurred: {e}")
