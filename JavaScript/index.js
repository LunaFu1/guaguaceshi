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
  }, 5000); // ✅ 此处控制速度，单位：毫秒
});


// ✅ 高级感轮播控制脚本
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.luxury-slide');      // 所有轮播图片
  const dots = document.querySelectorAll('.luxury-dots .dot');    // 所有小圆点
  const carousel = document.querySelector('.luxury-carousel');    // 轮播图容器
  let current = 0;                                                 // 当前轮播图索引

  // ✅ 展示指定轮播图
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);              // 当前slide加active
      dots[i]?.classList.toggle('active', i === index);           // 当前圆点加active
    });
    current = index;
  }

  // ✅ 点击圆点切换轮播图
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // ✅ 自动轮播（每3秒切换一次）
  setInterval(() => {
    const next = (current + 1) % slides.length;                   // 计算下一个索引
    showSlide(next);                                             // 切换到下一张
  }, 3000);                                                      // 3000ms = 3秒

  // ================================
  // ✅ 滑动切换：手指滑动 & 鼠标拖动

  let startX = 0;            // 滑动起始X坐标
  let isDragging = false;    // 是否处于拖动状态
  const threshold = 50;      // 判定为滑动的最小移动距离

  // 👉 手指按下（移动端）
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;                                // 记录触摸起点X
  });

  // 👉 手指松开（移动端）
  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;                     // 获取结束触点X
    handleSwipe(endX - startX);                                   // 调用滑动处理函数
  });

  // 👉 鼠标按下（PC端）
  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;                                            // 标记拖动中
    startX = e.clientX;                                           // 记录鼠标起始X
  });

  // 👉 鼠标松开（PC端）
  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;                                      // 若未拖动则退出
    isDragging = false;                                           // 重置拖动状态
    const endX = e.clientX;                                       // 获取释放点X
    handleSwipe(endX - startX);                                   // 调用滑动处理函数
  });

  // ✅ 处理滑动方向并切换轮播图
  function handleSwipe(deltaX) {
    if (deltaX > threshold) {
      // 👉 向右滑 → 上一张
      const prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev);
    } else if (deltaX < -threshold) {
      // 👉 向左滑 → 下一张
      const next = (current + 1) % slides.length;
      showSlide(next);
    }
  }
});