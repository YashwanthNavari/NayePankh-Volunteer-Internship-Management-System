/**
 * Dashboard script for NayePankh Volunteer Management System
 * Integrates Chart.js and aggregates stats from localStorage and mock records.
 */

document.addEventListener('DOMContentLoaded', () => {

  // Check if we are on the dashboard page
  const pieCanvas = document.getElementById('skillsPieChart');
  const barCanvas = document.getElementById('rolesBarChart');
  
  if (!pieCanvas || !barCanvas) return;

  // =========================================================================
  // 1. Data Aggregation & Database Initialization
  // =========================================================================
  
  // Base Mock Statistics
  const BASE_VOLUNTEERS_COUNT = 1045;
  const BASE_APPLICATIONS_COUNT = 348;
  
  // Retrieve submissions from localStorage
  const localVolunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
  const localApplications = JSON.parse(localStorage.getItem('internshipApplications') || '[]');

  // Update Total Statistics Cards in DOM
  const totalVolunteersEl = document.getElementById('stat-total-volunteers');
  const totalApplicationsEl = document.getElementById('stat-total-applications');

  if (totalVolunteersEl) {
    totalVolunteersEl.textContent = (BASE_VOLUNTEERS_COUNT + localVolunteers.length).toLocaleString();
  }
  if (totalApplicationsEl) {
    totalApplicationsEl.textContent = (BASE_APPLICATIONS_COUNT + localApplications.length).toLocaleString();
  }

  // -------------------------
  // Skill Aggregation for Pie Chart
  // -------------------------
  // Base distribution
  const skillsData = {
    'Teaching': 42,
    'Web Development': 28,
    'Python': 15,
    'Design': 18,
    'Communication': 22
  };

  // Add localStorage items
  localVolunteers.forEach(vol => {
    if (vol.skill && skillsData.hasOwnProperty(vol.skill)) {
      skillsData[vol.skill]++;
    } else if (vol.skill) {
      skillsData[vol.skill] = 1;
    }
  });

  // -------------------------
  // Role Aggregation for Bar Chart
  // -------------------------
  // Base distribution
  const rolesData = {
    'Full Stack': 45,
    'Front End': 62,
    'Web Development': 88,
    'Python': 35,
    'Machine Learning': 24,
    'UI UX': 40
  };

  // Add localStorage items
  localApplications.forEach(app => {
    if (app.role && rolesData.hasOwnProperty(app.role)) {
      rolesData[app.role]++;
    } else if (app.role) {
      rolesData[app.role] = 1;
    }
  });

  // =========================================================================
  // 2. Chart Styling & Theme Adaptive Configurations
  // =========================================================================

  let skillsChartInstance = null;
  let rolesChartInstance = null;

  // Chart styling colors
  const lightColors = {
    text: '#0f172a',
    grid: '#e2e8f0',
    pieBackgrounds: [
      '#2563eb', // primary blue
      '#10b981', // emerald green
      '#f59e0b', // amber yellow
      '#8b5cf6', // violet purple
      '#ec4899'  // pink
    ],
    barBackground: '#2563eb',
    barBorder: '#1e40af'
  };

  const darkColors = {
    text: '#f8fafc',
    grid: '#334155',
    pieBackgrounds: [
      '#3b82f6', // bright blue
      '#34d399', // bright emerald
      '#fbbf24', // bright amber
      '#a78bfa', // light purple
      '#f472b6'  // bright pink
    ],
    barBackground: '#3b82f6',
    barBorder: '#60a5fa'
  };

  /**
   * Helper to retrieve color tokens based on current dark-mode class
   */
  function getThemeColors() {
    const isDark = document.body.classList.contains('dark-mode');
    return isDark ? darkColors : lightColors;
  }

  /**
   * Main build/redraw function for the graphs
   */
  function renderCharts() {
    const colors = getThemeColors();

    // Destroy existing instances if any (so we can redraw safely on theme switch)
    if (skillsChartInstance) skillsChartInstance.destroy();
    if (rolesChartInstance) rolesChartInstance.destroy();

    // ----------------------------------------------------
    // Skills Pie Chart Configuration
    // ----------------------------------------------------
    const pieCtx = pieCanvas.getContext('2d');
    skillsChartInstance = new Chart(pieCtx, {
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: colors.text,
              font: {
                family: 'Poppins',
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const value = context.raw;
                const percentage = Math.round((value / total) * 100);
                return ` ${context.label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    // ----------------------------------------------------
    // Internship Roles Bar Chart Configuration
    // ----------------------------------------------------
    const barCtx = barCanvas.getContext('2d');
    rolesChartInstance = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(rolesData),
        datasets: [{
          label: 'Applications',
          data: Object.values(rolesData),
          backgroundColor: colors.barBackground,
          borderColor: colors.barBorder,
          borderRadius: 6,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Hide legend since it's a single series
          },
          tooltip: {
            titleFont: { family: 'Poppins' },
            bodyFont: { family: 'Poppins' }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: colors.text,
              font: {
                family: 'Poppins',
                size: 10
              }
            }
          },
          y: {
            grid: {
              color: colors.grid
            },
            ticks: {
              color: colors.text,
              font: {
                family: 'Poppins',
                size: 10
              },
              precision: 0
            }
          }
        }
      }
    });
  }

  // Initial draw
  renderCharts();

  // Listen to the custom themeChanged event dispatched by darkmode.js to update the graph styles dynamically
  document.addEventListener('themeChanged', () => {
    renderCharts();
  });
});
