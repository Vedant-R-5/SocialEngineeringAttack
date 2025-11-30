// main.js - manage a tiny "session", loan calculator, and small UI tweaks
document.addEventListener("DOMContentLoaded", ()=>{

  // Intercept forms that post to httpbin (they use target post_target iframe) and set a dummy session
  const postForms = document.querySelectorAll("form[action='http://httpbin.org/post']");
  postForms.forEach(form=>{
    form.addEventListener("submit", e=>{
      // Allow normal form submission (POST to httpbin in hidden iframe).
      // After initiating the POST, set a small local session and redirect to home.
      setTimeout(()=>{
        try{
          const em = (form.querySelector("input[name='email']")?.value
            || form.querySelector("input[name='fullname']")?.value
            || form.querySelector("input[name='name']")?.value
            || "learner@example.com");
          localStorage.setItem("kb_logged_in","true");
          localStorage.setItem("kb_user", em);
        }catch(err){}
        // Redirect to dashboard
        window.location.href = "home.html";
      }, 800);
    });
  });

  // Manage header buttons / logout visibility
  const logoutBtn = document.getElementById("logoutBtn");
  const dummyUserBtn = document.getElementById("dummyUserBtn");
  const dummySignupBtn = document.getElementById("dummySignupBtn");
  const logged = localStorage.getItem("kb_logged_in");
  const user = localStorage.getItem("kb_user");

  if(logoutBtn){
    if(logged){
      logoutBtn.style.display = "inline-flex";
      if(dummyUserBtn) dummyUserBtn.style.display = "none";
      if(dummySignupBtn) dummySignupBtn.style.display = "none";
    } else {
      logoutBtn.style.display = "none";
    }
    logoutBtn.addEventListener("click", ()=>{
      localStorage.removeItem("kb_logged_in");
      localStorage.removeItem("kb_user");
      window.location.href = "index.html";
    });
  }

  // Show user email in header if present
  if(user){
    // create a small user display
    const headerLeft = document.querySelector(".header-left");
    if(headerLeft && !document.getElementById("kbUserDisplay")){
      const el = document.createElement("div");
      el.id = "kbUserDisplay";
      el.style.marginLeft = "10px";
      el.style.fontWeight = "600";
      el.style.color = "#3b3b3b";
      el.textContent = `Signed in as ${user}`;
      headerLeft.appendChild(el);
    }
  }

  // Loan calculator
  const calcBtn = document.getElementById("calcLoan");
  if(calcBtn){
    calcBtn.addEventListener("click", (ev)=>{
      ev.preventDefault();
      const P = parseFloat(document.getElementById("loanAmount").value) || 0;
      const annualRate = parseFloat(document.getElementById("loanRate").value) || 0;
      const years = parseFloat(document.getElementById("loanTerm").value) || 0;
      if(P <= 0 || years <= 0){ document.getElementById("loanResult").textContent = "Enter valid values"; return; }
      const r = annualRate/100/12;
      const n = years*12;
      const monthly = r === 0 ? (P / n) : (P * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1));
      const total = monthly * n;
      document.getElementById("loanResult").textContent = `Monthly ≈ ₹${monthly.toFixed(2)} • Total ≈ ₹${total.toFixed(2)}`;
    });
  }

});
