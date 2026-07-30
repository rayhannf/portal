document.addEventListener("DOMContentLoaded", () => {
    // ১. লগিন করা না থাকলে লগিন পেজে পাঠিয়ে দেবে
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // ২. সাইডবারে নাম বসানো (সাইডবার লোড হওয়ার পর)
    setTimeout(() => {
        const userName = localStorage.getItem("userName") || "Rayhan Shorif";
        const sidebarName = document.getElementById("sidebar-name");
        if (sidebarName) sidebarName.innerText = userName;
    }, 100);

    // ৩. পাসওয়ার্ড পরিবর্তনের ফর্ম লজিক
    const passForm = document.getElementById("password-form");
    const msg = document.getElementById("pass-message");

    if (passForm) {
        passForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const currentPass = document.getElementById("current-pass").value;
            const newPass = document.getElementById("new-pass").value;
            const confirmPass = document.getElementById("confirm-pass").value;

            // LocalStorage থেকে বর্তমান পাসওয়ার্ড নেওয়া (না থাকলে 'pass123')
            const storedPass = localStorage.getItem("userPassword") || "pass123";

            // ভ্যালিডেশন চেক
            if (currentPass !== storedPass) {
                showMessage("❌ Current password is incorrect!", "error");
                return;
            }

            if (newPass.length < 6) {
                showMessage("❌ New password must be at least 6 characters!", "error");
                return;
            }

            if (newPass !== confirmPass) {
                showMessage("❌ New passwords do not match!", "error");
                return;
            }

            // নতুন পাসওয়ার্ড ব্রাউজারে সেভ করা
            localStorage.setItem("userPassword", newPass);
            showMessage("✅ Password updated successfully! You can now use this password to login.", "success");
            passForm.reset();
        });
    }

    function showMessage(text, type) {
        if (!msg) return;
        msg.innerText = text;
        msg.style.display = "block";
        
        if (type === "error") {
            msg.style.color = "#DC2626";
            msg.style.backgroundColor = "#FEF2F2";
            msg.style.border = "1px solid #FECACA";
        } else {
            msg.style.color = "#16A34A";
            msg.style.backgroundColor = "#DCFCE7";
            msg.style.border = "1px solid #BBF7D0";
        }

        setTimeout(() => {
            msg.style.display = "none";
        }, 4000);
    }
});