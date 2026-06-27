// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing
    smooth: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0, 0);

// Custom Cursor
const cursor = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Magnetic Buttons
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach((elem) => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(elem, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    elem.addEventListener('mouseleave', () => {
        gsap.to(elem, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Animations
const tl = gsap.timeline();

tl.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    delay: 0.2
})
.from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")
.from('.hero-intro', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")
.from('.hero-actions', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")
.from('.hero-illustration', {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
}, "-=1")
.from('.floating-shapes .shape', {
    scale: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)"
}, "-=1");

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.reveal-up');

revealElements.forEach((elem) => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Generate Masonry Gallery Items
const masonryGrid = document.getElementById('masonry-grid');
const imageCategories = [
    { title: 'Bridal', img: 'assets/bridal.png' },
    { title: 'Minimal', img: 'assets/minimal.png' },
    { title: 'Arabic', img: 'assets/arabic.png' },
    { title: 'Mandala', img: 'assets/mandala.png' },
    { title: 'Classic', img: 'assets/user_img1.png' },
    { title: 'Elegant', img: 'assets/user_img2.png' },
    { title: 'Intricate', img: 'assets/user_img3.png' },
    { title: 'Royal', img: 'assets/user_img4.png' }
];

function generateGalleryItems(count) {
    for (let i = 0; i < count; i++) {
        const height = Math.floor(Math.random() * (400 - 250 + 1) + 250);
        const cat = imageCategories[Math.floor(Math.random() * imageCategories.length)];
        
        const item = document.createElement('div');
        item.className = 'masonry-item';
        
        item.innerHTML = `
            <div style="height: ${height}px; background-image: url('${cat.img}'); background-size: cover; background-position: center; width: 100%;"></div>
            <div class="masonry-overlay">
                <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.2rem; margin-bottom: 4px;">${cat.title} Design</h3>
                <p style="font-size: 0.8rem; color: #ECECEC; margin-bottom: 12px;">By Ashena Parveen</p>
                <div style="display: flex; gap: 8px;">
                    <span style="font-size: 0.7rem; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 100px;">1.5 Hours</span>
                    <span style="font-size: 0.7rem; padding: 4px 8px; background: rgba(255,255,255,0.1); border-radius: 100px;">Intermediate</span>
                </div>
            </div>
        `;
        
        masonryGrid.appendChild(item);
    }
    
    // Animate newly added items
    gsap.from(masonryGrid.lastElementChild, {
        scrollTrigger: {
            trigger: masonryGrid.lastElementChild,
            start: "top 90%"
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out"
    });
}

// Initial gallery items
generateGalleryItems(9);

// Infinite Scroll logic (Mock)
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        // Debounce or flag to prevent rapid firing would go here in a real app
        // For demo, we just add items occasionally if grid isn't too huge
        if (masonryGrid.children.length < 30) {
            generateGalleryItems(3);
            ScrollTrigger.refresh();
        } else {
            document.querySelector('.loading-animation').style.display = 'none';
        }
    }
});

// Mouse Parallax for hero blur circles
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    gsap.to('.circle-1', {
        x: x * 50,
        y: y * 50,
        duration: 2,
        ease: "power2.out"
    });
    
    gsap.to('.circle-2', {
        x: x * -50,
        y: y * -50,
        duration: 2,
        ease: "power2.out"
    });
});
