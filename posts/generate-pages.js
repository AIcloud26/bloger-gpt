const fs = require('fs');
const path = require('path');

const posts = require('./data/posts.json');

const outputDir = path.join(__dirname, 'posts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// ✅ 自动生成 slug
function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

const template = fs.readFileSync(path.join(__dirname, 'post-template.html'), 'utf-8');

posts.forEach(p => {

  const slug = p.slug || slugify(p.title); // 👈 核心修复

  const content = template.replaceAll('{{title}}', p.title);

  const filePath = path.join(outputDir, `${slug}.html`);

  fs.writeFileSync(filePath, content);

  console.log('生成:', filePath);
});

console.log('✅ 全部页面生成完成！');