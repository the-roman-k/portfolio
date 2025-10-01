// Enhanced Navigation Controller with Mobile Menu Support
class NavigationController {
    constructor() {
        this.lastScrollY = 0;
        this.scrollThreshold = 10;
        this.hideDelay = 75;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.hideTimeout = null;
        this.resizeTimeout = null; // For debouncing resize events
        
        // Navigation elements
        this.navWrapper = document.querySelector('.nav-wrapper');
        this.navLevel01 = document.querySelector('.nav-level-01');
        this.navLevel02 = document.querySelector('.nav-level-02');
        this.hamburgerMenu = document.querySelector('.hamburger-menu');
        this.navItems = document.querySelector('.nav-items');
        this.navItemsSecondary = document.querySelector('.nav-items-secondary');
        this.mobileMenuPanel = document.querySelector('.mobile-menu-panel');
        this.mobileMenuContent = document.querySelector('.mobile-menu-content');
        this.mobileNavSections = document.querySelectorAll('.mobile-nav-section');
        
        // State
        this.isMenuOpen = false;
        this.isPageWithSecondaryNav = this.detectPageType();
        
        this.init();
    }
    
    init() {
        // Set initial state
        this.showBothLevels();
        this.setupNavigationLevel();
        
        // Check initial navigation width after DOM is fully ready
        setTimeout(() => {
            this.checkNavigationWidth();
        }, 200);
        
        // Add event listeners
        this.addEventListeners();
    }
    
    addEventListeners() {
        // Scroll behavior
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Resize handling
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Hamburger menu toggle
        if (this.hamburgerMenu) {
            this.hamburgerMenu.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
        
        // Mobile menu panel click (close on backdrop)
        if (this.mobileMenuPanel) {
            this.mobileMenuPanel.addEventListener('click', this.handleMobileMenuBackdropClick.bind(this));
        }
        
        // Prevent menu content clicks from closing the menu
        if (this.mobileMenuContent) {
            this.mobileMenuContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Close menu when clicking mobile nav items
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item, .mobile-nav-subitem');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', this.closeMobileMenu.bind(this));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }
    
    detectPageType() {
        // Logic to determine if this page should show secondary navigation
        const isTemplatesPage = window.location.pathname.includes('templates') || 
                              document.title.includes('Templates') ||
                              document.body.classList.contains('templates-page');
        
        const hasSelectedProjectsActive = document.querySelector('.nav-item[href*="selected-projects"]')?.classList.contains('nav-item--active');
        
        // Check if we're on a Selected Projects page or any of its sub-pages
        const isSelectedProjectsPage = window.location.pathname.includes('selected-projects') ||
                                     window.location.pathname.includes('healthcare-enterprise') ||
                                     window.location.pathname.includes('code-discovery-platform') ||
                                     window.location.pathname.includes('motoshare') ||
                                     window.location.pathname.includes('vendor-portal') ||
                                     window.location.pathname.includes('vehicle-tracking-system');
        
        return isTemplatesPage || hasSelectedProjectsActive || isSelectedProjectsPage;
    }
    
    setupNavigationLevel() {
        if (this.isPageWithSecondaryNav) {
            if (this.navLevel02) {
                this.navLevel02.classList.remove('nav-level-hidden');
            }
            document.body.classList.remove('nav-single-level');
        } else {
            if (this.navLevel02) {
                this.navLevel02.classList.add('nav-level-hidden');
            }
            document.body.classList.add('nav-single-level');
        }
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.isMenuOpen = true;
        this.hamburgerMenu.classList.add('menu-open');
        this.hamburgerMenu.setAttribute('aria-expanded', 'true');
        this.mobileMenuPanel.classList.add('menu-open');
        document.body.classList.add('mobile-menu-open'); // Prevent body scroll
        
        // Focus management
        if (this.mobileMenuContent) {
            this.mobileMenuContent.focus();
        }
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.hamburgerMenu.classList.remove('menu-open');
        this.hamburgerMenu.setAttribute('aria-expanded', 'false');
        this.mobileMenuPanel.classList.remove('menu-open');
        document.body.classList.remove('mobile-menu-open'); // Restore body scroll
    }
    
    handleMobileMenuBackdropClick(e) {
        if (e.target === this.mobileMenuPanel) {
            this.closeMobileMenu();
        }
    }
    
    handleKeydown(e) {
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMobileMenu();
            if (this.hamburgerMenu) {
                this.hamburgerMenu.focus(); // Return focus to hamburger button
            }
        }
    }
    
