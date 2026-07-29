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

    // ৩. routine.json থেকে ডেটা এনে টেবিলে সাজানো
    fetch('./data/routine.json')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('routine-body');
            tbody.innerHTML = ''; // লোডিং টেক্সট সরানো

            data.forEach(item => {
                const badgeClass = item.type === 'Lab' ? 'badge-lab' : 'badge-theory';

                const row = `
                    <tr>
                        <td class="day-cell">${item.day}</td>
                        <td>🕒 ${item.time}</td>
                        <td>
                            <strong>${item.course}</strong><br>
                            <span style="font-size: 0.8rem; color: #64748b;">${item.code}</span>
                        </td>
                        <td>🏢 ${item.room}</td>
                        <td>👨‍🏫 ${item.teacher}</td>
                        <td><span class="badge-type ${badgeClass}">${item.type}</span></td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Error loading routine:", error);
            document.getElementById('routine-body').innerHTML = 
                '<tr><td colspan="6" style="text-align: center; color: red;">Failed to load class routine!</td></tr>';
        });
});