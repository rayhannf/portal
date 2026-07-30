document.getElementById('loginForm').addEventListener('submit', function(event) {
    // ১. ফর্ম রিলোড হওয়া বন্ধ করা
    event.preventDefault();

    // ২. ইনপুট থেকে ভ্যালু নেওয়া
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // ৩. JSON থেকে ডেটা ফেচ করা
    fetch('./data/students.json')
        .then(response => response.json())
        .then(users => {
            
            // ৪. চেক করা ইউজারনেম ও পাসওয়ার্ড মেলে কি না (find মেথড ব্যবহার করে)
            const validUser = users.find(user => 
                user.username === usernameInput && user.password === passwordInput
            );

            if (validUser) {
                // ৫. লগিন সফল হলে LocalStorage-এ সেভ করা
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', validUser.name); // নাম সেভ রাখা ড্যাশবোর্ডে দেখানোর জন্য
                localStorage.setItem('userRole', validUser.role);

                // ৬. ড্যাশবোর্ডে পাঠিয়ে দেওয়া (রিডাইরেক্ট)
                window.location.href = 'dashboard.html';
            } else {
                // ৭. লগিন ফেল করলে এরর মেসেজ দেখানো
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error("ডেটা লোড করতে সমস্যা হয়েছে:", error);
        });
});

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        fetch('./data/students.json')
            .then(response => response.json())
            .then(users => {
                const validUser = users.find(user => 
                    user.username === usernameInput && user.password === passwordInput
                );

                if (validUser) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userName', validUser.name);
                    window.location.href = 'dashboard.html'; // লগিন হলে ড্যাশবোর্ডে যাবে
                } else {
                    errorMessage.style.display = 'block';
                }
            })
            .catch(error => console.error("Error:", error));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // ফর্ম রিলোড হওয়া বন্ধ করবে

            const usernameInput = document.getElementById("username").value.trim();
            const passwordInput = document.getElementById("password").value.trim();

            // ১. LocalStorage থেকে সেভ থাকা পাসওয়ার্ড চেক করা (না থাকলে ডিফল্ট 'pass123')
            const storedPassword = localStorage.getItem("userPassword") || "pass123";

            // ২. ইউজারনেম ও পাসওয়ার্ড মিলিয়ে দেখা
            if (usernameInput === "student01" && passwordInput === storedPassword) {
                // এরর মেসেজ লুকিয়ে ফেলা
                if (errorMessage) errorMessage.style.display = "none";

                // লগিন সেশন সেভ করা
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userName", "Abdur Rahman");

                // ড্যাশবোর্ডে রিডাইরেক্ট করা
                window.location.href = "dashboard.html";
            } else {
                // ভুল হলে সুন্দর এরর মেসেজ দেখানো
                if (errorMessage) {
                    errorMessage.style.display = "block";
                }
            }
        });
    }
});