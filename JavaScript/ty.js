// ✅ 加载底部导航 HTML
fetch("html/ty.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("bottom-nav-placeholder").innerHTML = html;

    highlightCurrentNav(); // ✅ 首次加载导航时高亮当前页

    const navLinks = document.querySelectorAll('.nav-item'); // 获取所有底部按钮

    // ✅ 为每个按钮添加“无刷新页面切换”
    navLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault(); // 阻止默认跳转

        const href = link.getAttribute('href');
        if (!href) return;

        fetch(href)
          .then(res => res.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newMain = doc.querySelector('main');
            const currentMain = document.querySelector('main');

            if (newMain && currentMain) {
              currentMain.innerHTML = newMain.innerHTML;
              history.pushState(null, '', href);
              highlightCurrentNav();

              // ✅ 🚀 判断是否回到首页，重新识别登录状态
              if (
                href.includes("index.html") &&
                typeof applyLoginStateToHome === "function"
              ) {
                applyLoginStateToHome(); // ✅ 首页展示身份状态
              }
            }
          })
          .catch(error => {
            console.error("页面加载失败：", error);
          });
      });
    });
  });


// ✅ 当前导航高亮逻辑（支持 index.html、/、完整路径）
function highlightCurrentNav() {
  const currentUrl = window.location.href;
  const navLinks = document.querySelectorAll('.nav-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkUrl = new URL(href, window.location.origin).href;

    const isActive =
      currentUrl === linkUrl ||
      currentUrl.endsWith(href) ||
      (href.endsWith("index.html") &&
        (currentUrl.endsWith("/") || currentUrl === window.location.origin + "/"));

    link.classList.toggle('active', isActive);
  });
}


// ✅ 禁止页面非内容区滑动，避免穿透
document.addEventListener('touchmove', function (e) {
  const scrollZone = e.target.closest('.scrollable');
  if (scrollZone && scrollZone.scrollHeight > scrollZone.clientHeight) {
    return; // ✅ 内容区域允许滑动
  }
  e.preventDefault(); // 🚫 非滚动区禁止滑动
}, { passive: false });
