// Auth Check (Secure redirect if not logged in)
if (localStorage.getItem('ai_logged_in') !== 'true') {
    window.location.href = 'index.html';
}

// --- DOM Elements ---
const tabBtns = document.querySelectorAll('.tab-btn');
const contentSections = document.querySelectorAll('.content-section');

// --- Theme Switching Logic ---
const darkThemeBtn = document.getElementById('dark-theme-btn');
const lightThemeBtn = document.getElementById('light-theme-btn');
const body = document.body;

// Apply saved theme on load
const savedTheme = localStorage.getItem('ai_theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    lightThemeBtn.classList.add('active-theme');
    darkThemeBtn.classList.remove('active-theme');
} else {
    body.classList.remove('light-theme');
    darkThemeBtn.classList.add('active-theme');
    lightThemeBtn.classList.remove('active-theme');
}

darkThemeBtn.addEventListener('click', () => {
    body.classList.remove('light-theme');
    localStorage.setItem('ai_theme', 'dark');
    darkThemeBtn.classList.add('active-theme');
    lightThemeBtn.classList.remove('active-theme');
});

lightThemeBtn.addEventListener('click', () => {
    body.classList.add('light-theme');
    localStorage.setItem('ai_theme', 'light');
    lightThemeBtn.classList.add('active-theme');
    darkThemeBtn.classList.remove('active-theme');
});


// --- Tab Navigation Logic ---
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        // Handle Logout
        if (targetId === 'logout') {
            if(confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('ai_logged_in');
                // Optionally clear user data: localStorage.removeItem('ai_user');
                window.location.href = 'index.html';
            }
            return;
        }

        // Remove active classes from tabs and sections
        tabBtns.forEach(b => b.classList.remove('active'));
        contentSections.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding section
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');

        // Special loading for History tab
        if (targetId === 'history') {
            loadHistoryData();
        }
    });
});

// --- Edit Profile Logic ---
const profileForm = document.getElementById('profile-form');
const nameInput = document.getElementById('profile-name');
const emailInput = document.getElementById('profile-email');

// Load current user
