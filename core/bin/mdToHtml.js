const glob = require("glob");
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const parseMarkdown =  require('./parseMarkdown');

markdownIt = new MarkdownIt();

buildJSON = (src, dest) => {
  glob(src, null, function (er, files) {
    const jsonArray = [];
    files.forEach(item => {
      const componentApiMdPath = item.replace('demo', 'api');
      const apiMarkDownContent = fs.readFileSync(componentApiMdPath, 'utf8');
      const apiHtmlContent = markdownIt.render(apiMarkDownContent);

      const markDownContent = fs.readFileSync(item, 'utf8');
      const title = parseMarkdown.getTitle(markDownContent);
      const headers = parseMarkdown.getHeaders(markDownContent);

      const htmlContent = parseMarkdown.getContents(markDownContent)
        .map(section => {
          if (parseMarkdown.demoRegexp.test(section)) {
            const demoIdentifier = [...(section.split('/'))].pop();

            return (
              `<div demo="${demoIdentifier}">
                ${fs.readFileSync(section.slice(9, -1), 'utf8')}
              </div>`
            );
          } else {
            return markdownIt.render(section);
          }
        })
        .join('');

      jsonArray.push({ title, headers, htmlContent, apiHtmlContent });
    });

    fs.writeFileSync(dest, JSON.stringify(jsonArray), 'utf8');
  });
}

const src = 'src/**/demo.md';
const dest = '../docs/src/assets/wc.manifest.json';
buildJSON(src, dest);
