// Show/hide the navigation bar based on scroll direction
let lastScrollTop = 0;
const nav = document.querySelector('.nav');
const scrollToInfoButton = document.querySelector('.btn');

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        // Scroll Down
        nav.classList.add('hidden');
    } else {
        // Scroll Up
        nav.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;

    // Add scroll animations to info blocks
    const infoBlocks = document.querySelectorAll('.info-block');
    infoBlocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            block.style.opacity = 1;
            block.style.transform = 'translateY(0)';
            block.style.animation = 'fadeInUp 1s forwards';
        }
    });
});

// Smooth scroll to info section
scrollToInfoButton.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#info-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// Intersection Observer for info blocks
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const rect = element.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight * 0.9;
            if (isInView) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
                element.style.animation = 'fadeInUp 1s forwards';
            }
            // Unobserve the element after it becomes visible
            observer.unobserve(element);
        }
    });
}, observerOptions);

document.querySelectorAll('.info-block').forEach(block => {
    observer.observe(block);
});
