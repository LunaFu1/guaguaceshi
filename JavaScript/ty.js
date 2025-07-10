fetch("html/ty.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("bottom-nav-placeholder").innerHTML = html;

    const navLinks = document.querySelectorAll('.nav-item');
    let currentPath = window.location.pathname.split('/').pop().toLowerCase();

    // ✅ 兼容 / 结尾（如移动端直接访问 /）
    if (!currentPath || currentPath === '') {
      currentPath = 'index.html';
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.toLowerCase();
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  });
