// ==========================================================================
// INITIALIZATION & PERFORMANCE OPTIMIZATION
// ==========================================================================

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Performance optimization - avoid layout thrashing
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializePortfolio();
});

function initializePortfolio() {
  initNavigation();
  initMobileMenu();
  initBackToTop();
  loadProjects();
  initContactForm();
  initAccessibility();
  initPerformanceMonitoring();
}

// ==========================================================================
// LOADING ANIMATION & PAGE INITIALIZATION
// ==========================================================================

window.addEventListener('load', function() {
  // Hide loading overlay with animation
  gsap.to('#loadingOverlay', {
    duration: 0.8,
    opacity: 0,
    ease: 'power2.out',
    onComplete: function() {
      document.getElementById('loadingOverlay').style.display = 'none';
      initAnimations();
      initSkillBars();
      showNavbar();
    }
  });
});

function showNavbar() {
  setTimeout(() => {
    document.getElementById('navbar').classList.add('visible');
  }, 500);
}

// ==========================================================================
// NAVIGATION FUNCTIONALITY
// ==========================================================================

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to target
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
  
  // Update active nav link on scroll
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -80px 0px'
  };
  
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => navObserver.observe(section));
}

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }
}

function toggleMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const toggleIcon = document.querySelector('.mobile-menu-toggle i');
  
  navMenu.classList.toggle('active');
  
  // Animate hamburger icon
  if (navMenu.classList.contains('active')) {
    toggleIcon.classList.replace('fa-bars', 'fa-times');
    gsap.to(toggleIcon, { rotation: 180, duration: 0.3 });
  } else {
    toggleIcon.classList.replace('fa-times', 'fa-bars');
    gsap.to(toggleIcon, { rotation: 0, duration: 0.3 });
  }
}

function closeMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const toggleIcon = document.querySelector('.mobile-menu-toggle i');
  
  if (navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    toggleIcon.classList.replace('fa-times', 'fa-bars');
    gsap.to(toggleIcon, { rotation: 0, duration: 0.3 });
  }
}

// ==========================================================================
// BACK TO TOP FUNCTIONALITY
// ==========================================================================

function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide based on scroll position
    const toggleBackToTop = debounce(() => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, 100);
    
    window.addEventListener('scroll', toggleBackToTop);
  }
}

// ==========================================================================
// GSAP ANIMATIONS
// ==========================================================================

function initAnimations() {
  // Hero section animations
  const heroTimeline = gsap.timeline();
  
  heroTimeline
    .to('.hero-content', {
      duration: 1,
      opacity: 1,
      x: 0,
      ease: 'back.out(1.7)'
    })
    .from('.hero-stats .stat', {
      duration: 0.6,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.5');
  
  // Services section animation
  gsap.to('.services', {
    scrollTrigger: {
      trigger: '.services',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
  });
  
  // Service items stagger animation
  gsap.fromTo('.service-item',
    {
      opacity: 0,
      scale: 0.8,
      y: 30
    },
    {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
      },
      duration: 0.6,
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }
  );
  
  // Skills section animation
  gsap.to('.skills', {
    scrollTrigger: {
      trigger: '.skills',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
  });
  
  // Skill categories animation
  gsap.fromTo('.skill-category',
    {
      opacity: 0,
      x: -50
    },
    {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
      },
      duration: 0.8,
      opacity: 1,
      x: 0,
      stagger: 0.2,
      ease: 'power2.out'
    }
  );
  
  // Projects section animation
  gsap.to('.projects', {
    scrollTrigger: {
      trigger: '.projects',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
  });
  
  // Contact section animation
  gsap.to('.contact', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
  });
  
  // Social links animation - fixed timing
  gsap.set('.social-links', { opacity: 1, y: 0 });
  gsap.fromTo('.social-link',
    {
      opacity: 0,
      scale: 0,
      rotation: -180
    },
    {
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 60%',
      },
      duration: 0.6,
      opacity: 1,
      scale: 1,
      rotation: 0,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }
  );
}

// ==========================================================================
// SKILL BARS ANIMATION
// ==========================================================================

function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.dataset.width;
        
        gsap.to(progressBar, {
          width: targetWidth,
          duration: 1.5,
          ease: 'power2.out',
          delay: Math.random() * 0.3 // Small random delay for stagger effect
        });
        
        skillObserver.unobserve(progressBar);
      }
    });
  }, { threshold: 0.3 });
  
  skillBars.forEach(bar => skillObserver.observe(bar));
}

