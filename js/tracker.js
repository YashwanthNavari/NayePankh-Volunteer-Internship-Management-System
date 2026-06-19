/**
 * Application Status Tracker — NayePankh Foundation
 * Looks up internship applications from localStorage and renders a live status stepper.
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('tracker-search-btn');
  const emailInput = document.getElementById('tracker-email');
  const resultCard = document.getElementById('tracker-result');
  const noResultCard = document.getElementById('tracker-no-result');
  const infoGrid = document.getElementById('tracker-info-grid');
  const stepperEl = document.getElementById('status-stepper');

  if (!searchBtn) return;

  // Status pipeline definition
  const STATUS_PIPELINE = [
    {
      key: 'submitted',
      icon: 'fa-paper-plane',
      title: 'Application Submitted',
      desc: 'Your application has been received and logged in our system.'
    },
    {
      key: 'review',
      icon: 'fa-magnifying-glass',
      title: 'Under Review',
      desc: 'Our team is reviewing your application and shortlisting candidates.'
    },
    {
      key: 'interview',
      icon: 'fa-video',
      title: 'Interview Scheduled',
      desc: 'You will be contacted via email with interview details.'
    },
    {
      key: 'selected',
      icon: 'fa-trophy',
      title: 'Selected & Onboarded',
      desc: 'Congratulations! Welcome aboard the NayePankh Foundation team.'
    }
  ];

  /**
   * Simulate application progress based on submission age.
   * Applications submitted > 5 days ago → review
   * > 10 days ago → interview
   * > 15 days ago → selected
   */
  function simulateStatus(app) {
    // If status was explicitly set, use it
    if (app.status && app.status !== 'submitted') return app.status;

    const submittedDate = new Date(parseInt(app.id.replace('INT-', '')));
    const ageMs = Date.now() - submittedDate.getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);

    if (ageDays > 15) return 'selected';
    if (ageDays > 10) return 'interview';
    if (ageDays > 5) return 'review';
    return 'submitted';
  }

  function getCurrentStepIndex(status) {
    const map = { submitted: 0, review: 1, interview: 2, selected: 3 };
    return map[status] ?? 0;
  }

  function renderResult(app) {
    const status = simulateStatus(app);
    const currentIdx = getCurrentStepIndex(status);

    // Info grid
    infoGrid.innerHTML = `
      <div class="tracker-info-item">
        <div class="label">Name</div>
        <div class="value">${app.name}</div>
      </div>
      <div class="tracker-info-item">
        <div class="label">Applied Role</div>
        <div class="value" style="color:var(--primary);">${app.role}</div>
      </div>
      <div class="tracker-info-item">
        <div class="label">Application ID</div>
        <div class="value" style="font-size:0.8rem;font-family:monospace;">${app.id}</div>
      </div>
    `;

    // Build stepper
    stepperEl.innerHTML = '';
    STATUS_PIPELINE.forEach((step, idx) => {
      let state = 'pending';
      if (idx < currentIdx) state = 'done';
      if (idx === currentIdx) state = 'current';

      const badgeText = state === 'done' ? 'Completed' : state === 'current' ? 'In Progress' : 'Pending';
      const iconHtml = state === 'done'
        ? '<i class="fa-solid fa-check"></i>'
        : `<i class="fa-solid ${step.icon}"></i>`;

      const stepEl = document.createElement('div');
      stepEl.className = `status-step ${state}`;
      stepEl.innerHTML = `
        <div class="status-step-icon">${iconHtml}</div>
        <div class="status-step-content">
          <h4>${step.title}</h4>
          <p>${step.desc}</p>
          <span class="status-badge ${state}">${badgeText}</span>
        </div>
      `;
      stepperEl.appendChild(stepEl);
    });

    // Show/hide cards
    noResultCard.classList.remove('active');
    resultCard.classList.add('active');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function handleSearch() {
    const email = emailInput.value.trim().toLowerCase();
    if (!email) {
      window.showToast('Please enter your email address.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.showToast('Please enter a valid email address.', 'error');
      return;
    }

    const applications = JSON.parse(localStorage.getItem('internshipApplications') || '[]');
    const found = applications.find(app => app.email.toLowerCase() === email);

    resultCard.classList.remove('active');
    noResultCard.classList.remove('active');

    if (found) {
      renderResult(found);
    } else {
      noResultCard.classList.add('active');
      noResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  searchBtn.addEventListener('click', handleSearch);
  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Demo mode: if no applications, show demo for any email search
  // (so the feature still looks impressive in a fresh browser)
});
