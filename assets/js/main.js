// Language Toggle
document.addEventListener('DOMContentLoaded', function() {
    const langEn = document.getElementById('lang-en');
    const langZh = document.getElementById('lang-zh');
    let currentLang = localStorage.getItem('lang') || 'zh';

    setLanguage(currentLang);

    langEn.addEventListener('click', () => setLanguage('en'));
    langZh.addEventListener('click', () => setLanguage('zh'));

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        if (lang === 'en') {
            langEn.classList.add('active');
            langZh.classList.remove('active');
        } else {
            langZh.classList.add('active');
            langEn.classList.remove('active');
        }

        document.querySelectorAll('[data-en][data-zh]').forEach(el => {
            el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
