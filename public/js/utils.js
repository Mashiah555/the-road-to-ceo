// --- Modal Logic ---
window.openInstructions = function () {
    document.getElementById('instructions-text').innerHTML = instructionsData;
    document.getElementById('instructions-modal').style.display = 'block';
};

window.closeInstructions = function () {
    document.getElementById('instructions-modal').style.display = 'none';
};

// Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function (event) {
    const modal = document.getElementById('instructions-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
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