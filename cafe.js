// Utility Functions
function throttle(fn, wait) {
    let timeout;
    return function (...args) {
        if (!timeout) {
            timeout = setTimeout(() => {
                fn.apply(this, args);
                timeout = null;
            }, wait);
        }
    };
}

function debounce(fn, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}

// Smooth Scroll Function
function smoothScroll(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Handle Menu Click
function handleMenuClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    if (targetId) {
        smoothScroll(targetId);
    }
}

// Form Validation
function validateForm(form) {
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;

    if (!name || !email || !message) {
        alert('All fields are required.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

// Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    if (validateForm(form)) {
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');

        // Reset the form
        form.reset();
    }
}

// Intersection Observer Setup
function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleMenuClick);
    });

    // Form submission handler
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);

    // Intersection Observer setup
    setupIntersectionObserver();

    // Resize event handler with throttle
    const handleResize = throttle(() => {
        console.log('Window resized');
    }, 200);

    window.addEventListener('resize', handleResize);

    // Scroll event handler with debounce
    const handleScroll = debounce(() => {
        console.log('Scrolled');
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Additional setup for animations
    setupAnimations();
});

// Animation setup
function setupAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 1s ease-out';
        const handleScrollAnimation = () => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.style.opacity = 1;
            } else {
                el.style.opacity = 0;
            }
        };
        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation(); // Initial check
    });
}

// Example of handling multiple forms
function setupMultipleForms() {
    document.querySelectorAll('.form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

setupMultipleForms();

// More complex interactions can be added as needed