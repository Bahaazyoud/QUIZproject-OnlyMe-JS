document.getElementById("Signin").onsubmit = function(e) {
    e.preventDefault();
    let email1 = document.getElementById("email1").value;
    let password1 = document.getElementById("password1").value;
    if (localStorage.getItem("password") == password1 && localStorage.getItem("Email") == email1) {
        window.location.href = "http://127.0.0.1:5500/QUIZproject-OnlyMe-JS/quiz%20page/index.html";
    }
    if (localStorage.getItem("Email") != email1) {
        document.getElementById("email1").value = '';
        document.querySelector("#email1").placeholder = "Wrong Email";
        document.querySelector("#email1").style.border = "2px solid red";

    }
    if (localStorage.getItem("password") != password1) {
        document.getElementById("password1").value = '';
        document.querySelector("#password1").placeholder = "Wrong Password";
        document.querySelector("#password1").style.border = "2px solid red";
    }
    return false;
}