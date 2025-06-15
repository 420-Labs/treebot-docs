// js/ui/menu.js

// Pages configuration for navigation
const pages = [
    {name: 'menu_home', url: '/treebot-docs/index.html', icon: 'home'},
    {name: 'menu_terms', url: '/treebot-docs/docs/terms.html', icon: 'gavel'},
    {name: 'menu_changelog', url: '/treebot-docs/docs/changelog.html', icon: 'history'},
    {name: 'menu_bugs', url: '/treebot-docs/docs/bugs.html', icon: 'bug'},
    // Add more pages here
];


// Generate left menu (navigation) with translations
function generateLeftMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;
    menu.innerHTML = '';

    // Get current page path
    const pathname = window.location.pathname;

    // Get translations
    const translations = window.currentTranslations || {};

    pages.forEach(page => {
        const li = document.createElement('li');
        li.className = 'sidebar-nav-item';

        // Mark the active page
        const isHome = page.url === '/index.html' && (
            pathname === '/' ||
            pathname.endsWith('/index.html') ||
            pathname.endsWith('/'));

        if (isHome || pathname.endsWith(page.url)) {
            li.classList.add('active');
        }

        const a = document.createElement('a');
        a.href = page.url;

        // Use translation if available, otherwise use a default name
        let pageName = page.name;
        if (translations[page.name]) {
            pageName = translations[page.name];
        } else if (page.name === 'menu_home') {
            pageName = 'Home';
        } else if (page.name === 'menu_terms') {
            pageName = 'Terms of Service';
        }

        a.innerHTML = `<i class="fa-solid fa-${page.icon} me-2 icon-primary"></i>${pageName}`;

        li.appendChild(a);
        menu.appendChild(li);
    });
}

// Generate the content menu (for headings in the page)
function generateContentMenu() {
    const content = document.getElementById('content');
    const desktopMenu = document.getElementById('desktop-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!content) return;

    // Select all headings with IDs
    const headings = content.querySelectorAll('h1[id], h2[id], h3[id], h4[id]');

    // Function to create menu items
    function createMenuItems(menu) {
        if (!menu) return;

        // Clear menu first
        menu.innerHTML = '';

        headings.forEach(heading => {
            // Create menu item
            const item = document.createElement('li');
            item.className = 'sidebar-nav-item';

            // Get heading ID or generate one
            let headingId = heading.id;
            if (!headingId) {
                headingId = heading.textContent.toLowerCase().replace(/\s+/g, '-');
                heading.id = headingId;
            }

            // Store the target ID as a data attribute on the li element
            item.dataset.targetId = '#' + headingId;

            // Create link
            const link = document.createElement('a');
            link.href = '#' + headingId;

            let iconHtml = '';
        // Buscá el <i> adentro del heading (el icono)
            const icon = heading.querySelector('i');
            if (icon) {
                iconHtml = icon.outerHTML + ' ';
            }

            // Buscá el texto traducido
            let headingText;
            const i18nSpan = heading.querySelector('[data-i18n]');
            if (i18nSpan) {
                headingText = i18nSpan.textContent;
            } else {
                headingText = heading.textContent.trim();
            }

            // Agregá la versión si existe
            const version = heading.getAttribute('data-version');
            if (version) {
                headingText += ` (v ${version})`;
            }

            // Uní todo y ponelo como innerHTML
            link.innerHTML = iconHtml + headingText

            // Make the li element act like a link (cursor pointer)
            item.style.cursor = 'pointer';

            // Apply indentation based on heading level
            if (heading.tagName === 'H2') {
                item.style.paddingLeft = '20px';
            } else if (heading.tagName === 'H3') {
                item.style.paddingLeft = '40px';
            } else if (heading.tagName === 'H4') {
                item.style.paddingLeft = '60px';
            }

            // Add the link to the item
            item.appendChild(link);
            menu.appendChild(item);
        });

        // Add click event to the entire menu using event delegation
        menu.addEventListener('click', function(event) {
            // Find the closest li.sidebar-nav-item
            let targetItem = event.target;
            while (targetItem && !targetItem.classList.contains('sidebar-nav-item')) {
                targetItem = targetItem.parentElement;
            }

            // If we found a menu item
            if (targetItem && targetItem.dataset.targetId) {
                event.preventDefault();

                // Get the target ID from the data attribute
                const targetId = targetItem.dataset.targetId;

                // Check if it's an anchor
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // If it's not an anchor, navigate to the page
                    window.location.href = targetId;
                }
            }
        });
    }

    // Generate for both menus
    if (desktopMenu) createMenuItems(desktopMenu);
    if (mobileMenu) createMenuItems(mobileMenu);
}

// Initialize all menus
function initMenus() {
    // Generate left navigation menu
    generateLeftMenu('left-desktop-menu');
    generateLeftMenu('left-mobile-menu');

    // Generate content menu
    generateContentMenu();
}
// Smooth scroll function for anchor links
function smoothScroll(event) {
    // Prevent default behavior initially
    event.preventDefault();

    // Find the closest <a> element (it might be the target or a parent)
    let linkElement = event.target;
    while (linkElement && linkElement.tagName !== 'A') {
        linkElement = linkElement.parentElement;
    }

    // If no link was found, exit
    if (!linkElement) {
        return;
    }

    // Get the href attribute from the actual <a> element
    const targetId = linkElement.getAttribute('href');

    // Safety checks
    if (!targetId) {
        console.error("No href attribute found");
        return;
    }

    // Check if it's an anchor link (starts with #)
    if (!targetId.startsWith('#')) {
        window.location.href = targetId;
        return;
    }

    // Try to find the target element
    const targetElement = document.querySelector(targetId);

    // Check if element exists
    if (!targetElement) {
        console.error(`Element with selector "\${targetId}" not found on this page`);
        return;
    }

    // Calculate position and scroll
    try {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error("Error scrolling to element:", error);
    }
}

// Export functions
window.initMenus = initMenus;
window.smoothScroll = smoothScroll;
