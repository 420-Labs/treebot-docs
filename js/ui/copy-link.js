// js/ui/copy-link.js

/**
 * Adds click-to-copy functionality to headings with IDs
 * When a heading is clicked, the URL with the heading's ID as a hash is copied to the clipboard
 * and a tooltip is shown to indicate that the link was copied
 */
function setupCopyLinkOnClick() {
    // Get all headings with IDs
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    
    // Add click event to each heading
    headings.forEach(heading => {
        // Skip headings that already have the bug-title class (handled separately in bugs.html)
        if (heading.classList.contains('bug-title')) {
            return;
        }
        
        // Add cursor pointer style
        heading.style.cursor = 'pointer';
        
        // Add click event
        heading.addEventListener('click', function() {
            // Get the heading ID
            const headingId = this.id;
            
            // Update URL hash
            window.location.hash = headingId;
            
            // Get translations
            const translations = window.currentTranslations || {};
            
            // Show copy tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            tooltip.textContent = translations.copy_link || 'Link copied!';
            
            // Position tooltip near the heading
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            
            // Add tooltip styles if they don't exist
            if (!document.querySelector('style#copy-tooltip-styles')) {
                const style = document.createElement('style');
                style.id = 'copy-tooltip-styles';
                style.textContent = `
                    .copy-tooltip {
                        position: absolute;
                        background-color: rgba(0, 0, 0, 0.8);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        font-size: 12px;
                        z-index: 100;
                        display: none;
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(tooltip);
            tooltip.style.display = 'block';
            
            // Copy URL to clipboard
            const url = window.location.href;
            navigator.clipboard.writeText(url).catch(err => {
                console.error('Could not copy URL: ', err);
            });
            
            // Hide tooltip after 2 seconds
            setTimeout(() => {
                tooltip.style.display = 'none';
                document.body.removeChild(tooltip);
            }, 2000);
        });
    });
}

// Export function
window.setupCopyLinkOnClick = setupCopyLinkOnClick;