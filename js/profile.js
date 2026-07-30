document.addEventListener("DOMContentLoaded", () => {
    // ১. সিকিউরিটি চেক: ইউজার লগিন করা আছে কি না
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // ২. LocalStorage থেকে ইউজারের নাম নেওয়া
    const userName = localStorage.getItem('userName') || "Abdur Rahman";

    // সাইডবারে ইউজারের নাম বসানো
    const sidebarName = document.getElementById('sidebar-name');
    if (sidebarName) {
        sidebarName.innerText = userName;
    }

    // ৩. students.json থেকে ইউজারের বিস্তারিত তথ্য লোড করা
    fetch('./data/students.json')
        .then(response => response.json())
        .then(students => {
            // লগিন করা স্টুডেন্টের ডেটা খুঁজে বের করা
            const currentStudent = students.find(s => s.name === userName) || students[0];

            if (currentStudent) {
                // টপ হিরো কার্ডের (Banner) তথ্য বসানো
                const profileFullName = document.getElementById('profile-full-name');
                if (profileFullName) profileFullName.innerText = currentStudent.name || userName;

                // যদি তোমার HTML-এ এই আইডিগুলো থাকে, তবে সেগুলোতেও ডেটা বসবে:
                if (document.getElementById('profile-id')) {
                    document.getElementById('profile-id').innerText = `ID: ${currentStudent.id || "2026-CS-101"}`;
                }
                if (document.getElementById('profile-dept')) {
                    document.getElementById('profile-dept').innerText = currentStudent.department || "Computer Science & Engineering";
                }

                // পার্সোনাল ইনফরমেশন বসানো
                if (document.getElementById('profile-email')) {
                    document.getElementById('profile-email').innerText = currentStudent.email || "abdur.rahman@university.edu";
                }
                if (document.getElementById('profile-phone')) {
                    document.getElementById('profile-phone').innerText = currentStudent.phone || "+880 1711-223344";
                }
                if (document.getElementById('profile-blood')) {
                    document.getElementById('profile-blood').innerText = currentStudent.bloodGroup || "O+";
                }
                if (document.getElementById('profile-address')) {
                    document.getElementById('profile-address').innerText = currentStudent.address || "Dhaka, Bangladesh";
                }

                // একাডেমিক ইনফরমেশন বসানো
                if (document.getElementById('profile-program')) {
                    document.getElementById('profile-program').innerText = currentStudent.program || "B.Sc. in Computer Science";
                }
                if (document.getElementById('profile-semester')) {
                    document.getElementById('profile-semester').innerText = currentStudent.semester || "6th Semester";
                }
                if (document.getElementById('profile-cgpa')) {
                    document.getElementById('profile-cgpa').innerText = currentStudent.cgpa || "3.75";
                }
            }
        })
        .catch(error => {
            console.error("Error loading profile data:", error);
            // JSON লোড না হলেও যেন অন্তত ইউজারের নামটা হিরো কার্ডে দেখায়
            const profileFullName = document.getElementById('profile-full-name');
            if (profileFullName) profileFullName.innerText = userName;
        });
});