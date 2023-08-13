function showToast({
  title = "Title...",
  message = "message...",
  type = "success",
  duration = 3,
  delay = 3,
}) {
  const toastID = document.getElementById("toast");
  const types = {
    success: `fa-solid fa-circle-check`,
    info: `fa-solid fa-circle-info`,
    warning: `fa-solid fa-circle-exclamation`,
    error: `fa-solid fa-triangle-exclamation `
  }

  if (toastID) {
    const divToast = document.createElement('div');
    //Thêm key frame
    createKeyframes('slideToLeft', 'fadeOut');
    divToast.classList.add('toast', `toast--${type}`);

    // Mặc định
    divToast.style.animation = `slideToLeft ease 0.7s, fadeOut linear ${duration}s ${delay}s forwards`;
    
    // Auto remove
       let timeout = setTimeout(function() {
        toastID.removeChild(divToast);
    }, (duration + delay) * 1000 );
    //Handle event
    divToast.onmouseover = function() {
        this.style.opacity = 1;
        divToast.style.animation = 'slideToLeft ease 0.7s';
        clearTimeout(timeout);
    }
    divToast.onmouseleave = function() {
        divToast.style.animation = `slideToLeft ease 0.7s, fadeOut linear ${duration}s ${delay}s forwards`;
        timeout = setTimeout(function() {
            toastID.removeChild(divToast);
        }, (duration + delay) * 1000 );
    }
    // bấm vào button close
    divToast.onclick = function(e) {
        if(e.target.closest('.toast__close')) {
            toastID.removeChild(divToast);
            //Phải clear timeout vì nếu không thì nó sẽ bị lỗi vì nó chạy tiếp hàm setTimeout
            clearTimeout(timeout);
        }
    }
    divToast.innerHTML =`
    <div class="toast__icon">
        <i class="${types[type]}"></i>
      </div>
      <div class="toast__body">
        <h3 class="toast__title">${title}</h3>
        <p class="toast__msg">
            ${message}
        </p>
      </div>
      <div class="toast__close">
        <i class="fa-solid fa-xmark"></i>
    </div>
        `; 
    toastID.appendChild(divToast);
  }
}

showToast({
  title: "Success",
  message: "Anyone with acssess is allowed to seeeeeeeeeeeee this message",
  type: "error",
  duration: 3,
  delay: 3,
});

// Tạo keyframes bằng Javascript 
function createKeyframes(name1, name2) {
    const styleSheet = document.styleSheets[0]; // Chọn stylesheet (thay đổi số 0 nếu cần)
    const keyframesRule1 = `
    @keyframes ${name1} {
        from {
            opacity: 0;
            transform: translateX(calc(100% + 30px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
    }`;
    const keyframesRule2 = `
    @keyframes ${name2} {
        to {
            opacity: 0;
            transform: translateX(calc(100% + 30px));
          }
    }`;
    styleSheet.insertRule(keyframesRule1);
    styleSheet.insertRule(keyframesRule2);
}

