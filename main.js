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
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        icon.innerHTML = 'dark_mode';
    } else if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        icon.innerHTML = 'light_mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        icon.innerHTML = 'dark_mode';
        theme = 'dark';
    }

    localStorage.setItem('theme', theme);

}

// funcion para que los links del menu tengan el scroll suave cuando se haga click
function smoothScroll(event) {
    console.log(event);
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const targetPosition = targetElement.getBoundingClientRect().bottom + window.scrollY - 80 - targetElement.offsetHeight;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}



function generarMenu() {
    const contenido = document.getElementById('content');
    const desktopMenu = document.getElementById('desktop-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Seleccionar todos los encabezados h1, h2 y h3 que tengan un id
    const encabezados = contenido.querySelectorAll('h1[id], h2[id], h3[id], h4[id]');
    
    // Función para crear los elementos del menú
    function crearItemsMenu(menu) {
        // Limpiar el menú primero
        menu.innerHTML = '';
        
        encabezados.forEach(encabezado => {
            // Crear un elemento de lista para el menú
            const item = document.createElement('li');
            item.className = 'sidebar-nav-item';
            
            // Crear un enlace
            const enlace = document.createElement('a');
            
            // Si el encabezado tiene un ID, usarlo como ancla
            if (encabezado.id) {
                enlace.href = '#' + encabezado.id;
            } else {
                // Si no tiene ID, generamos uno basado en el texto
                const id = encabezado.textContent.toLowerCase().replace(/\s+/g, '-');
                encabezado.id = id;
                enlace.href = '#' + id;
            }
            
            enlace.innerHTML = encabezado.innerHTML;
            
            // Aplicar sangría según el nivel del encabezado
            if (encabezado.tagName === 'H2') {
                item.style.paddingLeft = '20px';
            } else if (encabezado.tagName === 'H3') {
                item.style.paddingLeft = '40px';
            } else if (encabezado.tagName === 'H4') {
                item.style.paddingLeft = '60px';
            }

            
            enlace.addEventListener('click', smoothScroll);
            item.appendChild(enlace);
            menu.appendChild(item);
        });
    }
    
    // Llenar ambos menús si existen
    if (desktopMenu) {
        crearItemsMenu(desktopMenu);
    }
    
    if (mobileMenu) {
        crearItemsMenu(mobileMenu);
    }
}

function setupScrollSpy() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        // Obtener todos los encabezados
        const headings = document.querySelectorAll('#content h1[id], #content h2[id], #content h3[id], #content h4[id]');
        
        // Encontrar el encabezado visible más cercano al top
        let activeHeading = null;
        for (let i = 0; i < headings.length; i++) {
            if (headings[i].offsetTop <= scrollPosition) {
                activeHeading = headings[i];
            } else {
                break; // Ya pasamos todos los encabezados visibles
            }
        }
        
        if (activeHeading) {
            // Quitar active de todos los elementos del menú en ambos menús
            document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Añadir active al elemento correspondiente en ambos menús
            const activeId = activeHeading.id;
            
            // Para desktop
            const desktopMenuItem = document.querySelector(`#desktop-menu .sidebar-nav-item a[href="#${activeId}"]`);
            if (desktopMenuItem) {
                desktopMenuItem.parentElement.classList.add('active');
            }
            
            // Para móvil
            const mobileMenuItem = document.querySelector(`#mobile-menu .sidebar-nav-item a[href="#${activeId}"]`);
            if (mobileMenuItem) {
                mobileMenuItem.parentElement.classList.add('active');
            }
        }
    });
}

  
  // Ejecutar después de generar el menú
  function init() {
    generarMenu();
    setupScrollSpy();
  }
  
  // Ejecutar cuando el DOM esté cargado
  document.addEventListener('DOMContentLoaded', init);
  