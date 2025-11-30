// main.js - used by pages to manage a tiny "session" and auto-redirect after POST
document.addEventListener("DOMContentLoaded", ()=>{

  // If a login/signup form exists, intercept submit to set a session after submission
  const forms = document.querySelectorAll("form[target='post_target']");
  forms.forEach(form=>{
    form.addEventListener("submit", e=>{
      // Allow normal form submission to the hidden iframe (this creates the HTTP POST you capture)
      // After submission, set a small timeout and mark "loggedIn" in localStorage then redirect to home.
      // (We do not block the request — we let POST go to httpbin.)
      setTimeout(()=>{
        // store a dummy session
        try{
          const em = form.querySelector("input[name='email']")?.value || form.querySelector("input[name='fullname']")?.value || "learner@example.com";
          localStorage.setItem("kb_logged_in","true");
          localStorage.setItem("kb_user", em);
        }catch(e){}
        // redirect to home dashboard
        window.location.href = "home.html";
      }, 900); // quick delay to let the POST initiate
    });
  });

  // On dashboard pages show logout + user
  const logoutBtn = document.getElementById("logoutBtn");
  const userInfo = document.getElementById("userInfo");
  const userEmail = document.getElementById("userEmail");
  if(logoutBtn){
    logoutBtn.addEventListener("click", ()=> {
      localStorage.removeItem("kb_logged_in");
      localStorage.removeItem("kb_user");
      window.location.href = "index.html";
    });
  }
  // display user info
  const u = localStorage.getItem("kb_user");
  if(u && userInfo && userEmail){
    userEmail.textContent = u;
    userInfo.style.display = "inline-block";
  }

});
