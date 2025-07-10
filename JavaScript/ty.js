// 加载底部导航，并执行高亮逻辑
fetch("html/ty.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("bottom-nav-placeholder").innerHTML = html;

    // ✅ 等待一帧再执行高亮，确保 HTML 注入完成
    requestAnimationFrame(() => {
      const navLinks = document.querySelectorAll('.nav-item');
      let currentPath = window.location.pathname.split('/').pop().toLowerCase();

      // 有的浏览器 pathname 可能是 "/"，默认设为 index.html
      if (!currentPath || currentPath === '') {
        currentPath = 'index.html';
      }

      navLinks.forEach(link => {
        const href = link.getAttribute('href')?.toLowerCase();
        if (href && currentPath.includes(href)) {
          link.classList.add('active');
        }
      });
    });
  });
