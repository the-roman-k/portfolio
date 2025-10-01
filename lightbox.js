// Lightbox functionality for Web Showcase gallery
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        this.closeButton = this.lightbox.querySelector('.lightbox-close');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        
        this.init();
    }
    
    init() {
        // Add click event listeners to gallery items
        this.galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(item);
            });
        });
        
        // Add click event listener to close button
        this.closeButton.addEventListener('click', () => {
            this.closeLightbox();
        });
        
        // Add click event listener to lightbox overlay (close on backdrop click)
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Add keyboard event listener for Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.closeLightbox();
            }
        });
    }
    
    openLightbox(item) {
        const imageSrc = item.getAttribute('data-image');
        const imageAlt = item.getAttribute('data-alt');
        
        // Set the image source and alt text
        this.lightboxImage.src = imageSrc;
        this.lightboxImage.alt = imageAlt;
        
        // Show the lightbox overlay first
        this.lightbox.classList.add('active');
        
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
        
        // Focus the close button for accessibility
        setTimeout(() => {
            this.closeButton.focus();
        }, 100);
    }
    
    closeLightbox() {
        // Hide the lightbox
        this.lightbox.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Clear the image source
        this.lightboxImage.src = '';
        this.lightboxImage.alt = '';
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with the gallery
    if (document.querySelector('.gallery-item')) {
        new Lightbox();
    }
});
