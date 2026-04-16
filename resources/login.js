const form = document.querySelector(".loginForm");


form.addEventListener("submit", async function(e) {
e.preventDefault();


const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

if (!email || !password) {
    alert("Please fill all fields");
    return;
}

try {
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log("LOGIN STATUS:", res.status);
    console.log("LOGIN DATA:", data);

    alert(data.message);

    if (res.ok && data.message === "Login successful") {
        window.location.href = "index.html";
    }

} catch (err) {
    console.error("Login Error:", err);
    alert("Server not responding");
}


});


document.getElementById("registerBtn").addEventListener("click", async function() {


const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

console.log("Register clicked");

if (!email || !password) {
    alert("Please fill all fields");
    return;
}

try {
    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log("REGISTER STATUS:", res.status);
    console.log("REGISTER DATA:", data);

    alert(data.message);

    if (res.ok && data.message === "User registered successfully") {
        alert("Now login with same details");
    }

} catch (err) {
    console.error("Register Error:", err);
    alert("Server not responding");
}


});