// ==========================================================================
// PROJECT LOADING FUNCTIONS
// ==========================================================================

async function loadProjects() {
  try {
    // Fetch projects from the JSON file
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Failed to load projects.json');
    const projects = await response.json();

    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
      const projectCard = createProjectCard(project);
      projectsGrid.appendChild(projectCard);

      // Animate cards with stagger
      gsap.set(projectCard, { opacity: 0, y: 30, scale: 0.9 });
      gsap.to(projectCard, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: projectCard,
          start: 'top 85%',
          once: true
        }
      });
    });

    // Refresh ScrollTrigger after content is loaded
    ScrollTrigger.refresh();

  } catch (error) {
    console.error('Error loading projects:', error);
    showProjectsError();
  }
}


function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View project: ${project.title}`);
  
  // Add click and keyboard handlers
  const handleProjectOpen = () => {
    if (project.projecturl && project.projecturl !== '#') {
      // Add click animation
      gsap.to(card, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          window.open(project.projecturl, '_blank', 'noopener,noreferrer');
        }
      });
    } else {
      showNotification('Project link coming soon!', 'info');
    }
  };
  
  card.addEventListener('click', handleProjectOpen);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProjectOpen();
    }
  });
  
  // Create tools HTML
  const toolsHTML = project.tools.map(tool => 
    `<span class="tool-tag"><i class="fas fa-tag" aria-hidden="true"></i>${tool}</span>`
  ).join('');
  
  card.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.title} project screenshot" loading="lazy">
    </div>
    <div class="project-info">
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <div class="project-tools" aria-label="Technologies used">
        ${toolsHTML}
      </div>
    </div>
  `;
  
  return card;
}

function showProjectsError() {
  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = `
    <div class="loading-projects">
      <i class="fas fa-exclamation-triangle" style="color: #ef4444;" aria-hidden="true"></i>
      <p>Error loading projects. Please try again later.</p>
      <button class="btn-primary" onclick="loadProjects()" style="margin-top: 1rem;">
        <i class="fas fa-refresh" aria-hidden="true"></i>
        Retry
      </button>
    </div>
  `;
}

// ==========================================================================
// CONTACT FORM FUNCTIONALITY
// ==========================================================================

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', handleContactSubmit);

  // Real-time validation
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', validateField);
    field.addEventListener('blur', validateField);
  });
}

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonContent = submitButton.innerHTML;

  // Validate form
  if (!validateForm(form)) return;

  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Use Formspree AJAX submission
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showNotification('Thank you! Your message has been sent.', 'success');
      form.reset();
    } else {
      showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    }
  } catch (error) {
    showNotification('Network error. Please try again later.', 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonContent;
  }
}

function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!validateField({ target: field })) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Remove existing error styling
  field.classList.remove('error');
  removeFieldError(field);
  
  // Required field validation
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required.';
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }
  }
  
  // Show error if validation failed
  if (!isValid) {
    showFieldError(field, errorMessage);
  }
  
  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  let errorElement = field.parentNode.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    `;
    field.parentNode.appendChild(errorElement);
  }
  
  errorElement.innerHTML = `<i class="fas fa-exclamation-circle" aria-hidden="true"></i>${message}`;
  
  // Add error styling to field
  field.style.borderColor = '#ef4444';
  field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
}

function removeFieldError(field) {
  const errorElement = field.parentNode.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
  
  // Reset field styling
  field.style.borderColor = '';
  field.style.boxShadow = '';
}

function clearFieldError(e) {
  const field = e.target;
  if (field.classList.contains('error') && field.value.trim()) {
    field.classList.remove('error');
    removeFieldError(field);
  }
}

// ==========================================================================
// NOTIFICATION SYSTEM
// ==========================================================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle'
  };
  
  const colors = {
    success: 'linear-gradient(135deg, #10b981, #059669)',
    error: 'linear-gradient(135deg, #ef4444, #dc2626)',
    info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
  };
  
  notification.innerHTML = `<i class="${icons[type]}" aria-hidden="true"></i> ${message}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 10000;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    transform: translateX(400px);
    opacity: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 350px;
    pointer-events: auto;
    cursor: pointer;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  gsap.fromTo(notification,
    { x: 400, opacity: 0, scale: 0.8 },
    { 
      duration: 0.5, 
      x: 0, 
      opacity: 1, 
      scale: 1, 
      ease: 'back.out(1.7)' 
    }
  );
  
  // Auto-dismiss
  const dismissTimeout = setTimeout(() => {
    dismissNotification(notification);
  }, type === 'error' ? 5000 : 3000);
  
  // Manual dismiss on click
  notification.addEventListener('click', () => {
    clearTimeout(dismissTimeout);
    dismissNotification(notification);
  });
}

