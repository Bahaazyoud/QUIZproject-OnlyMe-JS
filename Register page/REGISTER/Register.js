document.getElementById("Register").onsubmit = function(e) {
    e.preventDefault();
    let FirstName = document.getElementById("firstname").value;
    let FirstNameRegex = /^[a-zA-Z_-\s]{3,15}$/;
    let validate = FirstNameRegex.test(FirstName);
    console.log(validate);
    if ((validate == false && FirstName == '')) {
        document.querySelector("#firstname").placeholder = "Type first name here..";
        document.querySelector("#firstname").style.border = "2px solid red";
    }
    if (validate == false && FirstName != '') {
        document.querySelector("#firstname").value = '';
        document.querySelector("#firstname").placeholder = "name from 3 to 15 char";
        document.querySelector("#firstname").style.border = "2px solid red";

    } else if (validate == true) {
        localStorage.clear();
        localStorage.setItem("FirstName", FirstName);
        document.querySelector("#firstname").style.border = "none";
    }
    let lastname = document.getElementById("lastname").value;
    let lastnameRegex = /^[a-zA-Z_-\s]{3,15}$/;
    let validate1 = lastnameRegex.test(lastname);
    if ((validate1 == false && lastname == '')) {
        document.querySelector("#lastname").placeholder = "Type last name here..";
        document.querySelector("#lastname").style.border = "2px solid red";

    }
    if (validate1 == false && lastname != '') {
        document.querySelector("#lastname").value = '';
        document.querySelector("#lastname").placeholder = "name from 3 to 15 char";
        document.querySelector("#lastname").style.border = "2px solid red";

    } else if (validate1 == true) {
        localStorage.setItem("LastName", lastname);
        document.querySelector("#lastname").style.border = "none";
    }
    let email = document.getElementById("email").value;
    let emailregex = /^([a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    let validate2 = emailregex.test(email);
    if (validate2 == false && email == '') {
        document.getElementById("email").placeholder = "Type Email here..";
        document.querySelector("#email  ").style.border = "2px solid red";
    }
    if (validate2 == false && email != '') {
        document.getElementById("email").value = '';
        document.querySelector("#email").placeholder = "name@address.domain";
        document.querySelector("#email").style.border = "2px solid red";
    } else if (validate2 == true) {
        localStorage.setItem("Email", email);
        document.querySelector("#email").style.border = "none";
    }
    let password = document.getElementById("password").value;
    let passregex = /(?=(.*[0-9]))(?=.*[!@#$%^&*])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    let validate3 = passregex.test(password);
    if (validate3 == false && password == '') {
        document.getElementById("password").placeholder = "Type Password here.."
        document.querySelector("#password").style.border = "2px solid red";
    }
    if (validate3 == false && password != '') {
        document.getElementById("password").value = '';
        document.querySelector("#password").placeholder = "num&upper&lower&.$"
        document.querySelector("#password").style.border = "2px solid red";
    } else if (validate3 == true) {
        localStorage.setItem("password", password);
        document.querySelector("#password").style.border = "none";
    }
    if (validate == true && validate1 == true && validate2 == true && validate3 == true) {
        window.location.href = "http://127.0.0.1:5500/QUIZproject-OnlyMe-JS/Register%20page/SIGNIN/index.html";
    }
    return false;
}