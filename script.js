// ==========================================
// Initialize Lucide icons
// ==========================================
lucide.createIcons();

// ==========================================
// Smooth scrolling for mobile menu links
// ==========================================
const mobileLinks = document.querySelectorAll('.mobile-link:not(.mobile-resume)');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('nav-hamburger');

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('open');
    }
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// ==========================================
// Navbar scroll state
// ==========================================
const nav = document.getElementById('top-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// ==========================================
// Reveal on scroll (IntersectionObserver)
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger siblings within same parent
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((sib, idx) => {
                if (sib === entry.target) delay = idx * 80;
            });
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// ==========================================
// Number counter animation for hero stats
// ==========================================
function animateCounter(el, target, duration = 1400) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = '+' + target;
            clearInterval(timer);
        } else {
            el.textContent = '+' + start;
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            if (!isNaN(target)) {
                animateCounter(el, target);
            }
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    counterObserver.observe(el);
});

// ==========================================
// Case Study Expand/Collapse
// ==========================================
const caseStudyWrappers = document.querySelectorAll('.case-study-wrapper');

caseStudyWrappers.forEach(wrapper => {
    const btn = wrapper.querySelector('.case-study-toggle');
    const panel = wrapper.querySelector('.case-study-panel');

    if (btn && panel) {
        btn.addEventListener('click', () => {
            const isOpen = panel.classList.contains('open');

            if (isOpen) {
                panel.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                panel.setAttribute('aria-hidden', 'true');
            } else {
                panel.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                panel.setAttribute('aria-hidden', 'false');
                setTimeout(() => {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 150);
            }
        });
    }
});

// ==========================================
// Contact form — graceful mailto fallback
// ==========================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Contact';
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !message) return; // Let browser handle required validation

        // Build a mailto link for environments where form submission doesn't work
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const mailtoUrl = `mailto:vaishnavi.tirupathi39@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        e.preventDefault();
        window.location.href = mailtoUrl;
    });
}

// ==========================================
// Active nav link highlight on scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => {
                a.style.color = '';
                if (a.getAttribute('href') === `#${id}`) {
                    a.style.color = '#ffffff';
                }
            });
        }
    });
}, {
    threshold: 0,
    rootMargin: '-40% 0px -59% 0px'
});

sections.forEach(s => sectionObserver.observe(s));
