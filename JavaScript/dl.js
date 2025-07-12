// ========== 通用身份流转 ==========
function setLoginSuccess(userData) {
  localStorage.setItem('isLogin', '1'); // 标记已登录
  if (userData && userData.username) {
    localStorage.setItem('username', userData.username); // 存储用户名
  }
}

// ========== 通用校验 ==========
function isValidEmail(email) {
  // 校验邮箱格式
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
}
function isValidPassword(pwd) {
  // 至少8位，包含字母和数字，不允许特殊符号
  return pwd.length >= 8 && /[A-Za-z]/.test(pwd) && /\d/.test(pwd) && !/[^A-Za-z0-9]/.test(pwd);
}

// ========== 全局变量，存储当前验证码 ==========
let currentCaptcha = "";

// ========== 生成图片验证码 ==========
function generateCaptchaText() {
  // 随机生成4位数字
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// ========== 刷新验证码图片并同步验证码值 ==========
function refreshCaptcha() {
  setTimeout(function () {
    var captchaImg = document.getElementById("captchaImage");
    if (!captchaImg) return;
    var text = generateCaptchaText();   // 生成随机验证码
    currentCaptcha = text;              // 存到全局变量
    var bg = "ccc";
    var color = "000";
    captchaImg.src = "https://dummyimage.com/80x38/" + bg + "/" + color + "&text=" + text + "&" + Date.now();
  }, 0);
}

// ========== Toast中间弹窗提示方法 ==========
/**
 * showToast - 页面中央弹出自定义提示框
 * @param {string} msg   - 要显示的内容
 * @param {number} duration - 显示时间（毫秒，默认1.8秒）
 */
function showToast(msg, duration = 1800) {
  let toast = document.getElementById("toast"); // 获取toast元素
  if (!toast) {
    // 如果页面还没写toast元素，自动生成一个
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast hidden";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 350);
  }, duration);
}

