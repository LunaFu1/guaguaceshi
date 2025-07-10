// ✅ 公告内容数组（后期可由后台 API 替代）
const announcements = [
  "小皮皮，你浪哥牛不牛逼！",
  "🔥 BTC 永续合约震撼上线，支持 100x 杠杆！",
  "🎁 注册即送 10 USDT 新手空投，限时领取！",
  "📣 限时交易返佣 50%，速来参与！"
];

// ✅ 获取滚动文字容器
const announcementText = document.getElementById("announcementText");

// ✅ 将每条公告包在红色 + 加粗的 span 中
const html = announcements.map(text =>
  `<span style="color: #ef4444; font-weight: bold;">${text}</span>`
).join("    "); // 使用空格控制间距

// ✅ 注入到页面中
announcementText.innerHTML = html;


// ✅ 高级感轮播控制脚本
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.luxury-slide');   // 所有轮播图片
  const dots = document.querySelectorAll('.luxury-dots .dot'); // 所有小圆点
  let current = 0;                                              // 当前索引

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);  // 控制当前图片显示
      dots[i]?.classList.toggle('active', i === index); // 防止空元素报错
    });
    current = index;
  }

  // ✅ 点击圆点切换
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // ✅ 自动轮播：每 3 秒切换一张
  setInterval(() => {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }, 3000); // ✅ 此处控制速度，单位：毫秒
});