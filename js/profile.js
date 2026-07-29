document.addEventListener("DOMContentLoaded", () => {
    // ১. সিকিউরিটি চেক: ইউজার লগিন করা আছে কি না
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // ২. LocalStorage থেকে ইউজারের নাম নেওয়া
    const userName = localStorage.getItem('userName');
    if (userName && document.getElementById('sidebar-name')) {
        document.getElementById('sidebar-name').innerText = userName;
    }

    // ৩. students.json থেকে ইউজারের বিস্তারিত তথ্য লোড করা
    fetch('./data/students.json')
        .then(response => response.json())
        .then(students => {
            // লগিন করা স্টুডেন্টের ডেটা খুঁজে বের করা
            const currentStudent = students.find(s => s.name === userName) || students[0];

            if (currentStudent) {
                // টপ কার্ডের তথ্য বসানো
                document.getElementById('profile-name').innerText = currentStudent.name || "Student Name";
                document.getElementById('profile-id').innerText = `ID: ${currentStudent.id || "N/A"}`;
                document.getElementById('profile-dept').innerText = currentStudent.department || "University Department";

                // পার্সোনাল ইনফরমেশন বসানো
                document.getElementById('profile-email').innerText = currentStudent.email || "N/A";
                document.getElementById('profile-phone').innerText = currentStudent.phone || "N/A";
                document.getElementById('profile-blood').innerText = currentStudent.bloodGroup || "N/A";
                document.getElementById('profile-address').innerText = currentStudent.address || "N/A";

                // একাডেমিক ইনফরমেশন বসানো
                document.getElementById('profile-program').innerText = currentStudent.program || "N/A";
                document.getElementById('profile-semester').innerText = currentStudent.semester || "N/A";
                document.getElementById('profile-cgpa').innerText = currentStudent.cgpa || "N/A";
            }
        })
        .catch(error => {
            console.error("Error loading profile data:", error);
        });
});