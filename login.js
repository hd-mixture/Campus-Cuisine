const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const emailInput = document.getElementById("email");
const registerLink = document.querySelector('.register-link');
const btnPopup = document.getElementById('btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const btnheaderlogin = document.querySelector('.Navigationbarbutton');
const inputField = document.querySelector('.input-box input');
const aside = document.querySelector('.aside');
if (aside && document.querySelector('.login.css')) {
    aside.classList.add('blur');
}

emailInput.addEventListener('focus', () => {
    emailInput.classList.add('placeholder-style');
    emailInput.placeholder = "example@campus_cuisine.com";
});

emailInput.addEventListener('blur', () => {
    emailInput.classList.remove('placeholder-style');
    emailInput.placeholder = "";
});

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
    inputField.focus();
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    inputField.focus();
});

document.addEventListener('DOMContentLoaded', function() {
    const btnheaderlogin = document.querySelector('.Navigationbarbutton');
    const wrapper = document.querySelector('.wrapper');
    
    if (btnheaderlogin) {
        btnheaderlogin.addEventListener('click', () => {
            wrapper.classList.add('active-popup');
        });
    }
});

iconClose.addEventListener('click', () => {
    console.log("Close icon clicked!");
    wrapper.classList.remove('active-popup');
    // Disable input fields to prevent the keypad from showing
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.disabled = true;
    });
    // Re-enable input fields after a short delay
    setTimeout(() => {
        inputs.forEach(input => {
            input.disabled = false;
        });
    }, 100); // Adjust the delay time as needed
    loginLink.click();
});

// Get the eye icon elements
const passwordField = document.getElementById("password");
const togglePassword = document.querySelector(".password-toggle-icon i");

togglePassword.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  } else {
    passwordField.type = "password";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  }
});