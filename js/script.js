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
      const expanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

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
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(element => animationObserver.observe(element));

  // =========================================================================
  // 3. Toast Notifications
  // =========================================================================
  window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'opacity 0.4s, transform 0.4s';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // =========================================================================
  // 4. Volunteer Form — Validation & LocalStorage
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

      if (!name || !email || !phone || !college || !skill || !interest) {
        window.showToast('Please fill out all required fields.', 'error'); return;
      }
      if (phone.length !== 10 || isNaN(phone)) {
        window.showToast('Please enter a valid 10-digit phone number.', 'error'); return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.showToast('Please enter a valid email address.', 'error'); return;
      }

      const currentVolunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
      currentVolunteers.push({
        id: 'VOL-' + Date.now(), name, email, phone, college, skill, interest, experience,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('volunteers', JSON.stringify(currentVolunteers));
      window.showToast('Volunteer registered successfully! Welcome to NayePankh.');
      volunteerForm.reset();
    });
  }

  // =========================================================================
  // 5. Internship Form — Multi-Step Navigation & LocalStorage
  // =========================================================================
  const internshipForm = document.getElementById('internship-form');
  if (internshipForm) {
    let currentStep = 1;
    const totalSteps = 3;

    function updateStepUI(step) {
      document.querySelectorAll('.step-item').forEach((item, idx) => {
        const stepNum = idx + 1;
        item.classList.remove('active', 'completed');
        if (stepNum < step) item.classList.add('completed');
        if (stepNum === step) item.classList.add('active');
        const circle = item.querySelector('.step-circle');
        if (circle) circle.innerHTML = stepNum < step ? '<i class="fa-solid fa-check"></i>' : stepNum;
      });
      document.querySelectorAll('.step-connector').forEach((conn, idx) => {
        conn.classList.toggle('done', idx + 1 < step);
      });
      document.querySelectorAll('.form-step').forEach((fs, idx) => {
        fs.classList.toggle('active', idx + 1 === step);
      });
      const prevBtn = document.getElementById('step-prev');
      const nextBtn = document.getElementById('step-next');
      const submitBtn = document.getElementById('step-submit');
      if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'block';
      if (nextBtn) nextBtn.style.display = step === totalSteps ? 'none' : 'block';
      if (submitBtn) submitBtn.style.display = step === totalSteps ? 'block' : 'none';
    }

    function populateConfirmSummary() {
      const summaryEl = document.getElementById('confirm-summary');
      if (!summaryEl) return;
      const name = document.getElementById('int-name').value.trim();
      const email = document.getElementById('int-email').value.trim();
      const phone = document.getElementById('int-phone').value.trim();
      const college = document.getElementById('int-college').value.trim();
      const role = document.getElementById('int-role').value || 'Not selected';
      summaryEl.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;font-size:0.9rem;">
          <div><span style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:2px;">Full Name</span><strong>${name}</strong></div>
          <div><span style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:2px;">Email</span><strong>${email}</strong></div>
          <div><span style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:2px;">Phone</span><strong>${phone}</strong></div>
          <div><span style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:2px;">College</span><strong>${college}</strong></div>
          <div style="grid-column:1/-1;"><span style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:2px;">Applied Role</span><strong style="color:var(--primary);font-size:1rem;">${role}</strong></div>
        </div>
      `;
    }

    const nextBtn = document.getElementById('step-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (currentStep === 1) {
          const name = document.getElementById('int-name').value.trim();
          const email = document.getElementById('int-email').value.trim();
          if (!name || name.length < 3) { window.showToast('Enter your full name (min 3 chars).', 'error'); return; }
          if (!email || !emailRegex.test(email)) { window.showToast('Enter a valid email address.', 'error'); return; }
        }
        if (currentStep === 2) {
          const phone = document.getElementById('int-phone').value.trim();
          const college = document.getElementById('int-college').value.trim();
          const role = document.getElementById('int-role').value;
          if (!phone || phone.length !== 10 || isNaN(phone)) { window.showToast('Enter a valid 10-digit phone number.', 'error'); return; }
          if (!college) { window.showToast('Enter your college/university name.', 'error'); return; }
          if (!role) { window.showToast('Please select a role by clicking a role card above.', 'error'); return; }
        }
        if (currentStep < totalSteps) {
          currentStep++;
          updateStepUI(currentStep);
          if (currentStep === 3) populateConfirmSummary();
        }
      });
    }

    const prevBtn = document.getElementById('step-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) { currentStep--; updateStepUI(currentStep); }
      });
    }

    internshipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('int-name').value.trim();
      const email = document.getElementById('int-email').value.trim();
      const phone = document.getElementById('int-phone').value.trim();
      const college = document.getElementById('int-college').value.trim();
      const role = document.getElementById('int-role').value;

      if (!name || !email || !phone || !college || !role) {
        window.showToast('Please fill out all required fields.', 'error'); return;
      }

      const currentApplications = JSON.parse(localStorage.getItem('internshipApplications') || '[]');
      const newApplication = {
        id: 'INT-' + Date.now(), name, email, phone, college, role,
        date: new Date().toLocaleDateString(), status: 'submitted'
      };
      currentApplications.push(newApplication);
      localStorage.setItem('internshipApplications', JSON.stringify(currentApplications));

      window.showToast('Application submitted! Track your status on the Tracker page.');
      internshipForm.reset();
      document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
      currentStep = 1;
      updateStepUI(currentStep);
    });

    updateStepUI(currentStep);
  }

  // =========================================================================
  // 6. Contact Form
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('con-name').value.trim();
      const email = document.getElementById('con-email').value.trim();
      const message = document.getElementById('con-message').value.trim();
      if (!name || !email || !message) { window.showToast('Please complete all form fields.', 'error'); return; }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) { window.showToast('Please enter a valid email address.', 'error'); return; }
      window.showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

  // =========================================================================
  // FEATURE 1: Animated Count-Up Stats
  // =========================================================================
  function animateCounter(el, duration = 1800) {
    const rawText = el.getAttribute('data-target') || el.textContent;
    const suffix = rawText.replace(/[\d,]/g, '');
    const numTarget = parseInt(rawText.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numTarget)) return;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * numTarget).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterElements = document.querySelectorAll('[data-counter]');
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counterElements.forEach(el => counterObserver.observe(el));
  }

  // =========================================================================
  // FEATURE 2: Role Card Picker (Internship page)
  // =========================================================================
  document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      const roleValue = card.getAttribute('data-role');
      const roleSelect = document.getElementById('int-role');
      document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      if (roleSelect) roleSelect.value = roleValue;
    });
  });

  // =========================================================================
  // FEATURE 6: FAQ Accordion
  // =========================================================================
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

});
