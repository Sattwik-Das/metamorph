const fs = require('fs');

let html = fs.readFileSync('body_clean.html', 'utf8');

// Basic attributes
html = html.replace(/class=/g, 'className=');
html = html.replace(/for=/g, 'htmlFor=');
html = html.replace(/tabindex=/g, 'tabIndex=');
html = html.replace(/crossorigin=/g, 'crossOrigin=');
html = html.replace(/charSet=/gi, 'charSet=');

// SVG attributes
const svgAttributes = [
  'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule',
  'clip-path', 'fill-opacity', 'stroke-miterlimit', 'stroke-opacity'
];

svgAttributes.forEach(attr => {
  const camel = attr.split('-').map((word, index) => index === 0 ? word : word[0].toUpperCase() + word.slice(1)).join('');
  const regex = new RegExp(attr + '=', 'gi');
  html = html.replace(regex, camel + '=');
});

// viewBox is special
html = html.replace(/viewbox=/gi, 'viewBox=');

// Auto-close void elements
const voidElements = ['img', 'input', 'br', 'hr', 'source', 'path', 'ellipse', 'circle', 'line', 'polygon', 'polyline', 'rect'];
voidElements.forEach(tag => {
  // Find tags that don't end with />
  const regex = new RegExp(`<${tag}\\b([^>]*?)(?<!/)>`, 'gi');
  html = html.replace(regex, `<${tag}$1 />`);
});

// Style strings to objects (basic implementation)
html = html.replace(/style="([^"]*)"/g, (match, styleString) => {
  const styles = styleString.split(';').filter(s => s.trim().length > 0);
  const styleObj = {};
  styles.forEach(s => {
    const parts = s.split(':');
    if (parts.length >= 2) {
      let key = parts[0].trim();
      let value = parts.slice(1).join(':').trim();
      
      // Convert key to camelCase (except CSS variables starting with --)
      if (!key.startsWith('--')) {
        key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      }
      
      styleObj[key] = value;
    }
  });
  return `style={${JSON.stringify(styleObj)}}`;
});

// Clean up some weird attributes Next.js uses that break JSX
html = html.replace(/fetchPriority="[^"]*"/g, '');
html = html.replace(/data-precedence="[^"]*"/g, '');

const component = `
import { useEffect } from 'react';
import './live.css';

export default function App() {
  return (
    <>
      ${html}
    </>
  );
}
`;

fs.writeFileSync('src/App.tsx', component);
console.log('Converted JSX written to src/App.tsx');
