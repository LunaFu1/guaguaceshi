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