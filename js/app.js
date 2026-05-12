/**
 * CELOX Landing Page - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Set Current Year in Footer
       ========================================================================== */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       2. Sticky Header Appearance on Scroll
       ========================================================================== */
    const header = document.getElementById('site-header');

    const toggleHeaderBackground = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', toggleHeaderBackground);
    toggleHeaderBackground(); // initial check

    /* ==========================================================================
       3. Mobile Navigation Toggle
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    const toggleMenu = () => {
        mainNav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');

        if (mainNav.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       4. Active Navigation State on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    const highlightNavOnScroll = () => {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for header
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.main-nav a[href*=${sectionId}]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);

    /* ==========================================================================
       5. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay if attribute exists
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }

                entry.target.classList.add('is-revealed');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits bottom
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       6. FAQ Accordion Logic
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header-new');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content-new');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Close all other accordions (Optional feature)
            document.querySelectorAll('.accordion-item-new').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-header-new').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.accordion-content-new').style.maxHeight = null;
                }
            });

            // Toggle current accordion
            if (isExpanded) {
                // Close it
                item.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                // Open it
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    /* ==========================================================================
       7. Form Submission Mockup
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Loading state
            submitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> שולח...';
            submitBtn.disabled = true;

            // Mock API call delay
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> הפרטים נשלחו בהצלחה!';
                submitBtn.style.backgroundColor = '#10B981'; // Success green
                submitBtn.style.color = '#fff';
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                }, 3000);

            }, 1500);
        });
    }

    /* ==========================================================================
       8. Testimonials Carousel
       ========================================================================== */
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    if (testimonialSlides.length > 0 && testimonialDots.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const goToSlide = (index) => {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));

            testimonialSlides[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            let nextIndex = (currentSlide + 1) % testimonialSlides.length;
            goToSlide(nextIndex);
        };

        const startAutoSlide = () => {
            slideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
        };

        const stopAutoSlide = () => {
            clearInterval(slideInterval);
        };

        // Add event listeners to dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoSlide();
                startAutoSlide(); // Reset timer on manual click
            });
        });

        // Initialize carousel
        goToSlide(0);
        startAutoSlide();

        // Pause on hover can be problematic with certain transition states. 
        // We will remove it for a smoother auto-play experience across all devices.
    }

});
