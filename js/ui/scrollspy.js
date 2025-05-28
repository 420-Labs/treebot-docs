// js/ui/scrollspy.js

// Set up scroll spy functionality to highlight menu items based on scroll position
function setupScrollSpy() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;

        // Only affect content menus (with IDs desktop-menu and mobile-menu)
        const menus = ['desktop-menu', 'mobile-menu'];
        menus.forEach(menuId => {
            const menu = document.getElementById(menuId);
            if (!menu) return;

            // Remove 'active' only from items in this menu
            menu.querySelectorAll('.sidebar-nav-item').forEach(item => {
                item.classList.remove('active');
            });
        });

        // Get all headings in the content
        const headings = document.querySelectorAll('#content h1[id], #content h2[id], #content h3[id], #content h4[id]');

        // Find the closest visible heading to the top
        let activeHeading = null;
        for (let i = 0; i < headings.length; i++) {
            if (headings[i].offsetTop <= scrollPosition) {
                activeHeading = headings[i];
            } else {
                break;
            }
        }

        if (activeHeading) {
            const activeId = activeHeading.id;

            // Mark 'active' ONLY in content menus
            menus.forEach(menuId => {
                const menuItem = document.querySelector(`#${menuId} .sidebar-nav-item a[href="#${activeId}"]`);
                if (menuItem) {
                    menuItem.parentElement.classList.add('active');
                }
            });
        }
    });
}

// Export function
window.setupScrollSpy = setupScrollSpy;