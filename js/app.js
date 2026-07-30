document.addEventListener("DOMContentLoaded", () => {
    // বর্তমান পেজের নাম বের করা (যেমন: dashboard.html, profile.html)
    const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";

    // ১. components ফোল্ডার থেকে Navbar লোড করা
    const navbarContainer = document.getElementById("navbar-placeholder");
    if (navbarContainer) {
        fetch("./components/navbar.html")
            .then(res => {
                if (!res.ok) throw new Error("Navbar file not found");
                return res.text();
            })
            .then(data => {
                navbarContainer.innerHTML = data;

                // --- ক) Navbar-এর Active মেনু হাইলাইট করা ---
                const navLinks = navbarContainer.querySelectorAll(".m3-nav-pill");
                navLinks.forEach(link => {
                    if (link.getAttribute("data-page") === currentPage || link.getAttribute("href") === currentPage) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });

                // --- খ) Logout বাটনের কাজ নিশ্চিত করা ---
                const logoutBtn = document.getElementById("logout-btn");
                if (logoutBtn) {
                    logoutBtn.addEventListener("click", () => {
                        // লগিন সেশন মুছে ফেলা
                        localStorage.removeItem("isLoggedIn");
                        localStorage.removeItem("userPassword");
                        // লগিন পেজে রিডাইরেক্ট করা
                        window.location.href = "login.html";
                    });
                }
            })
            .catch(err => {
                console.error("Error loading navbar:", err);
                navbarContainer.innerHTML = "<p style='color:red; text-align:center;'>⚠️ Could not load navbar.html from components/</p>";
            });
    }

    // ২. components ফোল্ডার থেকে Footer লোড করা
    const footerContainer = document.getElementById("footer-placeholder");
    if (footerContainer) {
        fetch("./components/footer.html")
            .then(res => {
                if (!res.ok) throw new Error("Footer file not found");
                return res.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(err => console.error("Error loading footer:", err));
    }

    // ৩. components ফোল্ডার থেকে Sidebar লোড করা ও Active পেজ হাইলাইট করা
    const sidebarContainer = document.getElementById("sidebar-placeholder");
    if (sidebarContainer) {
        fetch("./components/sidebar.html")
            .then(res => {
                if (!res.ok) throw new Error("Sidebar file not found");
                return res.text();
            })
            .then(data => {
                sidebarContainer.innerHTML = data;

                // সাইডবারে ইউজারের নাম বসানো
                const userName = localStorage.getItem("userName") || "Rayhan Shorif";
                const sidebarName = document.getElementById("sidebar-name");
                if (sidebarName) sidebarName.innerText = userName;

                // --- সাইডবারের Active মেনু হাইলাইট করা ---
                const menuLinks = sidebarContainer.querySelectorAll(".m3-sidebar-menu a");
                menuLinks.forEach(link => {
                    const pageAttr = link.getAttribute("data-page");
                    const hrefAttr = link.getAttribute("href");

                    if (pageAttr === currentPage || hrefAttr === currentPage) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            })
            .catch(err => console.error("Error loading sidebar:", err));
    }
});