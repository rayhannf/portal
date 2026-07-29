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

    // ৩. notices.json থেকে ডেটা এনে কার্ড আকারে দেখানো
    fetch('./data/notices.json')
        .then(response => response.json())
        .then(notices => {
            const container = document.getElementById('notices-container');
            container.innerHTML = ''; // লোডিং টেক্সট সরানো

            notices.forEach(notice => {
                // ক্যাটাগরি অনুযায়ী ব্যাজ ক্লাস তৈরি
                const categoryClass = `cat-${notice.category || 'General'}`;

                const card = `
                    <div class="notice-card">
                        <div class="notice-header">
                            <span class="notice-category ${categoryClass}">${notice.category}</span>
                            <span style="font-size: 0.85rem; color: #64748b;">📅 ${notice.date}</span>
                        </div>
                        <h3 class="notice-title">${notice.title}</h3>
                        <div class="notice-meta">
                            <span>✍️ Published by: <strong>${notice.author}</strong></span>
                        </div>
                        <p class="notice-description">${notice.description}</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("Error loading notices:", error);
            document.getElementById('notices-container').innerHTML = 
                '<p style="color: red; text-align: center;">Failed to load notices!</p>';
        });
});