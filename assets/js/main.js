// Lei Laboratory Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle
    const langEn = document.getElementById('lang-en');
    const langZh = document.getElementById('lang-zh');
    let currentLang = localStorage.getItem('lang') || 'en';

    // Set initial language
    setLanguage(currentLang);

    if (langEn) {
        langEn.addEventListener('click', () => {
            setLanguage('en');
        });
    }

    if (langZh) {
        langZh.addEventListener('click', () => {
            setLanguage('zh');
        });
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        // Update button states
        if (langEn && langZh) {
            if (lang === 'en') {
                langEn.classList.add('active');
                langZh.classList.remove('active');
            } else {
                langZh.classList.add('active');
                langEn.classList.remove('active');
            }
        }

        // Update all elements with data-en and data-zh attributes
        document.querySelectorAll('[data-en][data-zh]').forEach(element => {
            if (lang === 'en') {
                element.textContent = element.getAttribute('data-en');
            } else {
                element.textContent = element.getAttribute('data-zh');
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (if needed)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});