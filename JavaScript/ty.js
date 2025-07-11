// ✅ 加载底部导航 HTML
fetch("html/ty.html")
  .then(res => res.text()) // 请求导航 HTML 文件内容
  .then(html => {
    document.getElementById("bottom-nav-placeholder").innerHTML = html; // 插入到底部

    highlightCurrentNav(); // ✅ 首页第一次加载时执行一次高亮

    const navLinks = document.querySelectorAll('.nav-item'); // 获取所有导航按钮

    // ✅ 给每个导航按钮添加无刷新点击事件
    navLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault(); // 阻止默认跳转行为
        const href = link.getAttribute('href'); // 获取目标地址

        fetch(href)
          .then(res => res.text()) // 请求目标页面
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newMain = doc.querySelector('main');
            const currentMain = document.querySelector('main');

            if (newMain && currentMain) {
              currentMain.innerHTML = newMain.innerHTML;
              history.pushState(null, '', href); // 替换地址栏

              highlightCurrentNav(); // ✅ 切换后也重新高亮
            }
          })
          .catch(error => {
            console.error('页面加载失败：', error);
          });
      });
    });
  });

// ✅ 当前导航高亮逻辑（兼容 index.html、/、完整路径）
function highlightCurrentNav() {
  const currentUrl = window.location.href;
  const navLinks = document.querySelectorAll('.nav-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkUrl = new URL(href, window.location.origin).href;

    const isActive =
      currentUrl === linkUrl ||
      currentUrl.endsWith(href) ||
      (href.endsWith("index.html") && (currentUrl.endsWith("/") || currentUrl === window.location.origin + "/"));

    link.classList.toggle('active', isActive);
  });
}

// ✅ 监听整个页面的 touchmove 事件
document.addEventListener('touchmove', function (e) {
  const scrollZone = e.target.closest('.scrollable');
  if (scrollZone && scrollZone.scrollHeight > scrollZone.clientHeight) {
    return; // ✅ 放行真正可以滚动的区域
  }
  e.preventDefault(); // 🚫 其他区域禁止滑动
}, { passive: false });
