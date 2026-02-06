/**
 * EUPRO 欧诺包装 - 策略页面
 * Main JavaScript
 */

(function() {
    'use strict';

    // ===== DOM 元素 =====
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const accordionItems = document.querySelectorAll('[data-accordion]');
    const sideNavItems = document.querySelectorAll('.side-nav__item');
    const sections = document.querySelectorAll('section[id]');

    // ===== 工具函数 =====
    
    /**
     * 防抖函数
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * 节流函数
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===== 功能模块 =====

    /**
     * 头部导航滚动效果
     */
    function initHeaderScroll() {
        let lastScrollY = window.scrollY;
        
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;
            
            // 添加/移除滚动阴影
            if (currentScrollY > 10) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            lastScrollY = currentScrollY;
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * 移动端菜单切换
     */
    function initMobileMenu() {
        if (!menuToggle || !mobileNav) return;

        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // 更新 aria-expanded
            const isExpanded = mobileNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // 点击导航链接后关闭菜单
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * 手风琴组件 - 互斥展开
     */
    function initAccordion() {
        accordionItems.forEach(item => {
            const header = item.querySelector('.strategy-accordion__header');
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('strategy-accordion__item--active');
                
                // 关闭所有其他项（手风琴模式 - 互斥）
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('strategy-accordion__item--active');
                });
                
                // 如果当前项未激活，则展开它
                if (!isActive) {
                    item.classList.add('strategy-accordion__item--active');
                }
            });
        });
    }

    /**
     * 侧边导航滚动监听
     */
    function initSideNavScroll() {
        if (sideNavItems.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // 更新侧边导航激活状态
                    sideNavItems.forEach(item => {
                        const link = item.querySelector('.side-nav__link');
                        const href = link.getAttribute('href');
                        
                        if (href === `#${id}`) {
                            item.classList.add('side-nav__item--active');
                        } else {
                            item.classList.remove('side-nav__item--active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * 平滑滚动
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * 滚动显示动画
     */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.strategy-intro, .strategy-services, .competitiveness, .values, .cta'
        );

        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealOnScroll.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealOnScroll.observe(el);
        });

        // 添加 revealed 类的样式
        const style = document.createElement('style');
        style.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 图片懒加载优化
     */
    function initLazyLoad() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(img => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                imageObserver.observe(img);
            });

            // 添加 loaded 样式
            const style = document.createElement('style');
            style.textContent = `
                img.loaded {
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * 响应式字体大小微调
     */
    function initResponsiveFontSize() {
        const adjustFontSize = debounce(() => {
            const width = window.innerWidth;
            const html = document.documentElement;
            
            // 根据屏幕宽度微调基准字号
            if (width >= 1920) {
                html.style.fontSize = '100px';
            } else if (width >= 1440) {
                html.style.fontSize = '';
            }
        }, 250);

        window.addEventListener('resize', adjustFontSize);
    }

    // ===== 初始化 =====
    function init() {
        initHeaderScroll();
        initMobileMenu();
        initAccordion();
        initSideNavScroll();
        initSmoothScroll();
        initScrollReveal();
        initLazyLoad();
        initResponsiveFontSize();
        
        console.log('🎉 EUPRO 欧诺包装 - 策略页面已加载');
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
