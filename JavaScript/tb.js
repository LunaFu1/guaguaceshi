document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('customerService')?.addEventListener('click', () => {
    console.log('客服图标被点击了');
  });
});


// 语言切换功能
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('languageSwitch');
  const menu = document.getElementById('languageMenu');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // 避免冒泡关闭
    menu.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    menu.classList.add('hidden');
  });
});