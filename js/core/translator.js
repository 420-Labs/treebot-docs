// translator.js

const DEFAULT_LANG = 'en';

function getLang() {
    return localStorage.getItem('lang') || navigator.language.slice(0, 2) || DEFAULT_LANG;
}
async function loadLocaleFile(lang, page){
    // Detectamos si es el index (root) o docs, para ajustar la ruta
    // location.pathname da el path actual (ej: / o /index.html o /docs/terms.html)
    let basePath = '../locales/';

    // Si estamos en "home" (/, /index, /index.html), ponemos basePath a './locales/'
    const path = window.location.pathname;
    if (
        path === '/' ||
        path.match(/\/index(\.html)?$/i)
    ) {
        basePath = './locales/';
    }

    try {
        const response = await fetch(`${basePath}${lang}/${page}.json`);
        if (response.ok) {
            return await response.json();
        }
    } catch {}

    // Fallback to en
    if (lang !== 'en') {
        try {
            const response = await fetch(`${basePath}en/${page}.json`);
            if (response.ok) {
                return await response.json();
            }
        } catch {}
    }

    return {};
}
// Load both, globals and page-specific translations then merge them
async function loadLocales(page) {
    const lang = getLang();
    const globals = await loadLocaleFile(lang, 'globals');
    const pageLocale = await loadLocaleFile(lang, page);
    return {...globals, ...pageLocale};
}

// Translate the data-i18n attributes and data-i18n-attr attributes
function applyLocale(locale) {
    // Translate innerHTML
    document.querySelectorAll('[data-i18n]').forEach(
        el => {
            const key = el.getAttribute('data-i18n');
            if (locale[key]) {
                el.innerHTML = locale[key];
            }
        }
    );

    // Translate attributes
    document.querySelectorAll('[data-i18n-attr]').forEach(
        el => {
            const pair = el.getAttribute('data-i18n-attr').split(':');
            if (pair.length === 2) {
                const [attr, key] = pair;
                if (locale[key]) {
                    el.setAttribute(attr, locale[key]);
                }
            }
        }
    )
}

// Load translations and apply them to the page
async function translatePage(page) {
    const locale = await loadLocales(page);
    applyLocale(locale);

    // Store the translations for use by other functions
    window.currentTranslations = locale;

    return locale;
}

function changeLang(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
}

// Actualiza la UI para mostrar el idioma actual
function updateLanguageUI() {
    const currentLang = getLang();
    const langDisplay = document.getElementById('current-language');

    if (langDisplay) {
        langDisplay.textContent = currentLang.toUpperCase();
    }

    // Marca como activo el idioma seleccionado
    document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
        if (item.dataset.lang === currentLang) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}


// Export modules for ES6
window.translatePage = translatePage;
window.changeLang = changeLang;
window.updateLanguageUI = updateLanguageUI;