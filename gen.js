// Auth Check
if (localStorage.getItem('ai_logged_in') !== 'true') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Setting Logic
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('ai_theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const theme = themeToggle.checked ? 'light' : 'dark';
            document.body.classList.toggle('light-theme', themeToggle.checked);
            localStorage.setItem('ai_theme', theme);
        });
    }

    // 2. Resolution Setting Logic (Save & Load)
    const resSelect = document.getElementById('resolution-select');
    const savedRes = localStorage.getItem('ai_resolution') || '512x512';
    if (resSelect) {
        resSelect.value = savedRes;
        resSelect.addEventListener('change', () => {
            localStorage.setItem('ai_resolution', resSelect.value);
        });
    }

    // 3. Load and Display History
    renderHistory();

    // 4. Clear History Button Logic
    const clearBtn = document.getElementById('clear-history-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm("Kya aap waqai apni saari history delete karna chahte hain?")) {
                localStorage.removeItem('ai_history');
                renderHistory();
            }
        });
    }
});

// History Render Helper Function
function renderHistory() {
    const historyContainer = document.getElementById('history-list');
    if (!historyContainer) return;

    const historyData = JSON.parse(localStorage.getItem('ai_history')) || [];

    if (historyData.length === 0) {
        historyContainer.innerHTML = '<p style="color: #888; text-align: center; padding: 10px;">Abhi tak koi history mojood nahi hai.</p>';
        return;
    }

    historyContainer.innerHTML = historyData.map(item => `
        <div class="history-item">
            <img src="${item.image}" alt="Generated AI Art">
            <div>
                <p><strong>Prompt:</strong> ${item.prompt}</p>
                <small>${item.date}</small>
            </div>
        </div>
    `).join('');
}
