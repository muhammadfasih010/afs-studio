// Auth Check
if (localStorage.getItem('ai_logged_in') !== 'true') {
    window.location.href = 'index.html';
}

// Apply saved theme on load
const savedTheme = localStorage.getItem('ai_theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

const generateBtn = document.getElementById('generate-btn');
const promptInput = document.getElementById('prompt-input');
const placeholderContent = document.getElementById('placeholder-content');
const loader = document.getElementById('loader');
const outputImage = document.getElementById('output-image');

generateBtn.addEventListener('click', () => {
    const promptText = promptInput.value.trim();
    if (!promptText) {
        alert('Please enter a prompt first!');
        return;
    }

    // UI Loading State
    placeholderContent.style.display = 'none';
    outputImage.style.display = 'none';
    loader.style.display = 'block';

    // Simulating API Generation (Using Unsplash source based on prompt hash or random placeholder art)
    setTimeout(() => {
        // Generate a pseudo-random image matching the prompt context using Picsum Photos
        const randomImageId = Math.floor(Math.random() * 1000);
        const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(promptText)}/600/400`;

        loader.style.display = 'none';
        outputImage.src = imageUrl;
        outputImage.style.display = 'block';

        // Save generation to history in LocalStorage
        const history = JSON.parse(localStorage.getItem('ai_history')) || [];
        const newEntry = {
            prompt: promptText,
            image: imageUrl,
            date: new Date().toLocaleDateString()
        };
        history.unshift(newEntry); // Add to beginning of array
        localStorage.setItem('ai_history', JSON.stringify(history));

    }, 2000);
});
