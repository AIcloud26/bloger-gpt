const fs = require('fs');
const path = require('path');

const posts = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'posts.json'), 'utf-8')
);

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

function generateContent(title) {
  return `
  <p>${title} is one of the most important topics in 2026.</p>

  <h2>Why It Matters</h2>
  <p>This topic helps improve productivity and efficiency.</p>

  <h2>Benefits</h2>
  <ul>
    <li>Save time</li>
    <li>Improve results</li>
    <li>Stay competitive</li>
  </ul>

  <h2>Conclusion</h2>
  <p>${title} is worth learning today.</p>
  `;
}

const template = fs.readFileSync(
  path.join(__dirname, 'post-template.html'),
  'utf-8'
);

const outputDir = path.join(__dirname, 'posts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const date = new Date().toISOString().split('T')[0];

posts.forEach((p, i) => {

  const title = p.title || `Post ${i}`;
  const slug = p.slug || slugify(title);
  const keyword = (p.category || 'technology').toLowerCase();

  let html = template;

  html = html.replaceAll('{{title}}', title);
  html = html.replaceAll('{{keyword}}', keyword);
  html = html.replaceAll('{{date}}', date);
  html = html.replace('{{content}}', generateContent(title));

  fs.writeFileSync(
    path.join(outputDir, slug + '.html'),
    html
  );

  console.log('生成:', slug);
});

console.log('完成');
