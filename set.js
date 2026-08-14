// Auth Check
if (localStorage.getItem('ai_logged_in') !== 'true') {
    window.location.href = 'index.html';
}

// Apply theme on load
const savedTheme = localStorage.getItem('ai_theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Tab Switching Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const contentSections = document.querySelectorAll('.content-section');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        // Handle Logout directly
        if (targetId === 'logout') {
            localStorage.removeItem('ai_logged_in');
            window.location.href = 'index.html';
            return;
        }

        // Remove active states
        tabBtns.forEach(b => b.classList.remove('active'));
        contentSections.forEach(c => c.classList.remove('active'));

        // Add active state to selected tab & section
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');

        // Load History data if history tab is opened
        if (targetId === 'history') {
            loadHistory();
        }
    });
});

// Edit Profile Logic
const profileNameInput = document.getElementById('profile-name');
const profileEmailInput = document.getElementById('profile-email');
const profileForm = document.getElementById('profile-form');

const currentUser = JSON.parse(localStorage.getItem('ai_user')) || {};
profileNameInput.value = currentUser.name || '';
profileEmailInput.value = currentUser.email || '';

profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentUser.name = profileNameInput.value.trim();
    currentUser.email = profileEmailInput.value.trim();
    localStorage.setItem('ai_user', JSON.stringify(currentUser));
    alert('Profile updated successfully!');
});

// Theme Switching Logic
const darkThemeBtn = document.getElementById('dark-theme-btn');
const lightThemeBtn = document.getElementById('light-theme-btn');

darkThemeBtn.addEventListener('click', () => {
    document.body.classList.remove('light-theme');
    localStorage.setItem('ai_theme', 'dark');
    alert('Switched to Dark Theme');
});

lightThemeBtn.addEventListener('click', () => {
    document.body.classList.add('light-theme');
    localStorage.setItem('ai_theme', 'light');
    alert('Switched to Light Theme');
});

// Load History Logic
function loadHistory() {
    const historyGrid = document.getElementById('history-grid');
    const historyData = JSON.parse(localStorage.getItem('ai_history')) || [];

    historyGrid.innerHTML = '';

    if (historyData.length === 0) {
        historyGrid.innerHTML = '<p style="color: #94a3b8; grid-column: 1/-1; text-align: center;">No generation history found.</p>';
        return;
    }

    historyData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <img src="${item.image}" alt="History Image">
            <p title="${item.prompt}">${item.prompt}</p>
        `;
        historyGrid.appendChild(div);
    });
}
    