function dismissNotification(notification) {
  gsap.to(notification, {
    duration: 0.4,
    x: 400,
    opacity: 0,
    scale: 0.8,
    ease: 'power2.in',
    onComplete: () => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }
  });
}

// ==========================================================================
// CV DOWNLOAD FUNCTION
// ==========================================================================

function downloadCV() {
  // Create download notification
  showNotification('CV download started! Check your downloads folder.', 'success');
  
  // Animate button
  const downloadBtn = event.target.closest('.btn-primary');
  gsap.to(downloadBtn, {
    duration: 0.3,
    scale: 1.05,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1
  });
  
  // Create a temporary link for download
  // Replace with actual CV file path
  const link = document.createElement('a');
  link.href = 'assets/resume/umer-irshad-wordpress-developer-3years-exp.pdf'; // Update this path
  link.download = 'Umer-Irshad-WordPress-Developer-CV.pdf';
  link.style.display = 'none';
  document.body.appendChild(link);
  
  // Trigger download
  try {
    link.click();
  } catch (error) {
    console.error('Download failed:', error);
    showNotification('Download failed. Please contact me directly for my CV.', 'error');
  } finally {
    document.body.removeChild(link);
  }
}

// ==========================================================================
// SCROLL TO CONTACT FUNCTION
// ==========================================================================

function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    const contactNavLink = document.querySelector('.nav-link[href="#contact"]');
    if (contactNavLink) {
      contactNavLink.classList.add('active');
    }
    
    // Focus first form field for accessibility
    setTimeout(() => {
      const firstInput = contactSection.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }, 800);
  }
}

// ==========================================================================
// ROTATING ICONS FUNCTIONALITY (Enhanced)
// ==========================================================================

let currentSpeed = 1;
let isReversed = false;
const rotatingCircle = document.getElementById('rotatingCircle');

function changeSpeed(speed) {
  currentSpeed = speed;
  updateAnimation();
}

function toggleDirection() {
  isReversed = !isReversed;
  updateAnimation();
}

function updateAnimation() {
  const duration = 20 / currentSpeed;
  const direction = isReversed ? 'reverse' : 'normal';
  
  if (rotatingCircle) {
    rotatingCircle.style.animationDuration = duration + 's';
    rotatingCircle.style.animationDirection = direction;
    
    // Update counter-rotation for icons
    const icons = rotatingCircle.querySelectorAll('.icon');
    icons.forEach(icon => {
      icon.style.animationDuration = duration + 's';
      icon.style.animationDirection = direction;
    });
  }
}

// ==========================================================================
// INTERACTIVE EFFECTS & ENHANCEMENTS
// ==========================================================================

