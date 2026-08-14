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

// Hugging Face Free Model API (Stable Diffusion)
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";
const API_KEY = "YAHAN_APNI_KEY_PASTE_KAR_DEN"; // Apni asli Hugging Face API key yahan double quotes ke andar rakh dein

generateBtn.addEventListener('click', async () => {
    const promptText = promptInput.value.trim();
    if (!promptText) {
        alert('Please enter a prompt first!');
        return;
    }

    // UI Loading State
    placeholderContent.style.display = 'none';
    outputImage.style.display = 'none';
    loader.style.display = 'block';
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating AI Art...";

    try {
        // Calling Hugging Face API with your key
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: promptText })
        });

        if (!response.ok) {
            throw new Error('Failed to generate image. Please try again.');
        }

        // Response ko image blob mein convert karna
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

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
        history.unshift(newEntry);
        localStorage.setItem('ai_history', JSON.stringify(history));

    } catch (error) {
        console.error(error);
        alert('Error generating image. Please check your API key or try again.');
        loader.style.display = 'none';
        placeholderContent.style.display = 'flex';
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate';
    }
});
        
