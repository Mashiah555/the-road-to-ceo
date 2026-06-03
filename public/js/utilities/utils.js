// --- Modal Logic ---
window.openInstructions = function () {
    document.getElementById('instructions-text').innerHTML = instructionsData;
    document.getElementById('instructions-modal').style.display = 'block';
};

window.closeInstructions = function () {
    document.getElementById('instructions-modal').style.display = 'none';
};

window.openSettings = function () {
    document.getElementById('settings-modal').style.display = 'block';
};

window.closeSettings = function () {
    document.getElementById('settings-modal').style.display = 'none';
};

window.updateSettings = function () {
    baseInitialCoins = parseInt(document.getElementById('initial-coins-slider').value);
    baseCoinDecayPercentage = parseFloat(document.getElementById('decay-coins-slider').value);

    document.getElementById('initial-coins-val').innerText = baseInitialCoins;
    document.getElementById('decay-coins-val').innerText = baseCoinDecayPercentage;
};

window.resetSettings = function () {
    document.getElementById('initial-coins-slider').value = 10000;
    document.getElementById('decay-coins-slider').value = 0.5;

    updateSettings();
};

// Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function (event) {
    const instModal = document.getElementById('instructions-modal');
    const setModal = document.getElementById('settings-modal');
    if (event.target === instModal) instModal.style.display = "none";
    if (event.target === setModal) setModal.style.display = "none";
};

// --- Utility Functions ---

// Formats seconds into MM:SS string
function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Handles screen transitions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}