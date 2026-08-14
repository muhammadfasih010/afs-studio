if (localStorage.getItem('currentUser')) {
    localStorage.setItem('userName',); // example: "Ali"
    window.location.href = '/gen.html';
}

function switchTab(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginTabBtn = document.getElementById('loginTabBtn');
    const signupTabBtn = document.getElementById('signupTabBtn');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTabBtn.classList.add('active');
        signupTabBtn.classList.remove('active');
    } else {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupTabBtn.classList.add('active');
        loginTabBtn.classList.remove('active');
    }
}

// Handle Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;

    const user = { name: email.split('@')[0], email: email };
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to Generator
    window.location.href = 'gen.html';
});

// Handle Sign Up
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;

    const user = { name: name, email: email };
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to Generator
    window.location.href = 'gen.html';
});
