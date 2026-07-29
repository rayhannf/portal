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

    // ৩. courses.json থেকে কোর্স ডেটা ফেচ করে কার্ড বানানো
    fetch('./data/courses.json')
        .then(response => response.json())
        .then(courses => {
            const container = document.getElementById('courses-container');
            container.innerHTML = ''; // "Loading courses..." লেখাটি সরিয়ে ফেলা

            courses.forEach(course => {
                const card = `
                    <div class="course-card">
                        <div>
                            <div class="course-header">
                                <span class="course-code">${course.id}</span>
                                <span class="course-credit">${course.credit} Credits</span>
                            </div>
                            <h3 class="course-title">${course.title}</h3>
                            <p class="course-teacher">👨‍🏫 ${course.teacher}</p>
                            <p class="course-schedule">🕒 ${course.schedule}</p>
                        </div>

                        <div class="progress-container">
                            <div class="progress-label">
                                <span>Syllabus Completed</span>
                                <span><strong>${course.progress}%</strong></span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" style="width: ${course.progress}%;"></div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("Error loading courses:", error);
            document.getElementById('courses-container').innerHTML = 
                '<p style="color: red;">Failed to load course list!</p>';
        });
});