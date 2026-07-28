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