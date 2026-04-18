const fs = require('fs');

const posts = require('./data/posts.json');

const template = fs.readFileSync('post-template.html', 'utf-8');

posts.forEach(p => {

  const content = template.replaceAll('{{title}}', p.title);

  fs.writeFileSync(`posts/${p.slug}.html`, content);

});

console.log('✅ 页面生成完成！');
