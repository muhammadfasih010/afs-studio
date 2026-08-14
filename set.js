document.addEventListener('DOMContentLoaded', () => {
    // Tab Logic
    document.getElementById('tab-profile').classList.add('active-pane');

    // Load Profile
    document.getElementById('username-input').value = localStorage.getItem('ai_username') || '';
    document.getElementById('save-profile-btn').onclick = () => {
        localStorage.setItem('ai_username', document.getElementById('username-input').value);
        alert('Profile Saved!');
    };

    // Load Theme & Resolution
    const themeSel = document.getElementById('theme-select');
    const resSel = document.getElementById('resolution-select');
    themeSel.value = localStorage.getItem('ai_theme') || 'dark';
    resSel.value = localStorage.getItem('ai_resolution') || '512x512';

    themeSel.onchange = () => { localStorage.setItem('ai_theme', themeSel.value); location.reload(); };
    resSel.onchange = () => { localStorage.setItem('ai_resolution', resSel.value); };

    // Logout
    document.getElementById('logout-btn').onclick = () => { localStorage.removeItem('ai_logged_in'); window.location.href = 'index.html'; };

    // History
    renderHistory();
    document.getElementById('clear-history-btn').onclick = () => {
        if(confirm("Delete history?")) { localStorage.removeItem('ai_history'); renderHistory(); }
    };
});

function switchTab(tabName, event) {
    document.querySelectorAll('.tab-pane').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).style.display = 'block';
    event.currentTarget.classList.add('active');
    if(tabName === 'history') renderHistory();
}

function renderHistory() {
    const list = document.getElementById('history-list');
    const data = JSON.parse(localStorage.getItem('ai_history')) || [];
    if (data.length === 0) list.innerHTML = '<p>No history yet.</p>';
    else list.innerHTML = data.map(item => `
        <div class="history-item">
            <img src="${item.image}">
            <div><p><strong>Prompt:</strong> ${item.prompt}</p><small>${item.date}</small></div>
        </div>`).join('');
                                         }
