// ===== Scroll To Section Function =====
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

const typedTexts = [
    
    'BCA Student',
    'Cybersecurity Learner',
    'Ethical Hacking Enthusiast',
    'Web Developer',
    'Photoshop Designer'
];

let typedIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBeforeDelete = 2000;

function typeEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentText = typedTexts[typedIndex];

    if (!isDeleting) {
        if (charIndex < currentText.length) {
            typingElement.textContent += currentText[charIndex];
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            isDeleting = true;
            setTimeout(typeEffect, delayBeforeDelete);
        }
    } else if (charIndex > 0) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, deletingSpeed);
    } else {
        isDeleting = false;
        typedIndex = (typedIndex + 1) % typedTexts.length;
        setTimeout(typeEffect, 500);
    }
}

if (document.getElementById('typing-text')) {
    typeEffect();
}

// ===== Tab Switching =====
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach((tab) => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((btn) => btn.classList.remove('active'));

    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    const activeButton = Array.from(buttons).find((button) => {
        return button.getAttribute('onclick')?.includes(`'${tabName}'`);
    });

    if (activeButton) {
        activeButton.classList.add('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const firstTab = document.getElementById('experience');
    if (firstTab) {
        firstTab.classList.add('active');
    }

    const firstButton = document.querySelector('.tab-btn');
    if (firstButton) {
        firstButton.classList.add('active');
    }
});

// ===== Smooth Scrolling for All Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Web3Forms Configuration =====
const WEB3FORMS_ACCESS_KEY = '41ba6e8f-f5d3-4019-aaca-4d6390f0a11f';

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

function showMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = 'form-message';

    if (type) {
        formMessage.classList.add(type);
    }

    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name')?.toString().trim();
        const email = formData.get('email')?.toString().trim();
        const phone = formData.get('phone')?.toString().trim();
        const subject = formData.get('subject')?.toString().trim();
        const message = formData.get('message')?.toString().trim();
        const botcheck = formData.get('botcheck');

        if (!name || !email || !phone || !subject || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        if (botcheck) {
            showMessage('Spam protection blocked this submission.', 'error');
            return;
        }

        formData.set('access_key', WEB3FORMS_ACCESS_KEY);
        formData.set('from_name', 'Portfolio Contact Form');
        formData.set('replyto', email);
        formData.set('subject', `${subject} | Message from ${name}`);

        showMessage('Sending your message...', 'info');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showMessage('Email sent successfully. Please check your inbox soon.', 'success');
                contactForm.reset();
            } else {
                showMessage(data.message || 'Email could not be sent. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Web3Forms submission failed:', error);
            showMessage('Network error. Please try again or use WhatsApp.', 'error');
        }
    });
}

// ===== WhatsApp Fallback =====
function sendToWhatsApp() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !phone || !subject || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    const whatsappMessage = `*New Message from ${name}*\n\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message}`;

    const whatsappNumber = '919256808975';
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    showMessage('Opening WhatsApp...', 'success');
}

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .service-detail-card').forEach((card) => {
    observer.observe(card);
});

// ===== Active Navigation Link on Scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = `#${section.getAttribute('id')}`;
        }
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (current === href) {
            link.classList.add('active');
        }
    });
});

// ===== Button Click Effects =====
document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', function (event) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
    });
});

// ===== Initialize Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// ===== Cursor Glow Effect =====
document.addEventListener('mousemove', () => {
    // Intentionally kept for future cursor effects.
});

console.log('Portfolio website loaded successfully!');
