/**
 * Portfolio v2 — Main JavaScript
 * Single entry point: navigation, scroll effects, form handling
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initNavigation();
        initScrollReveal();
        initAboutAnimation();
        initContactSection();
        initContactForm();
        initStatCounters();
        setFooterYear();
    }

    /* ------------------------------------------------------------------ */
    /* Navigation & scroll spy                                            */
    /* ------------------------------------------------------------------ */

    function initNavigation() {
        const sections = document.querySelectorAll('main section[id], header section[id]');
        const navLinks = document.querySelectorAll('.nav-link[data-section], .navbar-brand[data-section]');
        const navbar = document.querySelector('.navbar');
        const heroCtaLinks = document.querySelectorAll('.hero-cta a[data-section]');

        function scrollToSection(targetId) {
            const target = document.getElementById(targetId);
            if (!target) return;

            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler')?.click();
            }

            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });

            history.pushState(null, '', `#${targetId}`);
        }

        function handleNavClick(e) {
            const link = e.currentTarget;
            const href = link.getAttribute('href');
            const targetId = link.getAttribute('data-section') ||
                (href && href.startsWith('#') ? href.slice(1) : null);

            if (!targetId || !href || !href.startsWith('#')) return;

            e.preventDefault();
            scrollToSection(targetId);
        }

        navLinks.forEach(link => link.addEventListener('click', handleNavClick));
        heroCtaLinks.forEach(link => link.addEventListener('click', handleNavClick));

        document.querySelectorAll('.hero-cta a[href^="#"]').forEach(link => {
            if (!link.dataset.section) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const id = this.getAttribute('href').slice(1);
                    scrollToSection(id);
                });
            }
        });

        function updateActiveNav() {
            const scrollPos = window.scrollY + 120;
            let currentId = 'home';

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentId = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('data-section') === currentId);
            });
        }

        function updateNavbar() {
            if (!navbar) return;
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }

        updateActiveNav();
        updateNavbar();

        window.addEventListener('scroll', () => {
            updateActiveNav();
            updateNavbar();
        }, { passive: true });
    }

    /* ------------------------------------------------------------------ */
    /* Scroll reveal                                                      */
    /* ------------------------------------------------------------------ */

    function initScrollReveal() {
        const items = document.querySelectorAll('.reveal-item');

        if (prefersReducedMotion) {
            items.forEach(el => el.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        items.forEach(el => observer.observe(el));
    }

    /* ------------------------------------------------------------------ */
    /* About section animation                                            */
    /* ------------------------------------------------------------------ */

    function initAboutAnimation() {
        const aboutRow = document.querySelector('.about-row');
        if (!aboutRow) return;

        if (prefersReducedMotion) {
            aboutRow.classList.add('animated');
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutRow.classList.add('animated');
                        observer.unobserve(aboutRow);
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(aboutRow);
    }

    /* ------------------------------------------------------------------ */
    /* Contact section in-view                                            */
    /* ------------------------------------------------------------------ */

    function initContactSection() {
        const contactSection = document.querySelector('.contact-section');
        if (!contactSection) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        contactSection.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(contactSection);
    }

    /* ------------------------------------------------------------------ */
    /* Contact form                                                       */
    /* ------------------------------------------------------------------ */

    function initContactForm() {
        const form = document.getElementById('contactForm');
        const statusEl = document.getElementById('formStatus');
        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            const honeypot = form.querySelector('#website');
            if (honeypot && honeypot.value.trim() !== '') {
                return;
            }

            form.classList.add('was-validated');

            if (statusEl) {
                statusEl.textContent = 'Thank you! Your message has been received. I will get back to you soon.';
                statusEl.style.color = '#28a745';
            }

            form.reset();
            form.classList.remove('was-validated');

            /* TODO: Wire to Formspree or custom API endpoint when ready */
        });
    }

    /* ------------------------------------------------------------------ */
    /* Animated stat counters                                             */
    /* ------------------------------------------------------------------ */

    function initStatCounters() {
        const stats = document.querySelectorAll('.stat-number[data-target]');
        if (!stats.length) return;

        if (prefersReducedMotion) {
            stats.forEach(el => {
                el.textContent = el.dataset.target;
            });
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        stats.forEach(el => observer.observe(el));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + (target === 10 ? '+' : '');
            }
        }

        requestAnimationFrame(step);
    }

    /* ------------------------------------------------------------------ */
    /* Footer                                                             */
    /* ------------------------------------------------------------------ */

    function setFooterYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
})();
