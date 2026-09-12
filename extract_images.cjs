const fs = require('fs');
const text = fs.readFileSync('C:/Users/SOURADEEP/.gemini/antigravity-ide/brain/d24174d6-e5db-4ed3-8c9d-cebbcb0296eb/.system_generated/steps/180/content.md', 'utf8');

// Match base Sanity image URLs
const regex = /https:\/\/cdn\.sanity\.io\/images\/[^\s"'\?]+/g;
const matches = [...new Set(text.match(regex))];

fs.writeFileSync('extracted_images.txt', matches.join('\n'));
console.log('Extracted ' + matches.length + ' unique images.');
