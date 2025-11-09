// ========== 主JavaScript文件 ==========

document.addEventListener('DOMContentLoaded', function() {
    // ========== 语言切换 ==========
    const langEn = document.getElementById('lang-en');
    const langZh = document.getElementById('lang-zh');
    let currentLang = localStorage.getItem('lang') || 'zh';

    setLanguage(currentLang);

    if (langEn) langEn.addEventListener('click', () => setLanguage('en'));
    if (langZh) langZh.addEventListener('click', () => setLanguage('zh'));

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        if (lang === 'en') {
            if (langEn) langEn.classList.add('active');
            if (langZh) langZh.classList.remove('active');
            document.documentElement.lang = 'en';
        } else {
            if (langZh) langZh.classList.add('active');
            if (langEn) langEn.classList.remove('active');
            document.documentElement.lang = 'zh-CN';
        }

        // 更新所有带语言属性的元素
        document.querySelectorAll('[data-en][data-zh]').forEach(el => {
            const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        });
    }

    // ========== 移动端菜单 ==========
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // 点击菜单项后关闭菜单
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // 点击外部关闭菜单
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || 
                                 mobileMenuToggle.contains(event.target);
            
            if (!isClickInside && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ========== 导航栏滚动效果 ==========
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // 添加滚动样式
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ========== 返回顶部按钮 ==========
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== 平滑滚动 ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== 数字动画计数器 ==========
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 当统计数字进入视口时触发动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, 0, target, 2000);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ========== 粒子效果（Hero区域） ==========
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.pointerEvents = 'none';
            
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            particlesContainer.appendChild(particle);
        }

        // 创建30个粒子
        for (let i = 0; i < 30; i++) {
            createParticle();
        }
    }

    // ========== AOS动画库替代方案 ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            observer.observe(el);
        });
    };

    animateOnScroll();

    // ========== 图片懒加载 ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级方案
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // ========== 表单验证（如果有联系表单） ==========
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // 创建错误提示
                    let errorMsg = input.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('span');
                        errorMsg.classList.add('error-message');
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '0.85rem';
                        errorMsg.textContent = currentLang === 'en' ? 'This field is required' : '此字段为必填项';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else {
                    input.classList.remove('error');
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });

        // 输入时移除错误状态
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
        });
    });

    // ========== 卡片悬停视差效果 ==========
    const cards = document.querySelectorAll('.research-card, .news-card, .impact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // ========== 页面加载动画 ==========
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ========== 添加页面加载进度条 ==========
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8C1515 0%, #006B81 100%);
        z-index: 9999;
        transition: width 0.3s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 90) {
            clearInterval(interval);
        }
        progressBar.style.width = Math.min(progress, 90) + '%';
    }, 100);

    window.addEventListener('load', function() {
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => progressBar.remove(), 300);
        }, 500);
    });

    // ========== 控制台欢迎信息 ==========
    console.log('%c欢迎访问雷曹实验室网站！', 'font-size: 20px; color: #8C1515; font-weight: bold;');
    console.log('%cWelcome to Lei Laboratory!', 'font-size: 16px; color: #006B81;');
    console.log('%c如有技术问题，请联系: caolei@hrbmu.edu.cn', 'font-size: 12px; color: #666;');

    // ========== 性能监控（开发用） ==========
    if (window.performance) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`页面加载时间: ${pageLoadTime}ms`);
            }, 0);
        });
    }

    // ========== 鼠标跟随效果（可选，较炫酷） ==========
    let cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #8C1515;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    let cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        width: 6px;
        height: 6px;
        background: #8C1515;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10001;
        display: none;
    `;
    document.body.appendChild(cursorDot);

    // 仅在桌面设备上启用自定义光标
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = (e.clientX + 7) + 'px';
            cursorDot.style.top = (e.clientY + 7) + 'px';
        });

        // 悬停在可点击元素上时放大
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // ========== 键盘导航支持 ==========
    document.addEventListener('keydown', function(e) {
        // 按 'Escape' 关闭移动菜单
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
        
        // 按 'Home' 键返回顶部
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // ========== 打印优化 ==========
    window.addEventListener('beforeprint', function() {
        // 在打印前移除某些元素
        document.querySelectorAll('.lang-toggle, .back-to-top, .mobile-menu-toggle').forEach(el => {
            el.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', function() {
        // 打印后恢复
        document.querySelectorAll('.lang-toggle, .back-to-top').forEach(el => {
            el.style.display = '';
        });
    });
});

// ========== Service Worker（PWA支持，可选） ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // 可以在这里注册 service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
