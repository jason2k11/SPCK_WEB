document.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('.form');
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const email = document.querySelector('.email-form').value.trim();
		const password = document.querySelector('.pass-form').value;

		if (!/^([\w.-]+)@([\w.-]+)\.([A-Za-z]{2,})$/.test(email)) {
			alert('Email không hợp lệ.');
			return;
		}
		if (password.length < 6) {
			alert('Mật khẩu phải có ít nhất 6 ký tự.');
			return;
		}


		let users = JSON.parse(localStorage.getItem('signupUsers') || '[]');
		if (users.some(u => u.email === email)) {
			alert('Email đã được sử dụng.');
			return;
		}
		users.push({ email, password });
		localStorage.setItem('signupUsers', JSON.stringify(users));
		alert('Đăng ký thành công!');
		form.reset();
		window.location.href = 'Login.html';
	});
});


let client;

function initGoogleSignIn() {
  client = google.accounts.oauth2.initTokenClient({
    client_id: "206623596295-onc6vgg8pge6q88vufpqtukp8f98qtnd.apps.googleusercontent.com", 
    scope: "openid profile email",
    callback: (response) => {
      if (response.access_token) {

        localStorage.setItem("google_access_token", response.access_token);


        alert("✅ Đăng nhập thành công!");


        setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/Main/Main.html";
        }, 1500); 

      } else {
        alert("❌ Đăng nhập thất bại, vui lòng thử lại!");
      }
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const googleBtn = document.querySelector(".google-btn");

  if (googleBtn) {
    googleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!client) {
        initGoogleSignIn();
      }
      client.requestAccessToken();
    });
  }
});

