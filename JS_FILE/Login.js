document.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('.form');
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const email = document.querySelector('.email-form').value.trim();
		const password = document.querySelector('.pass-form').value;
		let users = JSON.parse(localStorage.getItem('signupUsers') || '[]');
		const user = users.find(u => u.email === email && u.password === password);
		if (user) {
			alert('✅ Đăng nhập thành công!');
			window.location.href = '.../Main/Main.html';
		} else {
			alert('❌ Email hoặc mật khẩu không đúng!');
		}
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
        
        fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`)
          .then(response => response.json())
          .then(userInfo => {
            console.log('User info:', userInfo);
            localStorage.setItem("user_info", JSON.stringify(userInfo));
            
            alert("✅ Đăng nhập thành công!");
            
            setTimeout(() => {
                window.location.href = "https://jason2k11.github.io/SPCK_WEB/Main/Main.html";
            }, 1500); 
          })
          .catch(error => {
            console.error('Error fetching user info:', error);
            alert("❌ Lỗi lấy thông tin người dùng!");
          });
      } else {
        alert("❌ Đăng nhập thất bại, vui lòng thử lại!");
      }
    },
  });
}

function signIn() {
  if (client) {
    client.requestAccessToken();
  } else {
    alert("Google Sign-In chưa được khởi tạo!");
  }
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