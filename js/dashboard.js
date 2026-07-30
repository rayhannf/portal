// dashboard.js এর একদম শুরুতে
if (localStorage.getItem('isLoggedIn') !== 'true') {
    // লগিন করা না থাকলে জোর করে লগিন পেইজে পাঠিয়ে দেবে
    window.location.href = 'login.html';
}

// লগআউট করার ফাংশন (যেকোনো বাটনের onclick-এ বসিয়ে দিতে পারো)
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

document.addEventListener("DOMContentLoaded", () => {
    // ১. লগিন চেক (লগিন না থাকলে login.html-এ পাঠাবে)
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // ২. সাইডবার এবং হেডারে ইউজারের নাম সেট করা
    const userName = localStorage.getItem("userName") || "Student";

    const sidebarName = document.getElementById("sidebar-name");
    if (sidebarName) sidebarName.innerText = userName;

    const welcomeText = document.getElementById("welcome-text");
    if (welcomeText) welcomeText.innerText = `Welcome back, ${userName}!`;
});
