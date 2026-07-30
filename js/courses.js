document.addEventListener("DOMContentLoaded", () => {
    // ১. লগিন চেক
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // ২. সাইডবারে ইউজারের নাম বসানো (সাইডবার লোড হওয়ার পর কাজ করবে)
    setTimeout(() => {
        const userName = localStorage.getItem("userName") || "Rayhan Shorif";
        const sidebarName = document.getElementById("sidebar-name");
        if (sidebarName) sidebarName.innerText = userName;
    }, 100);
});