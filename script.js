document.addEventListener("DOMContentLoaded", () => {
  // ===== MONKEY ANIMATION =====
  const passwordInput = document.getElementById("password");
  const monkey = document.querySelector(".monkey");

  if (monkey && passwordInput) {
    const face = monkey.querySelector(".face");
    const eyes = monkey.querySelectorAll(".eye");

    function coverEyes() {
      monkey.classList.add("hide");
    }

    function uncoverEyes() {
      monkey.classList.remove("hide");
      face.style.transform = "rotateX(0deg) rotateY(0deg)";
      eyes.forEach(eye => (eye.style.transform = "translate(0,0)"));
    }

    document.addEventListener("mousemove", e => {
      if (monkey.classList.contains("hide")) return;

      const rect = face.getBoundingClientRect();
      const faceX = rect.left + rect.width / 2;
      const faceY = rect.top + rect.height / 2;

      const deltaX = e.clientX - faceX;
      const deltaY = e.clientY - faceY;

      const rotateY = Math.max(Math.min(deltaX / 15, 15), -15);
      const rotateX = Math.max(Math.min(deltaY / 15, 10), -10);
      face.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      eyes.forEach(eye => {
        const eyeMoveX = Math.max(Math.min(deltaX / 25, 6), -6);
        const eyeMoveY = Math.max(Math.min(deltaY / 25, 6), -6);
        eye.style.transform = `translate(${eyeMoveX}px, ${eyeMoveY}px)`;
      });
    });

    passwordInput.addEventListener("focus", coverEyes);
    passwordInput.addEventListener("blur", uncoverEyes);
    passwordInput.addEventListener("input", () => {
      coverEyes();
      const val = passwordInput.value;
      if (val.length >= 8 && /[A-Z]/.test(val) && /\d/.test(val)) {
        setTimeout(() => {
          if (!passwordInput.matches(":focus")) return;
          monkey.classList.remove("hide");
        }, 400);
      }
    });
  }

  // ===== FORM SUBMISSION =====
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const usernameInput = document.querySelector('input[type="text"]'); // signup
      const emailInput = document.querySelector('input[type="email"]');  // login or signup

      if (usernameInput) {
        // SIGNUP page
        localStorage.setItem("username", usernameInput.value);
      } else if (emailInput) {
        // LOGIN page
        localStorage.setItem("username", emailInput.value);
      }

      // Redirect to welcome page
      window.location.href = "welcome.html";
    });
  }
});


