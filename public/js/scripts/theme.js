document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const root = document.documentElement;

    // Define the order of states and their corresponding icons
    const states = ['auto', 'light', 'dark'];
    const icons = {
        'auto': '🌗',
        'light': '☀️',
        'dark': '🌙'
    };

    // Load saved preference or default to 'auto'
    let currentState = localStorage.getItem('theme-preference') || 'auto';
    applyThemeState(currentState);

    // Handle button clicks
    themeBtn.addEventListener('click', () => {
        // Find current index and move to the next one
        let currentIndex = states.indexOf(currentState);
        currentState = states[(currentIndex + 1) % states.length];

        applyThemeState(currentState);
        localStorage.setItem('theme-preference', currentState);
    });

    // Function to update the DOM based on the state
    function applyThemeState(state) {
        if (state === 'auto') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', state);
        }

        // Update button visual
        themeBtn.textContent = icons[state];
        themeBtn.title = `Theme: ${state.charAt(0).toUpperCase() + state.slice(1)}`;
    }
});