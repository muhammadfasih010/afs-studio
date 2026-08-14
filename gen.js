alert("JS File Loaded ✅"); // 1. Ye sabse pehle aana chahiye

document.addEventListener('DOMContentLoaded', () => {
    alert("DOM Ready ✅"); // 2. Ye dusra aana chahiye

    // DOM Elements
    const generateBtn = document.getElementById('generateBtn');
    const promptInput = document.getElementById('imagePrompt');
    const aspectRatio = document.getElementById('aspectRatio');
    const outputImage = document.getElementById('generatedImage');
    const loader = document.getElementById('loader');
    const downloadBtn = document.getElementById('downloadImageBtn');
    const placeholderText = document.getElementById('placeholderText');
    const imageActions = document.getElementById('imageActions');
    const displayProfileName = document.getElementById('displayProfileName');
    const userAvatarLetter = document.getElementById('userAvatarLetter');

    // Check elements presence
    if(!generateBtn) alert("Error: generateBtn nahi mila");
    if(!promptInput) alert("Error: imagePrompt nahi mila");
    if(!outputImage) alert("Error: generatedImage nahi mila");

    // Profile Setup
    const savedName = localStorage.getItem('userName') || "Guest";
    if(displayProfileName) displayProfileName.innerText = savedName;
    if(userAvatarLetter) userAvatarLetter.innerText = savedName[0].toUpperCase();

    // Event Listener for Generate Button
    if(generateBtn) {
        generateBtn.addEventListener('click', () => {
            alert("Button Clicked ✅"); // 3. Button dabao to ye aana chahiye

            const prompt = promptInput.value.trim();
            if(prompt === "") { 
                alert("Please enter a prompt first!"); 
                return; 
            }

            generateBtn.disabled = true;
            generateBtn.innerText = "Generating...";
            loader.classList.remove('hidden');
            placeholderText.classList.add('hidden');
            outputImage.classList.add('hidden');
            imageActions.classList.add('hidden');

            let width = 1024, height = 1024;
            const ratio = aspectRatio.value;
            if(ratio === "16:9") { width = 1344; height = 768; }
            if(ratio === "9:16") { width = 768; height = 1344; }
            if(ratio === "4:3") { width = 1024; height = 768; }

            const finalPrompt = prompt + ", highly detailed, 8k, masterpiece";
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=${width}&height=${height}&seed=${Date.now()}&model=flux&nologo=true`;

            alert("URL: " + imageUrl); // 4. URL check karo

            outputImage.onload = () => {
                alert("Image Loaded ✅");
                outputImage.classList.remove('hidden');

                // Direct File Download Logic (Blob Conversion)
                fetch(imageUrl)
                    .then(response => response.blob())
                    .then(blob => {
                        const blobUrl = URL.createObjectURL(blob);
                        if(downloadBtn) {
                            downloadBtn.href = blobUrl;
                            downloadBtn.download = `ai-image-${Date.now()}.png`;
                        }
                    })
                    .catch(() => {
                        if(downloadBtn) downloadBtn.href = imageUrl;
                    });

                if(imageActions) imageActions.classList.remove('hidden');
                generateBtn.disabled = false;
                generateBtn.innerText = "✨ Generate Image";
                loader.classList.add('hidden');
            };

            outputImage.onerror = () => {
                alert("Image Error ❌ Pollinations down ho sakta hai ya AdBlocker block kar raha hai.");
                placeholderText.classList.remove('hidden');
                generateBtn.disabled = false;
                generateBtn.innerText = "✨ Generate Image";
                loader.classList.add('hidden');
            };

            outputImage.src = imageUrl;
        });
    }
});