    handleScroll() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        requestAnimationFrame(() => {
            const currentScrollY = window.pageYOffset;
            const scrollDelta = currentScrollY - this.lastScrollY;
            
            // Always show navigation at the top of the page
            if (currentScrollY <= 50) {
                clearTimeout(this.hideTimeout);
                this.showNavigation();
                this.lastScrollY = currentScrollY;
                this.isScrolling = false;
                return;
            }
            
            // Only trigger if scroll distance exceeds threshold
            if (Math.abs(scrollDelta) > this.scrollThreshold) {
                if (scrollDelta > 0) {
                    // Scrolling DOWN - hide navigation with delay
                    clearTimeout(this.hideTimeout);
                    this.hideTimeout = setTimeout(() => {
                        this.hideNavigation();
                    }, this.hideDelay);
                } else {
                    // Scrolling UP - show navigation immediately
                    clearTimeout(this.hideTimeout);
                    this.showNavigation();
                }
            }
            
            this.lastScrollY = currentScrollY;
            
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 100);
        });
    }
    
    hideNavigation() {
        this.navWrapper.classList.add('nav-hidden');
    }
    
    showNavigation() {
        this.navWrapper.classList.remove('nav-hidden');
    }
    
    showBothLevels() {
        this.navWrapper.classList.remove('nav-hidden');
        if (this.isPageWithSecondaryNav && this.navLevel02) {
            this.navLevel02.classList.remove('nav-level-hidden');
        }
    }
    
    handleResize() {
        this.showBothLevels();
        this.closeMobileMenu();
        
        // Debounce resize events to prevent too many calculations
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.checkNavigationWidth();
        }, 150);
    }
    
    // Check if navigation items fit horizontally
    checkNavigationWidth() {
        // Use a simple breakpoint approach for now
        const viewportWidth = window.innerWidth;
        const breakpoint = 1280; // Same as CSS breakpoint
        
        if (viewportWidth <= breakpoint) {
            this.enableHamburgerMode();
        } else {
            this.disableHamburgerMode();
        }
        
        // Log for debugging
        console.log(`Viewport: ${viewportWidth}px, Breakpoint: ${breakpoint}px, Needs hamburger: ${viewportWidth <= breakpoint}`);
    }
    
    // Enable hamburger mode
    enableHamburgerMode() {
        this.navWrapper.classList.add('nav-overflow');
        this.hamburgerMenu.style.display = 'flex';
    }
    
    // Disable hamburger mode
    disableHamburgerMode() {
        this.navWrapper.classList.remove('nav-overflow');
        this.hamburgerMenu.style.display = 'none';
        this.closeMobileMenu(); // Close mobile menu if open
    }
    
    setNavigationLevel(level = 'both') {
        if (level === 'single') {
            if (this.navLevel02) {
                this.navLevel02.classList.add('nav-level-hidden');
            }
            document.body.classList.add('nav-single-level');
            this.isPageWithSecondaryNav = false;
        } else {
            if (this.navLevel02) {
                this.navLevel02.classList.remove('nav-level-hidden');
            }
            document.body.classList.remove('nav-single-level');
            this.isPageWithSecondaryNav = true;
        }
        this.setupNavigationLevel();
    }
    
    isNavigationHidden() {
        return this.navWrapper.classList.contains('nav-hidden');
    }
}

// Go to top functionality
const goToTop = document.querySelector('.go-to-top-button');
if (goToTop) {
    goToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize navigation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationController = new NavigationController();
});

// Demo function to test navigation level switching (for development)
function toggleNavigationLevel() {
    if (window.navigationController) {
        const currentLevel = window.navigationController.isPageWithSecondaryNav ? 'both' : 'single';
        const newLevel = currentLevel === 'both' ? 'single' : 'both';
        window.navigationController.setNavigationLevel(newLevel);
        console.log(`Navigation level changed to: ${newLevel}`);
    }
}

// Make toggle function available globally for testing
window.toggleNavigationLevel = toggleNavigationLevel;
