/**
 * Dashboard script for NayePankh Volunteer Management System
 * Integrates Chart.js and aggregates stats from localStorage and mock records.
 * ENHANCED: Line chart (monthly trend) + Sortable/Searchable Applicants Table + CSV Export
 */

document.addEventListener('DOMContentLoaded', () => {

  const pieCanvas = document.getElementById('skillsPieChart');
  const barCanvas = document.getElementById('rolesBarChart');
  const lineCanvas = document.getElementById('trendLineChart');
  
  if (!pieCanvas || !barCanvas) return;

  // =========================================================================
  // 1. Data Aggregation
  // =========================================================================
  const BASE_VOLUNTEERS_COUNT = 1045;
  const BASE_APPLICATIONS_COUNT = 348;
  
  const localVolunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
  const localApplications = JSON.parse(localStorage.getItem('internshipApplications') || '[]');

  // Update stats cards (set text then trigger counter animation via script.js)
  const totalVolunteersEl = document.getElementById('stat-total-volunteers');
  const totalApplicationsEl = document.getElementById('stat-total-applications');

  if (totalVolunteersEl) {
    const total = BASE_VOLUNTEERS_COUNT + localVolunteers.length;
    totalVolunteersEl.setAttribute('data-target', total.toString());
    totalVolunteersEl.textContent = total.toLocaleString();
  }
  if (totalApplicationsEl) {
    const total = BASE_APPLICATIONS_COUNT + localApplications.length;
    totalApplicationsEl.setAttribute('data-target', total.toString());
    totalApplicationsEl.textContent = total.toLocaleString();
  }

  // Skill distribution
  const skillsData = { 'Teaching': 42, 'Web Development': 28, 'Python': 15, 'Design': 18, 'Communication': 22 };
  localVolunteers.forEach(vol => {
    if (vol.skill) skillsData[vol.skill] = (skillsData[vol.skill] || 0) + 1;
  });

  // Role distribution
  const rolesData = { 'Full Stack': 45, 'Front End': 62, 'Web Development': 88, 'Python': 35, 'Machine Learning': 24, 'UI UX': 40 };
  localApplications.forEach(app => {
    if (app.role) rolesData[app.role] = (rolesData[app.role] || 0) + 1;
  });

  // Monthly trend data (mock base + dynamic local additions)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const baseTrend = [18, 24, 32, 28, 45, 52, 38, 41, 60, 55, 48, 62];
  // Add local applications to the current month
  const currentMonth = new Date().getMonth();
  baseTrend[currentMonth] += localApplications.length;

  // =========================================================================
  // 2. Chart Theming
  // =========================================================================
  let skillsChartInstance = null;
  let rolesChartInstance = null;
  let trendChartInstance = null;

  const lightColors = {
    text: '#0f172a', grid: '#e2e8f0',
    pieBackgrounds: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
    barBackground: '#2563eb', barBorder: '#1e40af',
    lineColor: '#2563eb', lineFill: 'rgba(37,99,235,0.08)'
  };
  const darkColors = {
    text: '#f8fafc', grid: '#334155',
    pieBackgrounds: ['#3b82f6', '#34d399', '#fbbf24', '#a78bfa', '#f472b6'],
    barBackground: '#3b82f6', barBorder: '#60a5fa',
    lineColor: '#60a5fa', lineFill: 'rgba(96,165,250,0.1)'
  };

  function getThemeColors() {
    return document.body.classList.contains('dark-mode') ? darkColors : lightColors;
  }

  // =========================================================================
  // 3. Chart Rendering
  // =========================================================================
  function renderCharts() {
    const colors = getThemeColors();

    if (skillsChartInstance) skillsChartInstance.destroy();
    if (rolesChartInstance) rolesChartInstance.destroy();
    if (trendChartInstance) trendChartInstance.destroy();

    // Pie Chart
    skillsChartInstance = new Chart(pieCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(skillsData),
        datasets: [{
          data: Object.values(skillsData),
          backgroundColor: colors.pieBackgrounds,
          borderWidth: document.body.classList.contains('dark-mode') ? 2 : 1,
          borderColor: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: colors.text, font: { family: 'Poppins', size: 11 } } },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                return ` ${context.label}: ${context.raw} (${Math.round((context.raw / total) * 100)}%)`;
              }
            }
          }
        }
      }
    });

    // Bar Chart
    rolesChartInstance = new Chart(barCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: Object.keys(rolesData),
        datasets: [{
          label: 'Applications',
          data: Object.values(rolesData),
          backgroundColor: colors.barBackground,
          borderColor: colors.barBorder,
          borderRadius: 6, borderWidth: 1
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { titleFont: { family: 'Poppins' }, bodyFont: { family: 'Poppins' } } },
        scales: {
          x: { grid: { display: false }, ticks: { color: colors.text, font: { family: 'Poppins', size: 10 } } },
          y: { grid: { color: colors.grid }, ticks: { color: colors.text, font: { family: 'Poppins', size: 10 }, precision: 0 } }
        }
      }
    });

    // Line Chart — Monthly Trend
    if (lineCanvas) {
      trendChartInstance = new Chart(lineCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'Applications',
            data: baseTrend,
            borderColor: colors.lineColor,
            backgroundColor: colors.lineFill,
            borderWidth: 2.5,
            pointBackgroundColor: colors.lineColor,
            pointRadius: 4,
            pointHoverRadius: 7,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false, titleFont: { family: 'Poppins' }, bodyFont: { family: 'Poppins' } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: colors.text, font: { family: 'Poppins', size: 11 } } },
            y: {
              grid: { color: colors.grid },
              ticks: { color: colors.text, font: { family: 'Poppins', size: 11 }, precision: 0 },
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  renderCharts();

  document.addEventListener('themeChanged', () => renderCharts());

  // =========================================================================
  // 4. Applicants Table (Sortable + Searchable)
  // =========================================================================
  const tableBody = document.getElementById('applicants-table-body');
  const searchInput = document.getElementById('table-search');
  const exportBtn = document.getElementById('export-csv-btn');

  // Combine base mock + local
  const MOCK_APPLICATIONS = [
    { id: 'INT-1000001', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', college: 'IIT Delhi', role: 'Full Stack', date: '12/06/2026' },
    { id: 'INT-1000002', name: 'Priya Gupta', email: 'priya@example.com', phone: '9123456780', college: 'DTU', role: 'UI UX', date: '10/06/2026' },
    { id: 'INT-1000003', name: 'Arjun Mehta', email: 'arjun@example.com', phone: '9871234560', college: 'NSUT', role: 'Machine Learning', date: '08/06/2026' },
    { id: 'INT-1000004', name: 'Sneha Kapoor', email: 'sneha@example.com', phone: '9988776655', college: 'Amity University', role: 'Front End', date: '05/06/2026' },
    { id: 'INT-1000005', name: 'Vikram Singh', email: 'vikram@example.com', phone: '9765432109', college: 'GGSIPU', role: 'Python', date: '03/06/2026' },
  ];

  let allApplications = [...MOCK_APPLICATIONS, ...localApplications];
  let sortKey = 'date';
  let sortAsc = false;

  function renderTable(data) {
    if (!tableBody) return;
    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="table-empty"><i class="fa-solid fa-inbox"></i>No applications found.</td></tr>`;
      return;
    }
    tableBody.innerHTML = data.map(app => `
      <tr>
        <td style="font-size:0.78rem;font-family:monospace;color:var(--text-secondary);">${app.id}</td>
        <td style="font-weight:600;">${app.name}</td>
        <td><span class="table-role-badge">${app.role}</span></td>
        <td>${app.college}</td>
        <td>${app.date}</td>
      </tr>
    `).join('');
  }

  function filterAndSort() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    let filtered = allApplications.filter(app =>
      app.name.toLowerCase().includes(query) ||
      app.role.toLowerCase().includes(query) ||
      (app.college && app.college.toLowerCase().includes(query))
    );
    filtered.sort((a, b) => {
      const va = (a[sortKey] || '').toString().toLowerCase();
      const vb = (b[sortKey] || '').toString().toLowerCase();
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    renderTable(filtered);
  }

  // Column sort
  document.querySelectorAll('.data-table th[data-col]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.getAttribute('data-col');
      if (sortKey === col) sortAsc = !sortAsc;
      else { sortKey = col; sortAsc = true; }
      filterAndSort();
    });
  });

  if (searchInput) searchInput.addEventListener('input', filterAndSort);

  // CSV Export
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const headers = ['App ID', 'Name', 'Role', 'College', 'Date'];
      const rows = allApplications.map(app => [app.id, app.name, app.role, app.college || '', app.date]);
      const csvContent = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'NayePankh_Applications.csv';
      link.click();
      URL.revokeObjectURL(url);
      window.showToast('Applications exported as CSV!');
    });
  }

  filterAndSort();

});
