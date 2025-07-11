// ✅ 加载底部导航 HTML
fetch("html/ty.html")
  .then(res => res.text())                                // 请求导航 HTML 文件内容
  .then(html => {
    document.getElementById("bottom-nav-placeholder").innerHTML = html;  // 插入到页面中

    // ✅ 页面加载完成后执行高亮逻辑
    const currentUrl = window.location.href;                             // 获取当前完整地址
    const navLinks = document.querySelectorAll('.nav-item');            // 获取所有导航按钮

    navLinks.forEach(link => {
      const linkUrl = new URL(link.getAttribute('href'), window.location.origin).href; // 生成完整地址
      if (currentUrl === linkUrl) {
        link.classList.add('active');                                  // 匹配则添加高亮类
      }
    });

    // ✅ 给每个导航按钮添加无刷新点击事件
    navLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();                                       // 阻止默认跳转行为
        const href = link.getAttribute('href');                        // 获取目标地址

        fetch(href)
          .then(res => res.text())                                     // 请求目标页面
          .then(html => {
            const parser = new DOMParser();                             // 创建 HTML 解析器
            const doc = parser.parseFromString(html, 'text/html');     // 解析返回内容
            const newMain = doc.querySelector('main');                 // 提取 <main> 内容
            const currentMain = document.querySelector('main');

            if (newMain && currentMain) {
              currentMain.innerHTML = newMain.innerHTML;              // 替换当前页面主内容
              history.pushState(null, '', href);                       // 更新地址栏不刷新页面

              // ✅ 重新设置高亮（清除旧的，设置新的）
              navLinks.forEach(nav => nav.classList.remove('active'));
              link.classList.add('active');
            }
          })
          .catch(error => {
            console.error('页面加载失败：', error);                     // 错误处理
          });
      });
    });
  });

// ✅ 监听整个页面的 touchmove 事件
document.addEventListener('touchmove', function (e) {
  if (!e.target.closest('.scrollable')) {
    e.preventDefault(); // ❌ 如果不是 scrollable 区域，就禁止滑动
  }
}, { passive: false });

// ✅ 阻止 iOS 双指放大页面
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});