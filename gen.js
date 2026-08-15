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
const resOptionBtns = document.querySelectorAll('.res-option-btn');

// Default resolution selection logic from UI buttons
let selectedResolution = '512x512';

resOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        resOptionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedResolution = btn.getAttribute('data-res');
    });
});

// API keys configuration
const API_KEYS = {
    huggingface: "YAHAN_HUGGINGFACE_KEY_DALO",
    prodia: "YAHAN_PRODIA_KEY_DALO",
    stability: "YAHAN_STABILITY_KEY_DALO"
};

generateBtn.addEventListener('click', async () => {
    const promptText = promptInput.value.trim();
    if (!promptText) {
        alert('Please enter a prompt first!');
        return;
    }

    // Extract Width and Height from selected resolution
    const imgWidth = parseInt(selectedResolution.split('x')[0]);
    const imgHeight = parseInt(selectedResolution.split('x')[1]);

    // UI Loading State
    placeholderContent.style.display = 'none';
    outputImage.style.display = 'none';
    loader.style.display = 'block';
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating via AI Network...";

    let imageUrl = null;

    // --- STEP 1: Try Hugging Face ---
    try {
        console.log("Trying Hugging Face...");
        const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEYS.huggingface}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                inputs: promptText,
                parameters: { width: imgWidth, height: imgHeight }
            })
        });
        if (response.ok) {
            const blob = await response.blob();
            imageUrl = URL.createObjectURL(blob);
        }
    } catch (e) {
        console.log("Hugging Face failed, switching to Pollinations...");
    }

    // --- STEP 2: Try Pollinations (Real width/height passed here) ---
    if (!imageUrl) {
        try {
            console.log("Trying Pollinations...");
            const encodedPrompt = encodeURIComponent(promptText);
            const pollUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${imgWidth}&height=${imgHeight}`;
            const imgCheck = new Image();
            imgCheck.src = pollUrl;
            await new Promise((resolve, reject) => {
                imgCheck.onload = resolve;
                imgCheck.onerror = reject;
            });
            imageUrl = pollUrl;
        } catch (e) {
            console.log("Pollinations failed, switching to Prodia...");
        }
    }

    // --- STEP 3: Try Prodia ---
    if (!imageUrl) {
        try {
            console.log("Trying Prodia...");
            const response = await fetch("https://api.prodia.com/v1/generate", {
                method: "POST",
                headers: {
                    "X-Prodia-Key": API_KEYS.prodia,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "v1-5-pruned-emaonly.safetensors",
                    prompt: promptText
                })
            });
            if (response.ok) {
                const data = await response.json();
                if (data.imageUrl) imageUrl = data.imageUrl;
            }
        } catch (e) {
            console.log("Prodia failed, switching to Stability AI...");
        }
    }

    // --- STEP 4: Try Stability AI ---
    if (!imageUrl) {
        try {
            console.log("Trying Stability AI...");
            const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEYS.stability}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    text_prompts: [{ text: promptText }],
                    cfg_scale: 7,
                    steps: 30,
                    samples: 1,
                    width: imgWidth,
                    height: imgHeight
                })
            });
            if (response.ok) {
                const data = await response.json();
                if (data.artifacts && data.artifacts[0]) {
                    const base64Data = data.artifacts[0].base64;
                    imageUrl = `data:image/png;base64,${base64Data}`;
                }
            }
        } catch (e) {
            console.log("Stability AI also failed.");
        }
    }

    // --- Final Result Handling ---
    if (imageUrl) {
        loader.style.display = 'none';
        outputImage.src = imageUrl;
        outputImage.style.display = 'block';
    /

        // Show Download Button & Set URL
        const downloadBtn = document.getElementById('download-btn');
        downloadBtn.style.display = 'inline-block';
        downloadBtn.href = imageUrl;

            
        // Save to LocalStorage History
        const history = JSON.parse(localStorage.getItem('ai_history')) || [];
        const newEntry = {
            prompt: promptText,
            image: imageUrl,
            date: new Date().toLocaleDateString()
        };
        history.unshift(newEntry);
        localStorage.setItem('ai_history', JSON.stringify(history));
    } else {
        alert('Sabhi APIs waqt par respond nahi kar sakein. Baraye meharbani dobara koshish karein!');
        loader.style.display = 'none';
        placeholderContent.style.display = 'flex';
    }

    generateBtn.disabled = false;
    generateBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate';
});
        
