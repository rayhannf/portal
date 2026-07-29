document.addEventListener("DOMContentLoaded", () => {
    // ১. সিকিউরিটি চেক
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // ২. সাইডবারে নাম বসানো
    const userName = localStorage.getItem('userName');
    if (userName && document.getElementById('sidebar-name')) {
        document.getElementById('sidebar-name').innerText = userName;
    }

    // ৩. পাসওয়ার্ড পরিবর্তনের লজিক
    const passForm = document.getElementById('password-form');
    const msg = document.getElementById('pass-message');

    if (passForm) {
        passForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentPass = document.getElementById('current-pass').value;
            const newPass = document.getElementById('new-pass').value;
            const confirmPass = document.getElementById('confirm-pass').value;

            // LocalStorage থেকে আসল পাসওয়ার্ড নেওয়া (না থাকলে ডিফল্ট 'pass123')
            const storedPass = localStorage.getItem('userPassword') || 'pass123';

            // ভ্যালিডেশন চেক
            if (currentPass !== storedPass) {
                msg.style.color = 'red';
                msg.innerText = "❌ Current password is incorrect!";
                return;
            }

            if (newPass.length < 6) {
                msg.style.color = 'red';
                msg.innerText = "❌ New password must be at least 6 characters!";
                return;
            }

            if (newPass !== confirmPass) {
                msg.style.color = 'red';
                msg.innerText = "❌ New passwords do not match!";
                return;
            }

            // পাসওয়ার্ড আপডেট করা
            localStorage.setItem('userPassword', newPass);
            msg.style.color = 'green';
            msg.innerText = "✅ Password updated successfully!";
            passForm.reset();

            // ৩ সেকেন্ড পর মেসেজ মুছে দেওয়া
            setTimeout(() => {
                msg.innerText = "";
            }, 3000);
        });
    }
});