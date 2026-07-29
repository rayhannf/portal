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
    // ১. সিকিউরিটি চেক: ইউজার লগিন করা আছে কি না
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn !== 'true') {
        // লগিন করা না থাকলে জোর করে লগিন পেজে পাঠিয়ে দেবে
        window.location.href = 'login.html';
    }

    // ২. ডাইনামিক নাম দেখানো
    const userName = localStorage.getItem('userName');
    
    if (userName) {
        // ওয়েলকাম মেসেজে নাম বসানো
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.innerText = `Welcome back, ${userName}!`;
        }
        
        // সাইডবারে নাম বসানো
        const sidebarName = document.getElementById('sidebar-name');
        if (sidebarName) {
            sidebarName.innerText = userName;
        }
    }
});