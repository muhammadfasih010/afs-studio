document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');

    // Optional: Agar pehle se user logged-in hai toh direct generator par bhej dein
    const existingUser = localStorage.getItem('currentUser');
    if (existingUser) {
        // Uncomment line below if you want auto-redirect when already logged in
        // window.location.href = 'gen.html';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (!name || !email) {
            alert('Please fill in all fields!');
            return;
        }

        // Save user data securely to LocalStorage (Connected with Member 2 and Member 3)
        const userData = {
            name: name,
            email: email,
            loginTime: new Date().toLocaleString()
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        // Smooth transition redirect to Member 2 (gen.html)
        window.location.href = 'gen.html';
    });
});
