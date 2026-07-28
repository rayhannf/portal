// কম্পোনেন্ট লোড করার গ্লোবাল ফাংশন
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// পেইজ লোড হওয়ার সাথে সাথে Navbar ও Footer কল করা
document.addEventListener("DOMContentLoaded", () => {
    loadComponent('navbar-placeholder', './components/navbar.html');
    loadComponent('footer-placeholder', './components/footer.html');
});

// Navbar এবং Footer লোড করার ফাংশন
function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (element) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
                updateNavbarState(); // Navbar লোড হওয়ার পর মেনু আপডেট করবে
            });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent('navbar-placeholder', './components/navbar.html');
    loadComponent('footer-placeholder', './components/footer.html');
});

// লগিন অবস্থা বুঝে মেনু পরিবর্তন করা
function updateNavbarState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        document.getElementById('nav-login').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'block';
        document.getElementById('nav-dashboard').style.display = 'block';
    }
}

// লগআউট ফাংশন
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}