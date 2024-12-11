// Initialize all functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeLanguageToggle();
    initializeHintButtons();
    initializeCopyButtons();
    addPageTransitions();
    initializeHintStates();

    // Add console welcome message
    console.clear();
    console.log('%c👋 Welcome to JavaScript Tutorial!', 'font-size: 20px; font-weight: bold; color: #9d4edd;');
    console.log('%cTry the examples below:', 'font-size: 14px; color: #666;');
});

// Language Toggle with Framer Motion-like transitions
function initializeLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.classList.contains('active')) return;

            const lang = this.dataset.lang;
            const contents = document.querySelectorAll('.en, .gu');

            // Button animations
            langButtons.forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'scale(0.95)';
            });

            this.classList.add('active');
            this.style.transform = 'scale(1)';

            // Content transitions
            contents.forEach(el => {
                if (el.classList.contains(lang)) {
                    el.style.display = 'block';
                    el.style.animation = 'springIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    el.classList.add('active');
                } else {
                    el.style.animation = 'springOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    setTimeout(() => {
                        el.classList.remove('active');
                        el.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize hint states with spring animation
function initializeHintStates() {
    const hintContents = document.querySelectorAll('.hint-content');
    hintContents.forEach(content => {
        content.style.display = 'none';
        content.classList.add('hidden');
    });
}

// Hint button functionality with spring animation
function initializeHintButtons() {
    document.querySelectorAll('.hint-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const hintContent = this.nextElementSibling;
            const isHidden = hintContent.classList.contains('hidden');

            if (isHidden) {
                hintContent.style.display = 'block';
                hintContent.classList.remove('hidden');
                hintContent.classList.add('showing');
            } else {
                hintContent.classList.remove('showing');
                hintContent.classList.add('hidden');
                setTimeout(() => {
                    hintContent.style.display = 'none';
                }, 300);
            }

            // Update button text
            const currentLang = document.querySelector('.lang-btn.active').dataset.lang;
            this.innerHTML = isHidden
                ? `<i class="fas fa-lightbulb"></i> ${currentLang === 'en' ? 'Hide Hint' : 'હિન્ટ છુપાવો'}`
                : `<i class="fas fa-lightbulb"></i> ${currentLang === 'en' ? 'Show Hint' : 'હિન્ટ બતાવો'}`;
        });
    });
}

// Copy button functionality
function initializeCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function () {
            const code = this.nextElementSibling.textContent;
            navigator.clipboard.writeText(code).then(() => {
                const icon = this.querySelector('i');
                icon.classList.replace('fa-copy', 'fa-check');

                setTimeout(() => {
                    icon.classList.replace('fa-check', 'fa-copy');
                }, 1500);
            });
        });
    });
}

// Add page transitions
function addPageTransitions() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Core styles
const styles = `
    /* Spring animations */
    @keyframes springIn {
        0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        60% {
            transform: scale(1.02) translateY(-5px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes springOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
        }
    }

    /* Content styles */
    .en, .gu {
        display: none;
        will-change: transform, opacity;
        backface-visibility: hidden;
    }

    .en.active, .gu.active {
        display: block;
    }

    /* Button animations */
    .lang-btn {
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                    background-color 0.3s ease;
        will-change: transform;
    }

    .lang-btn:hover {
        transform: scale(1.05);
    }

    .lang-btn.active {
        transform: scale(1);
    }

    /* Hint content animations */
    .hint-content {
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        will-change: transform, opacity;
    }

    .hint-content.showing {
        animation: springIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .hint-content.hidden {
        animation: springOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

// Add these styles to your existing styles constant
const navStyles = `
    .nav-section {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        width: 100%;
    }

    .nav-left {
        margin-right: auto;
    }

    .nav-right {
        margin-left: auto;
    }

    .nav-btn {
        min-width: 120px;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles + navStyles;
document.head.appendChild(styleSheet); 