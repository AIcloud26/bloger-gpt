fetch('/data/posts.json')
.then(res => res.json())
.then(data => {
  const feed = document.getElementById('feed');

  data.forEach((p, i) => {

    // 插广告
    if (i % 5 === 0) {
      feed.innerHTML += `
        <div class="ad-native">
          <span>Sponsored</span>
          <h3>Best Tools You Should Try</h3>
        </div>
      `;
    }

    // 卡片
    feed.innerHTML += `
      <a href="#" class="card group">
        <div class="relative">
          <img src="${p.image}" class="card-img">
          <span class="badge">${p.category}</span>
        </div>

        <div class="p-3">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">Latest insights about ${p.category}</p>
        </div>
      </a>
    `;
  });
});
