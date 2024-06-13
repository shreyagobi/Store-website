document.querySelector("#login-submit").addEventListener("click", function () {
    console.log("Login button clicked");
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-passwd").value;

    if(email.includes("@gmail.com") && password.length >= 8) {
        alert("Login successful");
        window.location.href = "index.html";
    } else if (!email.includes("@gmail.com")) {
        alert("Invalid email");
    }
    else {
        alert("Password must be at least 8 characters long");
    }
});

console.log("login.js loaded");