function initInteractiveEffects() {
  // Enhanced icon hover effects
  const icons = document.querySelectorAll('.icon');
  icons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.3,
        duration: 0.3,
        ease: 'back.out(1.7)',
        zIndex: 20
      });
      
      // Add tooltip
      showTooltip(this, this.getAttribute('title'));
    });
    
    icon.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        zIndex: 'auto'
      });
      
      // Remove tooltip
      hideTooltip();
    });
    
    // Add click effect
    icon.addEventListener('click', function() {
      gsap.to(this, {
        rotation: '+=360',
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  });
  
  // Enhanced center logo interaction
  const centerLogo = document.querySelector('.center-logo');
  if (centerLogo) {
    centerLogo.addEventListener('click', function() {
      gsap.to(this, {
        rotation: '+=360',
        scale: 1.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
        onComplete: () => {
          gsap.set(this, { rotation: 0 });
        }
      });
      
      // Trigger icon animation
      icons.forEach((icon, index) => {
        gsap.to(icon, {
          scale: 1.5,
          duration: 0.3,
          delay: index * 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
      });
    });
  }
}

// ==========================================================================
// TOOLTIP SYSTEM
// ==========================================================================

let tooltipElement = null;

function showTooltip(element, text) {
  if (!text) return;
  
  hideTooltip();
  
  tooltipElement = document.createElement('div');
  tooltipElement.className = 'tooltip';
  tooltipElement.textContent = text;
  tooltipElement.style.cssText = `
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    pointer-events: none;
    z-index: 10000;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(tooltipElement);
  
  // Position tooltip
  const rect = element.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();
  
  tooltipElement.style.left = (rect.left + rect.width / 2 - tooltipRect.width / 2) + 'px';
  tooltipElement.style.top = (rect.top - tooltipRect.height - 10) + 'px';
  
  // Show tooltip
  setTimeout(() => {
    tooltipElement.style.opacity = '1';
    tooltipElement.style.transform = 'translateY(0)';
  }, 10);
}

function hideTooltip() {
  if (tooltipElement) {
    tooltipElement.style.opacity = '0';
    tooltipElement.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (tooltipElement && tooltipElement.parentNode) {
        document.body.removeChild(tooltipElement);
      }
      tooltipElement = null;
    }, 300);
  }
}

// ==========================================================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================================================

function initAccessibility() {
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#home';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('home').focus();
  });
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Enhanced keyboard navigation
  document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
      closeMobileMenu();
      hideTooltip();
    }
    
    // Arrow keys for icon control
    if (document.activeElement && document.activeElement.classList.contains('icon')) {
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          changeSpeed(0.5);
          showNotification('Rotation slowed down', 'info');
          break;
        case 'ArrowRight':
          e.preventDefault();
          changeSpeed(2);
          showNotification('Rotation sped up', 'info');
          break;
        case ' ':
          e.preventDefault();
          toggleDirection();
          showNotification('Direction reversed', 'info');
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          changeSpeed(1);
          showNotification('Speed reset to normal', 'info');
          break;
      }
    }
  });
  
  // Announce page sections for screen readers
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const heading = section.querySelector('h1, h2, h3');
    if (heading && !section.getAttribute('aria-label')) {
      section.setAttribute('aria-label', heading.textContent);
    }
  });
  
  // Add focus indicators for better visibility
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.classList.add('focused');
    });
    
    element.addEventListener('blur', function() {
      this.classList.remove('focused');
    });
  });
}

// ==========================================================================
// PERFORMANCE MONITORING & OPTIMIZATION
// ==========================================================================

function initPerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ('web-vital' in window) {
    // This would require the web-vitals library
    // For now, we'll use basic performance monitoring
  }
  
  // Monitor scroll performance
  let ticking = false;
  
  function updateOnScroll() {
    // Update navbar background opacity based on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const scrolled = window.scrollY;
      const opacity = Math.min(scrolled / 100, 1);
      navbar.style.background = `rgba(255, 255, 255, ${0.95 + opacity * 0.05})`;
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });
  
  // Log performance metrics
  window.addEventListener('load', function() {
    setTimeout(function() {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
        
        console.group('🚀 Performance Metrics');
        console.log('Page Load Time:', loadTime + 'ms');
        console.log('DOM Content Loaded:', domContentLoaded + 'ms');
        console.log('First Paint:', perfData.responseStart - perfData.fetchStart + 'ms');
        console.groupEnd();
        
        // Show performance notification in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          if (loadTime > 3000) {
            console.warn('⚠️ Page load time is over 3 seconds. Consider optimization.');
          }
        }
      }
    }, 0);
  });
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

// Smooth scroll refresh on resize
window.addEventListener('resize', debounce(() => {
  ScrollTrigger.refresh();
  hideTooltip();
}, 250));

// Error handling
window.addEventListener('error', function(e) {
  console.error('Portfolio Error:', e.error);
  // You could send this to an error reporting service
});

// Initialize interactive effects after DOM load
document.addEventListener('DOMContentLoaded', function() {
  initInteractiveEffects();
});

// ==========================================================================
// LAZY LOADING FOR IMAGES
// ==========================================================================

function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ==========================================================================
// THEME MANAGEMENT (Bonus Feature)
// ==========================================================================

function initThemeToggle() {
  // This could be expanded to include light/dark mode toggle
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Listen for changes in color scheme preference
  prefersDarkScheme.addEventListener('change', (e) => {
    // Update theme accordingly
    console.log('Color scheme preference changed:', e.matches ? 'dark' : 'light');
  });
}

// ==========================================================================
// FINAL INITIALIZATION
// ==========================================================================

// Initialize everything when the page is fully loaded
window.addEventListener('load', function() {
  initLazyLoading();
  initThemeToggle();
  
  // Add a small delay to ensure smooth loading
  setTimeout(() => {
    // Refresh ScrollTrigger one final time
    ScrollTrigger.refresh();
    
    // Log successful initialization
    console.log('✅ Portfolio initialized successfully!');
  }, 100);
});