const fs = require('fs');
const path = require('path');

const filePath = "C:\\Users\\EikoMotsu\\.gemini\\antigravity-ide\\brain\\fd780298-5d85-427b-8f62-af4682affc59\\.system_generated\\steps\\52\\content.md";

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract Headings
  console.log("=== HEADINGS ===");
  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1];
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    if (text) {
      console.log(`H${level}: ${text}`);
    }
  }

  // Extract Images
  console.log("\n=== IMAGES ===");
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  while ((match = imgRegex.exec(content)) !== null) {
    console.log(`IMG: ${match[1]}`);
  }

  // Extract Links
  console.log("\n=== LINKS ===");
  const linkRegex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    if (text) {
      console.log(`LINK: ${text} -> ${href}`);
    }
  }
} catch (err) {
  console.error("Error reading file:", err);
}
