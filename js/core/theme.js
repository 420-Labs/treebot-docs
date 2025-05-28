// js/core/theme.js

// Function to get current theme
function getTheme() {
    return localStorage.getItem('theme') || 'dark';
}

// Function to toggle between themes
function toggleTheme() {
    const currentSetting = getTheme();
    if (currentSetting === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Function to apply a specific theme
function setTheme(theme) {
    const icon = document.getElementById('actualThemeIcon');

    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        if (icon) icon.innerHTML = 'dark_mode';
    } else if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        if (icon) icon.innerHTML = 'light_mode';
    }

    localStorage.setItem('theme', theme);
}

// Initialize the theme
function initTheme() {
    const themeIcon = document.getElementById('theme-icon');
    const theme = getTheme();

    // Apply initial theme
    setTheme(theme);

    // Add click event to theme button
    if (themeIcon) {
        themeIcon.addEventListener('click', toggleTheme);
    } else {
        console.error('Theme icon not found');
    }
}

// Export functions
window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.setTheme = setTheme;