const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Boolean attributes
code = code.replace(/ autoPlay=""/g, ' autoPlay');
code = code.replace(/ autoPlay /g, ' autoPlay ');
code = code.replace(/ muted=""/g, ' muted');
code = code.replace(/ loop=""/g, ' loop');
code = code.replace(/ playsInline=""/g, ' playsInline');
code = code.replace(/ async=""/g, ' async');
code = code.replace(/ noModule=""/g, ' noModule');
code = code.replace(/ data-list-empty=""/g, ' data-list-empty={true}');

// String true to boolean true for data attributes that expect booleans (though data-* usually expect string, TS might complain if mapped to known boolean props)
code = code.replace(/ data-search-triggers="true"/g, ' data-search-triggers={true}');
code = code.replace(/ data-search-panel-trigger="true"/g, ' data-search-panel-trigger={true}');
code = code.replace(/ data-search-container="true"/g, ' data-search-container={true}');
code = code.replace(/ data-landing="true"/g, ' data-landing={true}');

// Numbers
code = code.replace(/ tabIndex="([^"]+)"/g, ' tabIndex={$1}');

// Style string errors (e.g. style="...")
code = code.replace(/ style="([^"]*)"/g, ' style={{}}');
// Style object string errors (e.g. style={"{...}"})
code = code.replace(/ style=\{"([^"]*)"\}/g, ' style={{}}');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed boolean and number props');
