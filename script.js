// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.step, .benefit-card').forEach((el) => {
    observer.observe(el);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', function () {
        const faqItem = this.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const toggle = this.querySelector('.faq-toggle');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach((item) => {
            if (item !== faqItem) {
                item.querySelector('.faq-answer').classList.remove('active');
                item.querySelector('.faq-toggle').classList.remove('active');
            }
        });

        // Toggle current FAQ item
        answer.classList.toggle('active');
        toggle.classList.toggle('active');
    });
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function () {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Add staggered animation delays for benefit cards
document.querySelectorAll('.benefit-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add staggered animation delays for steps
document.querySelectorAll('.step').forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.2}s`;
});

// Pulse button interaction
document.querySelector('.pulse-btn').addEventListener('click', function () {
    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);

    // You can add form submission or redirect logic here
    alert('Thank you for your interest! We will contact you soon.');
});

// Security card hover effects
document.querySelectorAll('.security-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-visual');
    const speed = scrolled * 0.5;

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Initialize animations on page load
window.addEventListener('load', function () {
    // Add loaded class to body for any additional animations
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.step, .benefit-card').forEach((el) => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment the line below if you want typing effect on hero title
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-text h1');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 30);
// });

// Add scroll-triggered counter animation for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Form validation for demo requests (if you add a form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border)';
        }
    });

    return isValid;
}

// Add loading states for buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;

    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Error handling for any API calls (future use)
function handleError(error, fallbackMessage = 'Something went wrong. Please try again.') {
    console.error('Error:', error);
    // You can add toast notifications or error displays here
    alert(fallbackMessage);
}

// Performance optimization: Lazy load images if you add them
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);
