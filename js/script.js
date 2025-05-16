// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});

// Update active navigation link based on current page
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class if the href matches current path
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
});

// For single page navigation (if you have sections on the same page)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(l => {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// Smooth Scroll for All Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Modal Functionality
function createProjectModal() {
    // Create modal container if it doesn't exist
    if (!document.querySelector('.project-modal')) {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'project-modal';
        document.body.appendChild(modalContainer);
    }
}

function showProjectModal(title, description, image) {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'project-modal';
    
    modalContainer.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="modal-header">
                <img src="${image}" alt="${title}">
            </div>
            
            <div class="modal-scroll-container">
                <div class="modal-body">
                    <h2 class="modal-title">${title}</h2>
                    
                    <div class="project-details">
                        <div class="detail-item">
                            <span class="detail-label">Project Type</span>
                            <span class="detail-value">Web Application</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">3 Months</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Role</span>
                            <span class="detail-value">Full Stack Developer</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Client</span>
                            <span class="detail-value">Personal Project</span>
                        </div>
                    </div>

                    <div class="technologies">
                        <h3>Technologies Used</h3>
                        <div class="tech-stack">
                            <span class="tech-tag">HTML5</span>
                            <span class="tech-tag">CSS3</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">Node.js</span>
                        </div>
                    </div>

                    <div class="project-overview">
                        <h3>Project Overview</h3>
                        <p class="modal-description">${description}</p>
                    </div>

                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            <li>Responsive Design</li>
                            <li>User Authentication</li>
                            <li>Real-time Updates</li>
                            <li>Data Visualization</li>
                        </ul>
                    </div>

                    <div class="project-challenges">
                        <h3>Challenges & Solutions</h3>
                        <p>Description of challenges faced during development and how they were overcome.</p>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <a href="#" class="modal-btn live-demo">
                    <i class="fas fa-external-link-alt"></i>
                    Live Demo
                </a>
                <a href="#" class="modal-btn source-code">
                    <i class="fab fa-github"></i>
                    Source Code
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(modalContainer);
    document.body.style.overflow = 'hidden';

    // Trigger animation
    requestAnimationFrame(() => {
        modalContainer.classList.add('active');
    });

    // Initialize smooth scroll for modal content
    const scrollContainer = modalContainer.querySelector('.modal-scroll-container');
    
    // Add smooth scroll behavior
    scrollContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const scrollSpeed = 1;
        scrollContainer.scrollTop += e.deltaY * scrollSpeed;
    }, { passive: false });

    // Close modal functionality
    const closeModal = () => {
        modalContainer.classList.remove('active');
        setTimeout(() => {
            modalContainer.remove();
            document.body.style.overflow = '';
        }, 400);
    };

    modalContainer.querySelector('.modal-close').addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Add click event listeners to View Details buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.project-card');
            const title = projectCard.querySelector('h3').textContent;
            const description = projectCard.querySelector('p').textContent;
            const image = projectCard.querySelector('.project-image img').src;
            
            showProjectModal(title, description, image);
        });
    });
});

// Form validation with enhanced features
function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    const form = event.target;
    
    // Reset previous error states
    form.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
    });
    form.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    // Validate name
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
        showError(name, 'name-error', 'Name is required');
        isValid = false;
    }

    // Validate email
    const email = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'email-error', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'email-error', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    const subject = form.querySelector('#subject');
    if (!subject.value.trim()) {
        showError(subject, 'subject-error', 'Subject is required');
        isValid = false;
    }

    // Validate message
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
        showError(message, 'message-error', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'message-error', 'Message must be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            showSuccessMessage(form);
            form.reset();
        }, 1500);
    }

    return false;
}

// Helper function to show error messages
function showError(input, errorId, message) {
    input.classList.add('error');
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Helper function to show success message
function showSuccessMessage(form) {
    // Remove any existing success message
    const existingSuccess = form.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    // Create and show new success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully!';
    form.appendChild(successMessage);
    successMessage.style.display = 'block';

    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput(this);
                }
            });
        });
    }
});

// Helper function for real-time validation
function validateInput(input) {
    const id = input.id;
    const value = input.value.trim();
    
    switch(id) {
        case 'name':
            if (!value) {
                showError(input, 'name-error', 'Name is required');
            } else {
                input.classList.remove('error');
                document.getElementById('name-error').style.display = 'none';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showError(input, 'email-error', 'Email is required');
            } else if (!emailRegex.test(value)) {
                showError(input, 'email-error', 'Please enter a valid email address');
            } else {
                input.classList.remove('error');
                document.getElementById('email-error').style.display = 'none';
            }
            break;
            
        case 'subject':
            if (!value) {
                showError(input, 'subject-error', 'Subject is required');
            } else {
                input.classList.remove('error');
                document.getElementById('subject-error').style.display = 'none';
            }
            break;
            
        case 'message':
            if (!value) {
                showError(input, 'message-error', 'Message is required');
            } else if (value.length < 10) {
                showError(input, 'message-error', 'Message must be at least 10 characters long');
            } else {
                input.classList.remove('error');
                document.getElementById('message-error').style.display = 'none';
            }
            break;
    }
}

// Typewriter Effect
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    
    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => {
            this.tick();
        }, delta);
    }
}

// Initialize Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
});

// Project Filtering with Animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('appear');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        projectObserver.observe(card);
    });

    // Filter animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            if (currentFilter === filter) return;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = filter;

            // Animate filtering
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Add hover effect for project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// Add this CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Back to Top Button
function handleBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Image Loading Animation
function handleImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

// Resume Download Tracking
function trackResumeDownload() {
    const resumeBtn = document.querySelector('a[href$="resume.pdf"]');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            // You can add analytics tracking here
            console.log('Resume downloaded');
        });
    }
}

// Initialize All Functions
document.addEventListener('DOMContentLoaded', function() {
    // Add Back to Top button to DOM
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    // Initialize all functions
    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('scroll', handleBackToTop);
    updateActiveNavLink();
    handleImageLoading();
    trackResumeDownload();
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
        observer.observe(element);
    });
});

// Form input animation
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('input-focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('input-focused');
        }
    });
});

// Submit button ripple effect
document.querySelector('.submit-btn').addEventListener('click', function(e) {
    const button = this;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}); 