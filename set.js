document.addEventListener('DOMContentLoaded', () => {
    // 1. Sync Data from Member 1
    let user = JSON.parse(localStorage.getItem('currentUser')) || { name: '', email: '' };
    document.getElementById('editName').value = user.name;
    document.getElementById('editEmail').value = user.email;

    // 2. Tab Logic
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // 3. Save Edit Profile
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        user.name = document.getElementById('editName').value;
        user.email = document.getElementById('editEmail').value;
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Profile Updated Successfully!');
    });

    // 4. Load History from Member 2
    const history = JSON.parse(localStorage.getItem('generationHistory')) || [];
    const grid = document.getElementById('historyGrid');
    
    if(history.length > 0) {
        grid.innerHTML = history.map(h => `
            <div class="history-item">
                <img src="${h.url}" alt="gen">
                <p style="font-size: 0.7rem; margin-top:5px;">${h.prompt.substring(0, 20)}...</p>
            </div>
        `).join('');
    } else {
        grid.innerHTML = "<p>No history yet.</p>";
    }

    document.getElementById('backToGen').onclick = () => window.location.href = 'gen.html';
});
