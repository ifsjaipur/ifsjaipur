// Meta Tech - Interactive Features & Theme Management

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') {
    body.classList.add('light-mode');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      
      // Update icon
      if (sunIcon && moonIcon) {
        if (body.classList.contains('light-mode')) {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
          localStorage.setItem('theme', 'light');
        } else {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
          localStorage.setItem('theme', 'dark');
        }
      }
    });
  }
}

// Mobile Navigation Toggle
function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  // Close mobile menu when clicking outside
  if (mobileMenu) {
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

// Active Navigation Link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Smooth Scroll
function initSmoothScroll() {
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
}

// Intersection Observer for Fade-in Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll('.card, .section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// Dropdown Menu Enhancement
function initDropdownMenus() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-link');
    const content = dropdown.querySelector('.dropdown-content');
    
    if (trigger && content) {
      // Prevent default click on parent link if it has a dropdown
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
      });
    }
  });
}

// Form Validation (for contact page)
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      showNotification('Thank you! Your message has been sent.', 'success');
      contactForm.reset();
    });
  }
}

// Email validation helper
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    padding: 1rem 2rem;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--blur-md));
    border: 1px solid var(--glass-border);
    border-radius: 0.75rem;
    color: var(--text-primary);
    box-shadow: 0 8px 32px var(--glass-shadow);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
  
  if (type === 'success') {
    notification.style.borderLeft = '4px solid #10b981';
  } else if (type === 'error') {
    notification.style.borderLeft = '4px solid #ef4444';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize all features on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  setActiveNavLink();
  initSmoothScroll();
  initScrollAnimations();
  initDropdownMenus();
  initFormValidation();
});

// Parallax effect for hero sections
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-section');
  if (hero) {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    hero.style.transform = `translateY(${parallax}px)`;
  }
});
