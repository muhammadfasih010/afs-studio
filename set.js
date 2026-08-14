document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------
    // Theme Management
    // ------------------------------------
    const toggleAppearanceBtn = document.getElementById("toggleAppearanceBtn");
    const themeOptionsContainer = document.getElementById("themeOptionsContainer");
    const setDarkTheme = document.getElementById("setDarkTheme");
    const setLightTheme = document.getElementById("setLightTheme");

    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    
    if (toggleAppearanceBtn && themeOptionsContainer) {
        toggleAppearanceBtn.addEventListener("click", () => {
            themeOptionsContainer.classList.toggle("hidden-expand");
        });
    }

    if (setDarkTheme) {
        setDarkTheme.addEventListener("click", () => {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        });
    }

    if (setLightTheme) {
        setLightTheme.addEventListener("click", () => {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        });
    }

    // ------------------------------------
    // Resolution Preference
    // ------------------------------------
    const settingQualitySelect = document.getElementById("settingQualitySelect");
    if (settingQualitySelect) {
        const savedQuality = localStorage.getItem("defaultQuality") || "HD";
        settingQualitySelect.value = savedQuality;

        settingQualitySelect.addEventListener("change", (e) => {
            localStorage.setItem("defaultQuality", e.target.value);
        });
    }

    // ------------------------------------
    // Edit Profile View Toggle
    // ------------------------------------
    const openPersonalizationBtn = document.getElementById("openPersonalizationBtn");
    const backToSettingsBtn = document.getElementById("backToSettingsBtn");
    const settingsMainCard = document.getElementById("settingsMainCard");
    const personalizationCard = document.getElementById("personalizationCard");

    if (openPersonalizationBtn) {
        openPersonalizationBtn.addEventListener("click", () => {
            settingsMainCard.classList.add("hidden-view");
            personalizationCard.classList.remove("hidden-view");
        });
    }

    if (backToSettingsBtn) {
        backToSettingsBtn.addEventListener("click", () => {
            personalizationCard.classList.add("hidden-view");
            settingsMainCard.classList.remove("hidden-view");
        });
    }

    // Profile Save
    const personalizationForm = document.getElementById("personalizationForm");
    if (personalizationForm) {
        personalizationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("updateUsername").value.trim();
            const password = document.getElementById("updatePassword").value;
            const confirmPassword = document.getElementById("rewritePassword").value;

            if (password && password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            if (username) {
                localStorage.setItem("username", username);
            }
            if (password) {
                localStorage.setItem("userPassword", password);
            }

            alert("Profile updated successfully!");
            personalizationCard.classList.add("hidden-view");
            settingsMainCard.classList.remove("hidden-view");
        });
    }

    // ------------------------------------
    // Settings History Modal with Click-to-Redirect Logic
    // ------------------------------------
    const openSettingsHistoryBtn = document.getElementById("openSettingsHistoryBtn");
    const closeHistoryModal = document.getElementById("closeHistoryModal");
    const historyModal = document.getElementById("historyModal");
    const clearHistoryModalBtn = document.getElementById("clearHistoryModalBtn");
    const quickHistoryList = document.getElementById("quickHistoryList");

    function renderHistoryList() {
        if (!quickHistoryList) return;
        const history = JSON.parse(localStorage.getItem("promptHistory") || "[]");

        if (history.length === 0) {
            quickHistoryList.innerHTML = `<p style="color:var(--text-secondary); font-size:13px; text-align:center; padding:20px 0;">No saved prompts found.</p>`;
            return;
        }

        quickHistoryList.innerHTML = history
            .map((item, index) => {
                const promptStr = typeof item === 'object' ? item.prompt : item;

                return `
                <div class="setting-history-card" data-index="${index}" style="padding:12px 16px; border-bottom:1px solid var(--border-color); display:flex; align-items:center; justify-content:space-between; cursor:pointer; transition: background 0.2s ease;">
                    <div>
                        <p style="font-size:13.5px; font-weight:600; color:var(--text-primary); margin:0;">💬 ${promptStr}</p>
                        <span style="font-size:11px; color:var(--text-secondary);">Click to open prompt and image in generator →</span>
                    </div>
                </div>';
            })
            .join("");

        // Click on item -> Redirect to Generator & Load Image & Prompt
        document.querySelectorAll(".setting-history-card").forEach(elem => {
            elem.addEventListener("click", () => {
                const index = elem.getAttribute("data-index");
                const history = JSON.parse(localStorage.getItem("promptHistory") || "[]");
                const selectedItem = history[index];

                localStorage.setItem("activePromptToRestore", JSON.stringify(selectedItem));
                window.location.href = "gen.html";
            });
        });
    }

    if (openSettingsHistoryBtn && historyModal) {
        openSettingsHistoryBtn.addEventListener("click", () => {
            renderHistoryList();
            historyModal.classList.remove("hidden");
        });
    }

    if (closeHistoryModal && historyModal) {
        closeHistoryModal.addEventListener("click", () => {
            historyModal.classList.add("hidden");
        });
    }

    if (clearHistoryModalBtn) {
        clearHistoryModalBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear all prompt logs?")) {
                localStorage.removeItem("promptHistory");
                renderHistoryList();
            }
        });
    }

    // Logout Event
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to log out?")) {
                localStorage.setItem("isLoggedIn", "false");
                localStorage.removeItem("currentUser");
                sessionStorage.clear();
                window.location.href = "index.html";
            }
        });
    }
});
