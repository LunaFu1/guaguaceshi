// ================================
// ✅ 登录状态识别与视图切换
// ================================
function applyLoginStateToHome() {
  // 判断用户是否已登录（本地存储 isLogin 为 '1' 即为登录态）
  const isLogin = localStorage.getItem('isLogin') === '1';  // true=登录，false=游客
  console.log("isLogin 状态：", isLogin); // 打印当前登录状态方便调试

  // 获取页面三大区域
  const guestHeader = document.getElementById('guest-header');   // 顶部游客 logo 区
  const guestWelcome = document.getElementById('guest-welcome'); // 欢迎区
  const clientSection = document.querySelector('.client-section'); // 真实客户区

  // 登录时只显示客户区，隐藏游客相关；否则显示游客相关
  if (isLogin) {
    if (guestHeader) guestHeader.style.display = 'none';      // 隐藏顶部游客logo卡
    if (guestWelcome) guestWelcome.style.display = 'none';    // 隐藏欢迎区
    if (clientSection) clientSection.style.display = 'block'; // 显示客户功能区
  } else {
    if (guestHeader) guestHeader.style.display = 'flex';      // 显示顶部logo卡，必须flex
    if (guestWelcome) guestWelcome.style.display = 'block';   // 显示欢迎区
    if (clientSection) clientSection.style.display = 'none';  // 隐藏客户区
  }
}

// ================================
// ✅ 退出登录并切换回游客视图
// ================================
function logoutUser() {
  localStorage.setItem('isLogin', '0'); // 把 isLogin 设为 0（未登录）
  applyLoginStateToHome();              // 立即切换视图（无需刷新页面）
  // window.location.reload(); // 如需彻底刷新页面可取消注释
}

// ================================
// ✅ 页面加载完成后自动执行一次登录状态判断
// ================================
document.addEventListener('DOMContentLoaded', function () {
  applyLoginStateToHome(); // 保证每次进页面都会按登录状态显示/隐藏
});

// ================================
// ✅ 轮播图区域（高级感轮播）
// ================================
const slides = document.querySelectorAll('.luxury-slide');     // 获取所有轮播图片
const dots = document.querySelectorAll('.luxury-dots .dot');   // 获取所有底部圆点
const carousel = document.querySelector('.luxury-carousel');   // 轮播主容器
let current = 0;         // 当前轮播下标
let autoSlideTimer = null; // 自动轮播计时器句柄

// 切换轮播图到指定下标
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);             // 只显示当前下标的图片
    if (dots[i]) dots[i].classList.toggle('active', i === index); // 同步高亮圆点
  });
  current = index; // 更新当前下标
}

// 重置自动轮播计时器（点击圆点或滑动时调用）
function resetAutoSlideTimer() {
  if (autoSlideTimer) clearInterval(autoSlideTimer); // 清除旧定时器
  autoSlideTimer = setInterval(() => {
    const next = (current + 1) % slides.length; // 下一个图片下标
    showSlide(next); // 切换显示
  }, 3000); // 每 3 秒切换一次
}

// 绑定圆点点击事件（点哪个切哪个）
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);          // 切换到对应下标
    resetAutoSlideTimer(); // 重置轮播定时
  });
});

// 初始化自动轮播 & 滑动交互
if (carousel && slides.length) {
  resetAutoSlideTimer();   // 自动开始轮播

  let startX = 0;             // 滑动起点
  let isDragging = false;     // 鼠标是否按下
  const threshold = 50;       // 滑动最小触发距离（像素）

  // 移动端：手指按下记录起点
  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  // 移动端：手指离开，判断滑动距离
  carousel.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
  });

  // PC端：鼠标按下
  carousel.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
  });

  // PC端：鼠标抬起
  document.addEventListener('mouseup', e => {
    if (!isDragging) return;  // 没有拖动直接返回
    isDragging = false;
    const endX = e.clientX;
    handleSwipe(endX - startX);
  });

  // 封装滑动判断
  function handleSwipe(deltaX) {
    if (deltaX > threshold) {
      // 向右滑动，上一张
      showSlide((current - 1 + slides.length) % slides.length);
      resetAutoSlideTimer();
    } else if (deltaX < -threshold) {
      // 向左滑动，下一张
      showSlide((current + 1) % slides.length);
      resetAutoSlideTimer();
    }
  }
}



// 资产金额显示/隐藏 - 小眼睛
function updateAssetBalance() {
  const assetValue = "≈ $12,345.67"; // 你可替换为真实数值变量
  const asset = document.getElementById('asset-balance');
  const eyeOpen = document.getElementById('eye-open');
  const eyeClosed = document.getElementById('eye-closed');
  // 读取本地偏好
  const isVisible = localStorage.getItem('assetVisible') !== '0';
  asset.textContent = isVisible ? assetValue : '****';
  eyeOpen.style.display = isVisible ? '' : 'none';
  eyeClosed.style.display = isVisible ? 'none' : '';
}
document.getElementById('toggle-balance').onclick = function() {
  const isVisible = localStorage.getItem('assetVisible') !== '0';
  localStorage.setItem('assetVisible', isVisible ? '0' : '1');
  updateAssetBalance();
};
updateAssetBalance();