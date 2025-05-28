// js/main.js

// Main initialization function
function init() {
    console.log('Initializing application...');

    // Initialize theme
    if (typeof window.initTheme === 'function') {
        window.initTheme();
    }

    // Initialize menus
    if (typeof window.initMenus === 'function') {
        window.initMenus();
    }

    // Set up scroll spy
    if (typeof window.setupScrollSpy === 'function') {
        window.setupScrollSpy();
    }

    // Initialize language selector
    initLanguageSelector();

    console.log('Application initialized successfully');
}

// Initialize language selector
function initLanguageSelector() {
    // Check if language selector exists
    const langButtons = document.querySelectorAll('.dropdown-item[data-lang]');
    if (langButtons.length === 0) return;

    // Update UI with current language
    if (typeof window.updateLanguageUI === 'function') {
        window.updateLanguageUI();
    }

    // Add click events to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const newLang = e.target.dataset.lang;
            if (typeof window.changeLang === 'function') {
                window.changeLang(newLang);
            }
        });
    });

    console.log('Language selector initialized');
}

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // First load translations
    const pagePath = window.location.pathname;
    const pageName = pagePath.split('/').pop().replace('.html', '') || 'index';

    if (typeof window.translatePage === 'function') {
        window.translatePage(pageName).then(() => {
            // After translations are loaded, initialize the rest
            init();
        }).catch(error => {
            console.error('Error loading translations:', error);
            // Initialize anyway in case of error
            init();
        });
    } else {
        // If translator is not available, initialize anyway
        init();
    }
});

// ❤️❤️ For the best programmer in the world with lots of love