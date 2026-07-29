document.addEventListener("DOMContentLoaded", () => {
    // ১. সিকিউরিটি চেক: ইউজার লগিন করা আছে কি না
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // ২. সাইডবারে ইউজারের নাম বসানো
    const userName = localStorage.getItem('userName');
    if (userName && document.getElementById('sidebar-name')) {
        document.getElementById('sidebar-name').innerText = userName;
    }

    // ৩. teachers.json থেকে শিক্ষকদের ডেটা ফেচ করে কার্ড তৈরি করা
    fetch('./data/teachers.json')
        .then(response => response.json())
        .then(teachers => {
            const container = document.getElementById('teachers-container');
            container.innerHTML = ''; // "Loading faculty directory..." লেখাটি সরিয়ে ফেলা

            teachers.forEach(teacher => {
                const card = `
                    <div class="teacher-card">
                        <div>
                            <div class="teacher-avatar">👨‍🏫</div>
                            <h3 class="teacher-name">${teacher.name}</h3>
                            <p class="teacher-designation">${teacher.designation}</p>
                            <p class="teacher-dept">${teacher.department}</p>
                        </div>

                        <div class="teacher-contact">
                            <span>📧 ${teacher.email}</span>
                            <span>📞 ${teacher.phone}</span>
                            <span>🏢 ${teacher.room}</span>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("Error loading teachers:", error);
            document.getElementById('teachers-container').innerHTML = 
                '<p style="color: red;">Failed to load faculty directory!</p>';
        });
});