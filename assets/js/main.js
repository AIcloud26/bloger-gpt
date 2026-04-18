let allPosts = [];

function getImage(category) {
  const map = {
    "AI Tools": "ai,technology",
    "Technology": "technology,future",
    "Finance": "finance,money",
    "Health": "health,fitness"
  };
  return `https://source.unsplash.com/400x200/?${map[category]}`;
}

fetch('/data/posts.json')
.then(res => res.json())
.then(data => {
  allPosts = data;
  render(data);
});

/* 渲染 */
function render(list) {
  const feed = document.getElementById('feed');
  feed.innerHTML = '';

  list.forEach((p,i) => {

    if(i % 6 === 0){
      feed.innerHTML += `
        <div class="ad-native">
          <span>Sponsored</span>
          <h3>Top AI Tools You Should Try</h3>
        </div>
      `;
    }

    feed.innerHTML += `
    <a href="#" class="card">
      <div class="relative">
        <img src="${p.image || getImage(p.category)}" class="card-img">
        <span class="badge">${p.category}</span>
      </div>

      <div class="p-3">
        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">Latest insights about ${p.category}</p>
      </div>
    </a>
    `;
  });
}

/* 分类筛选 */
document.querySelectorAll('.filter').forEach(btn=>{
  btn.onclick = () => {
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;

    if(cat === 'all') return render(allPosts);

    render(allPosts.filter(p=>p.category === cat));
  };
});

/* 搜索 */
document.getElementById('search').addEventListener('input', e=>{
  const keyword = e.target.value.toLowerCase();

  const filtered = allPosts.filter(p =>
    p.title.toLowerCase().includes(keyword)
  );

  render(filtered);
});
