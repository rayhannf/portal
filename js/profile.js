// ১. এডিট ফর্ম খোলার এবং বন্ধ করার ফাংশন
function toggleEditForm() {
    const editCard = document.getElementById("edit-profile-card");
    if (editCard) {
        if (editCard.style.display === "none") {
            editCard.style.display = "block";
            // ফর্মে বর্তমান ডেটাগুলো আগে থেকেই বসিয়ে দেওয়া
            document.getElementById("edit-name").value = localStorage.getItem("userName") || "Rayhan Shorif";
            document.getElementById("edit-id").value = localStorage.getItem("userId") || "202531073";
            document.getElementById("edit-email").value = localStorage.getItem("userEmail") || "rayhan.shorif@university.edu";
        } else {
            editCard.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // সিকিউরিটি চেক
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // ২. LocalStorage থেকে ডেটা লোড করা (না থাকলে ডিফল্ট ডেটা দেখাবে)
    const userName = localStorage.getItem("userName") || "Rayhan Shorif";
    const userId = localStorage.getItem("userId") || "202531073";
    const userEmail = localStorage.getItem("userEmail") || "rayhan.shorif@university.edu";

    // ৩. প্রোফাইল পেজের বিভিন্ন জায়গায় ডেটা বসানো
    const profileFullName = document.getElementById("profile-full-name");
    if (profileFullName) profileFullName.innerText = userName;

    // হিরো কার্ডের ID pill আপডেট করা (যদি ক্লাস বা আইডি থাকে)
    const idPill = document.querySelector(".m3-id-pill");
    if (idPill) idPill.innerText = `ID: ${userId}`;

    // পার্সোনাল ইনফরমেশন লিস্টের ইমেইল আপডেট করা
    const emailValue = document.querySelector(".m3-info-list li:first-child .info-value");
    if (emailValue) emailValue.innerText = userEmail;

    // ৪. ফর্ম সাবমিট হলে নতুন ডেটা LocalStorage-এ সেভ করা
    const editForm = document.getElementById("edit-profile-form");
    if (editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const newName = document.getElementById("edit-name").value.trim();
            const newId = document.getElementById("edit-id").value.trim();
            const newEmail = document.getElementById("edit-email").value.trim();

            if (newName && newId && newEmail) {
                // LocalStorage-এ সেভ করা
                localStorage.setItem("userName", newName);
                localStorage.setItem("userId", newId);
                localStorage.setItem("userEmail", newEmail);

                alert("✅ Profile updated successfully!");
                // পেজ রিফ্রেশ করা যাতে সব জায়গায় নতুন নাম চলে আসে
                window.location.reload();
            } else {
                alert("⚠️ Please fill in all fields.");
            }
        });
    }
});