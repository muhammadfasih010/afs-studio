// Auth Check (Secure redirect if not logged in)
if (localStorage.getItem('ai_logged_in') !== 'true') {
    window.location.href = 'index.html';
}
// Page load hotay hi history ko run kar dein
loadHistoryData();

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
}

darkThemeBtn.addEventListener('click', () => {
    body.classList.remove('light-theme');
    localStorage.setItem('ai_theme', 'dark');
    alert('Dark theme applied!');
});

lightThemeBtn.addEventListener('click', () => {
    body.classList.add('light-theme');
    localStorage.setItem('ai_theme', 'light');
    alert('Light theme applied!');
});

// --- Tab Navigation Logic ---
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        // Handle Logout
        if (targetId === 'logout') {
            if(confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('ai_logged_in');
                window.location.href = 'index.html';
            }
            return;
        }

        // UI Tabs update
        tabBtns.forEach(b => b.classList.remove('active'));
        contentSections.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');

        // Load History data if tab clicked
        if (targetId === 'history') {
            loadHistoryData();
        }
    });
});

// --- Edit Profile Logic ---
const profileForm = document.getElementById('profile-form');
const nameInput = document.getElementById('profile-name');
const emailInput = document.getElementById('profile-email');

// Load current user data
const storedUser = JSON.parse(localStorage.getItem('ai_user'));
if (storedUser) {
    nameInput.value = storedUser.name || '';
    emailInput.value = storedUser.email || '';
}

profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (storedUser) {
        storedUser.name = nameInput.value.trim();
        storedUser.email = emailInput.value.trim();
        localStorage.setItem('ai_user', JSON.stringify(storedUser));
        alert('Profile updated successfully!');
    }
});

// --- History Rendering Logic ---
function loadHistoryData() {
    const historyGrid = document.getElementById('history-grid');
    const history = JSON.parse(localStorage.getItem('ai_history')) || [];

    historyGrid.innerHTML = ''; // Clear existing

    if (history.length === 0) {
        historyGrid.innerHTML = '<p style="text-align: center; color: #94a3b8; width: 100%;">No history found. Generate an image first!</p>';
        return;
    }

    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <img src="${item.image}" alt="History Art" onerror="this.src='https://via.placeholder.com/150'">
            <p title="${item.prompt}">${item.prompt}</p>
            <small style="color: #64748b;">${item.date}</small>
        `;
        historyGrid.appendChild(div);
    });
    }
      // Resolution Logic
function fakeRes(res) {
    localStorage.setItem('ai_resolution', res);
    alert('Success: Resolution set to ' + res + ' (Applied for next generation)');
                    }
    
}
