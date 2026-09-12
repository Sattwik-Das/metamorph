const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('body.html', 'utf8');

// Load HTML with cheerio, telling it not to wrap in html/head/body since we only have body content
const $ = cheerio.load(html, {
  xmlMode: true, // Use XML mode to ensure self-closing tags are handled correctly like <img />
});

// Remove unwanted tags
$('script').remove();
$('template').remove();
$('style').remove();
$('noscript').remove();

// Recursively clean up nodes
function cleanNode(node) {
  if (node.type === 'comment') {
    $(node).remove();
    return;
  }
  
  if (node.type === 'tag') {
    // Basic attribute replacements for JSX
    if (node.attribs) {
      const newAttribs = {};
      for (const attr in node.attribs) {
        let key = attr;
        let val = node.attribs[attr];

        // Replace class with className
        if (key === 'class') key = 'className';
        if (key === 'for') key = 'htmlFor';
        if (key === 'tabindex') key = 'tabIndex';
        if (key === 'crossorigin') key = 'crossOrigin';
        if (key === 'charset') key = 'charSet';
        
        // Convert dash-case SVG attributes to camelCase
        const svgAttributes = [
          'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule',
          'clip-path', 'fill-opacity', 'stroke-miterlimit', 'stroke-opacity'
        ];
        
        if (svgAttributes.includes(key)) {
          key = key.split('-').map((word, index) => index === 0 ? word : word[0].toUpperCase() + word.slice(1)).join('');
        }
        
        if (key.toLowerCase() === 'viewbox') key = 'viewBox';
        
        // Remove React-unfriendly keys
        if (key === 'fetchpriority' || key === 'data-precedence') {
          continue;
        }

        // Inline styles to objects
        if (key === 'style' && val) {
          const styleObj = {};
          val.split(';').filter(s => s.trim().length > 0).forEach(s => {
            const parts = s.split(':');
            if (parts.length >= 2) {
              let k = parts[0].trim();
              let v = parts.slice(1).join(':').trim();
              if (!k.startsWith('--')) {
                k = k.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
              }
              styleObj[k] = v;
            }
          });
          val = styleObj;
        }

        newAttribs[key] = val;
      }
      
      // Update node attributes
      node.attribs = {};
      for (const k in newAttribs) {
        if (k === 'style') {
          // Serialize style as JSON inside JSX syntax
          // Cheerio xmlMode will just render it as string, so we use a special marker
          node.attribs['__style__'] = JSON.stringify(newAttribs[k]);
        } else {
          node.attribs[k] = newAttribs[k];
        }
      }
    }
  }

  if (node.children) {
    node.children.forEach(cleanNode);
  }
}

$.root().children().each((i, el) => cleanNode(el));

let output = $.xml();

// Replace the __style__ marker with actual JSX style syntax
output = output.replace(/__style__="([^"]*)"/g, (match, jsonString) => {
  // jsonString is HTML escaped, so unescape it
  const unescaped = jsonString.replace(/&quot;/g, '"');
  return `style={${unescaped}}`;
});

// Cheerio xmlMode might render boolean attributes like autoPlay="" instead of autoPlay
// But Vite/React handles autoPlay="" fine.

// Wrap in component
const component = `
import { useEffect } from 'react';
import './live.css';

export default function App() {
  return (
    <>
      ${output}
    </>
  );
}
`;

fs.writeFileSync('src/App.tsx', component);
console.log('Successfully wrote exact JSX to src/App.tsx');
