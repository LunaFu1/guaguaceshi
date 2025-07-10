// 加载底部导航 HTML
fetch("html/ty.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("bottom-nav-placeholder").innerHTML = html;

    // ✅ 确保高亮逻辑在 HTML 注入后执行
    const navLinks = document.querySelectorAll('.nav-item');

    // 获取当前文件名，如果为空说明是目录，默认当作 index.html
    let currentPath = window.location.pathname.split('/').pop().toLowerCase();
    if (!currentPath) {
      currentPath = "index.html";
    }

    // 遍历导航项，匹配 href 相同的项加 active
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.toLowerCase();
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  });
