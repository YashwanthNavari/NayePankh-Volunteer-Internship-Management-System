/**
 * Global JavaScript file for NayePankh Volunteer Management System
 * Controls mobile nav, scroll animation triggers, forms validation, and local storage operations.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. Mobile Menu Drawer Navigation Toggle
  // =========================================================================
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      
      // Accessibility states
      const expanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close mobile menu when clicking outside of it
    document.addEventListener('click', (event) => {
      const isClickInside = mobileToggle.contains(event.target) || navLinks.contains(event.target);
      if (!isClickInside && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 2. Intersection Observer for Scroll Animations (fade-in, slide-up)
  // =========================================================================
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
  
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });

  // =========================================================================
  // 3. Helper for Toast Notifications (Premium UX replacement for alerts)
  // =========================================================================
  window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    // Icon selection
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Smooth out animation
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'opacity 0.4s, transform 0.4s';
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3500);
  };

  // =========================================================================
  // 4. Form Validation & LocalStorage Hook (Volunteer Registration Page)
  // =========================================================================
  const volunteerForm = document.getElementById('volunteer-form');
  
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('vol-name').value.trim();
      const email = document.getElementById('vol-email').value.trim();
      const phone = document.getElementById('vol-phone').value.trim();
      const college = document.getElementById('vol-college').value.trim();
      const skill = document.getElementById('vol-skills').value;
      const interest = document.getElementById('vol-interests').value;
      const experience = document.getElementById('vol-experience').value.trim();

      // Simple Validation Checks
      if (!name || !email || !phone || !college || !skill || !interest) {
        window.showToast('Please fill out all required fields.', 'error');
        return;
      }

      if (phone.length !== 10 || isNaN(phone)) {
        window.showToast('Please enter a valid 10-digit phone number.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Read existing volunteers or empty array
      const currentVolunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
      
      // Append new registration
      const newVolunteer = {
        id: 'VOL-' + Date.now(),
        name,
        email,
        phone,
        college,
        skill,
        interest,
        experience,
        date: new Date().toLocaleDateString()
      };
      
      currentVolunteers.push(newVolunteer);
      localStorage.setItem('volunteers', JSON.stringify(currentVolunteers));
      
      // Success response
      window.showToast('Volunteer registered successfully! Welcome to NayePankh.');
      volunteerForm.reset();
    });
  }

  // =========================================================================
  // 5. Form Validation & LocalStorage Hook (Internship Application Page)
  // =========================================================================
  const internshipForm = document.getElementById('internship-form');
  
  if (internshipForm) {
    internshipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('int-name').value.trim();
      const email = document.getElementById('int-email').value.trim();
      const phone = document.getElementById('int-phone').value.trim();
      const college = document.getElementById('int-college').value.trim();
      const role = document.getElementById('int-role').value;

      // Validate Fields
      if (!name || !email || !phone || !college || !role) {
        window.showToast('Please fill out all required fields.', 'error');
        return;
      }

      if (phone.length !== 10 || isNaN(phone)) {
        window.showToast('Please enter a valid 10-digit phone number.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Read existing applications
      const currentApplications = JSON.parse(localStorage.getItem('internshipApplications') || '[]');
      
      // Append new applicant
      const newApplication = {
        id: 'INT-' + Date.now(),
        name,
        email,
        phone,
        college,
        role,
        date: new Date().toLocaleDateString()
      };
      
      currentApplications.push(newApplication);
      localStorage.setItem('internshipApplications', JSON.stringify(currentApplications));
      
      // Success feedback
      window.showToast('Internship application submitted successfully!');
      internshipForm.reset();
    });
  }

  // =========================================================================
  // 6. Contact Form Submission (Toast feedback only)
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('con-name').value.trim();
      const email = document.getElementById('con-email').value.trim();
      const message = document.getElementById('con-message').value.trim();

      if (!name || !email || !message) {
        window.showToast('Please complete all form fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Show toast and reset
      window.showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

});
