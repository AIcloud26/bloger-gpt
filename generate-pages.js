const fs = require('fs');
const path = require('path');

// 👉 读取 JSON
const postsPath = path.join(__dirname, 'data', 'posts.json');

if (!fs.existsSync(postsPath)) {
  console.log('❌ 找不到 data/posts.json');
  process.exit(1);
}

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// 👉 slug
function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

// 👉 内容生成（基础版，可后续升级AI）
function generateContent(title) {
  return `
  <p>${title} is one of the most important topics in 2026. Many people are looking for practical ways to understand and apply it.</p>

  <h2>Why ${title} Matters</h2>
  <p>This topic can improve productivity, efficiency, and long-term growth.</p>

  <h2>Key Benefits</h2>
  <ul>
    <li>Save time and effort</li>
    <li>Improve results faster</li>
    <li>Stay competitive</li>
  </ul>

  <h2>How to Get Started</h2>
  <p>Start small, stay consistent, and focus on long-term improvement.</p>

  <h2>Conclusion</h2>
  <p>${title} is worth learning and applying today.</p>
  `;
}

// 👉 模板路径
const templatePath = path.join(__dirname, 'post-template.html');

if (!fs.existsSync(templatePath)) {
  console.log('❌ 找不到 post-template.html');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// 👉 输出目录
const outputDir = path.join(__dirname, 'posts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 👉 当前日期
const date = new Date().toISOString().split('T')[0];

// 👉 生成页面
posts.forEach((p, index) => {

  const title = p.title || `Post ${index}`;
  const slug = p.slug || slugify(title);
  const keyword = (p.category || 'technology').toLowerCase();

  let html = template;

  html = html.replaceAll('{{title}}', title);
  html = html.replaceAll('{{keyword}}', keyword);
  html = html.replaceAll('{{date}}', date);
  html = html.replace('{{content}}', generateContent(title));

  const filePath = path.join(outputDir, slug + '.html');

  fs.writeFileSync(filePath, html);

  console.log('✅ 生成:', slug + '.html');
});

console.log('🎉 全部页面生成完成！');