// ========== DOM 事件注册 ==========
document.addEventListener("DOMContentLoaded", function () {
  // ===== 语言切换菜单 =====
  const languageBtn = document.getElementById("languageSwitch");
  const languageMenu = document.getElementById("languageMenu");
  if (languageBtn && languageMenu) {
    languageBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      languageMenu.classList.toggle("hidden");
    });
    document.addEventListener("click", function () {
      languageMenu.classList.add("hidden");
    });
    document.querySelectorAll(".lang-item").forEach(item => {
      item.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        languageMenu.classList.add("hidden");
        // TODO: 这里可以写多语言切换逻辑
      });
    });
  }

  // ===== 登录切换邮箱/用户名 =====
  const switchBtn = document.getElementById("switchLogin");
  const loginInput = document.getElementById("loginInput");
  if (switchBtn && loginInput) {
    let usingEmail = true;
    switchBtn.addEventListener("click", function () {
      usingEmail = !usingEmail;
      loginInput.placeholder = usingEmail ? "请输入邮箱" : "请输入用户名";
      switchBtn.textContent = usingEmail ? "使用用户名登录" : "使用邮箱登录";
    });
  }

  // ===== 登录按钮逻辑 =====
  const loginBtn = document.querySelector(".login-btn");
  const passwordInput = document.getElementById("passwordInput");
  if (loginBtn && loginInput && passwordInput && window.location.pathname.includes("dl")) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const username = loginInput.value.trim();
      const password = passwordInput.value.trim();
      if (!username || !password) {
        showToast("请输入完整信息");
        return;
      }
      if (loginInput.placeholder.includes("邮箱") && !isValidEmail(username)) {
        showToast("请输入正确的邮箱格式");
        return;
      }
      if (!isValidPassword(password)) {
        showToast("密码至少8位，含字母和数字，不允许特殊符号！");
        return;
      }
      setLoginSuccess({ username });
      window.location.href = "../index.html";
    });
  }

  // ===== 注册按钮逻辑 =====
  if (loginBtn && window.location.pathname.includes("zc")) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const email = document.getElementById("emailInput").value.trim();
      const username = document.getElementById("usernameInput").value.trim();
      const pwd = document.getElementById("passwordInput").value.trim();
      const pwd2 = document.getElementById("confirmPasswordInput").value.trim();
      const agree = document.getElementById("agreeCheckbox").checked;
      const captchaInput = document.querySelector('.captcha-group input')?.value.trim() || "";

      if (!isValidEmail(email)) {
        showToast("请输入正确的邮箱格式！");
        return;
      }
      if (!username) {
        showToast("请输入用户名！");
        return;
      }
      if (!isValidPassword(pwd)) {
        showToast("密码至少8位，含字母和数字，不允许特殊符号！");
        return;
      }
      if (pwd !== pwd2) {
        showToast("两次输入的密码不一致！");
        return;
      }
      if (!agree) {
        showToast("请阅读并同意《用户协议》和《隐私政策》");
        return;
      }
      // ====== 增加验证码校验 ======
      if (!captchaInput) {
        showToast("请输入验证码！");
        return;
      }
      if (captchaInput !== currentCaptcha) {
        showToast("验证码错误，请重新输入");
        refreshCaptcha();
        return;
      }

      // ========== 注册成功流程 ==========
      showToast("注册成功，请登录！");
      setTimeout(function () {
        window.location.href = "dl.html";
      }, 800);
      // 后端回调时只需要替换这一段
    });
  }

  // ===== 忘记密码提交按钮 =====
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn && window.location.pathname.includes("wjmm")) {
    resetBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const email = document.getElementById("emailInput").value.trim();
      const emailCode = document.getElementById("emailCodeInput").value.trim();
      const newPwd = document.getElementById("resetNewPasswordInput").value.trim();
      const newPwd2 = document.getElementById("confirmPasswordInput").value.trim();
      const imgCode = document.getElementById("imgCodeInput").value.trim();

      if (!isValidEmail(email)) {
        showToast("请输入正确的邮箱格式！");
        return;
      }
      if (!emailCode) {
        showToast("请输入邮箱验证码！");
        return;
      }
      if (!isValidPassword(newPwd)) {
        showToast("新密码至少8位，含字母和数字，不允许特殊符号！");
        return;
      }
      if (newPwd !== newPwd2) {
        showToast("两次输入的新密码不一致！");
        return;
      }
      if (!imgCode) {
        showToast("请输入图片验证码！");
        return;
      }
      setLoginSuccess({ username: email });
      window.location.href = "me.html";
    });
  }

  // ===== 忘记密码发送邮箱验证码 =====
  const sendEmailCodeBtn = document.getElementById("sendEmailCodeBtn");
  if (sendEmailCodeBtn) {
    sendEmailCodeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showToast("验证码已发送（前端模拟）");
    });
  }

  // ===== 刷新验证码图片 =====
  refreshCaptcha();
  const captchaImg = document.getElementById("captchaImage");
  if (captchaImg) {
    captchaImg.addEventListener("click", refreshCaptcha);
  }

  // ===== 忘记密码跳转 =====
  const goForget = document.getElementById("goForget");
  if (goForget) {
    goForget.addEventListener("click", function () {
      window.location.href = "wjmm.html";
    });
  }
});

// ========== 密码显示/隐藏切换通用 ==========
function togglePassword(inputId, el) {
  const input = inputId ? document.getElementById(inputId) : document.getElementById("passwordInput");
  if (!input) return;
  const type = input.getAttribute("type");
  input.setAttribute("type", type === "password" ? "text" : "password");
  if (el) el.textContent = type === "password" ? "🙈" : "👁️";
}

// ========== 密码强度条 ==========
function checkPasswordStrengthBar(inputId, barId) {
  const pwd = document.getElementById(inputId)?.value || '';
  const bar = document.getElementById(barId);
  if (!bar) return;
  const blocks = bar.querySelectorAll('.strength-block');
  if (pwd.length < 8) {
    blocks.forEach(block => block.style.background = "#e0e0e0");
    return;
  }
  let score = 0;
  if (/[A-Za-z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) score++;
  let color = "#e53935";
  if (score === 2) color = "#fbc02d";
  if (score === 3) color = "#43a047";
  blocks.forEach((block, idx) => {
    block.style.background = idx < score ? color : "#e0e0e0";
  });
}

