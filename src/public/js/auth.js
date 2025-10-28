const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

function toggleForm() {
  loginForm.style.display =
    loginForm.style.display === "none" ? "block" : "none";
  registerForm.style.display =
    registerForm.style.display === "none" ? "block" : "none";
}

async function login(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "/articles.html";
  } else {
    alert(data.message);
  }
}

async function register(event) {
  event.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  const response = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Registration successful! Please login.");
    toggleForm();
  } else {
    alert(data.message);
  }
}
