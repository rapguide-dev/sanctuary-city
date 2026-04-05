const backgrounds = [
    'assets/images/background/police-dep.png',
    'assets/images/background/uwu-cafe.png',
    'assets/images/background/mechanic.png',
    'assets/images/background/hospital-dep.png',
];

let currentBgIndex = 0;
const mainContainer = document.querySelector('.main');

// Preload images to ensure smooth transitions without flickering
backgrounds.forEach(src => {
    const img = new Image();
    img.src = src;
});

function rotateBackground() {
    currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
    const nextImage = backgrounds[currentBgIndex];
    
    // Maintain the dark violet gradient overlay for text readability
    mainContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(20, 18, 18, 0.6) 40%, rgba(67, 2, 187, 0.4)), url('${nextImage}')`;
}

// Dynamic Scroll Fade Effect
function handleScrollFade() {
    // Target only elements with the .reveal class (the sections)
    // This explicitly excludes the navbar since it does not use this class
    const sections = document.querySelectorAll('section.reveal');
    const navbarHeight = 100; // Derived from .navbar height in style.css

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        // Calculate the fade as the section moves up towards the sticky navbar
        if (rect.top < navbarHeight + 50 && rect.bottom > navbarHeight) {
            const fadeDistance = rect.height * 0.6; // Transition speed
            const opacity = (rect.bottom - navbarHeight) / fadeDistance;
            section.style.opacity = Math.max(0, Math.min(1, opacity));
        } else if (section.classList.contains('active')) {
            // Reset to full opacity when the section is revealed but not near the top
            section.style.opacity = 1;
        }
    });
}

// Change background every 7 seconds
setInterval(rotateBackground, 7000);
window.addEventListener('scroll', handleScrollFade);

// Scroll Reveal Logic
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once the animation has triggered
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

document.querySelectorAll('.reveal').forEach(section => {
    sectionObserver.observe(section);
});

// Form Redirection Logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selection = document.getElementById('form-type').value;
        
        // Define your Google Form URLs here
        const urls = {
            'account-appeal': 'https://docs.google.com/forms/d/e/1FAIpQLSdbtx47tnqJRmJkKumFAW2QMrbF2iEkpFjG8zAH4TCV1Z3ZNg/viewform?usp=publish-editor',
            'perm-ban-appeal': 'https://docs.google.com/forms/d/YOUR_APPEAL_FORM_ID/viewform'
        };

        if (urls[selection]) {
            window.open(urls[selection], '_blank');
        }
    });
}
