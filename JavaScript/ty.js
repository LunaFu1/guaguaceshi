// 加载导航 HTML 文件
fetch("html/ty.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("bottom-nav-placeholder").innerHTML = html;

    // ✅ 加载完成后，再执行高亮逻辑
    const navLinks = document.querySelectorAll('.nav-item');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  });