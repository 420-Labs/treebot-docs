let themeIcon = document.getElementById('theme-icon');
const actualThemeIcon = document.getElementById('actualThemeIcon');

// asegura que no tenga q configurar el tema casda vez q se entre a la pagina el usuario
let theme = localStorage.getItem('theme') || 'dark';
setTheme(theme);

if (themeIcon) {
    // Agrega un evento de click al icono del tema, que llama a la función toggleTheme
    themeIcon.addEventListener('click', toggleTheme);
} else {
    console.error('theme-icon not found');
}

/**
 * Función que cambia el tema actual entre light, dark
 * 
 * @param {String} theme El tema actual 
 * @returns {void}
 */

//alterna el modo claro/oscuro
function toggleTheme() {
    const currentSetting = localStorage.getItem('theme');

    if (currentSetting === 'dark') {
        setTheme('light');
    } else if (currentSetting === 'light') {
        setTheme('dark');
    } else {
        setTheme('dark');
    }
}

//aplica el tema y actualiza el icono del boton
function setTheme(theme) {
    const icon = document.getElementById('actualThemeIcon');


    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.innerHTML = 'dark_mode';
    } else if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.innerHTML = 'light_mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.innerHTML = 'dark_mode';
        theme = 'dark';
    }

    localStorage.setItem('theme', theme);

}

