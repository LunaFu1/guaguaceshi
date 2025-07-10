document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('customerService')?.addEventListener('click', () => {
    console.log('客服图标被点击了');
  });

  document.getElementById('languageSwitch')?.addEventListener('click', () => {
    console.log('语言切换图标被点击了');
  });

  document.getElementById('registerBtn')?.addEventListener('click', () => {
    console.log('注册按钮被点击了');
  });
});
