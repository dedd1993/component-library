const glob = require("glob");
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const parseMarkdown =  require('./parseMarkdown');

markdownIt = new MarkdownIt();

buildJSON = (src, dest) => {
  glob(src, null, function (er, files) {
    const jsonArray = [];
    files.forEach(item => {
      const markDownContent = fs.readFileSync(item, 'utf8');
      const title = parseMarkdown.getTitle(markDownContent);
      const headers = parseMarkdown.getHeaders(markDownContent);

      const htmlContent = parseMarkdown.getContents(markDownContent)
        .map(section => {
          if (parseMarkdown.demoRegexp.test(section)) {
            return `<div style="border: 1px solid">${fs.readFileSync(section.slice(9, -1), 'utf8')}</div>`;
          } else {
            return markdownIt.render(section);
          }
        })
        .join('');

      jsonArray.push({ title, headers, htmlContent });
    });
    fs.writeFileSync(dest, JSON.stringify(jsonArray), 'utf8');
  });
}

const src = 'src/**/demo.md';
const dest = '../docs/src/assets/wc.manifest.json';
buildJSON(src, dest);
