/**
 * Darkmode script for NayePankh Volunteer Management System
 * Handles reading/writing user preference to localStorage and toggling CSS variables.
 */

// Immediately apply theme to prevent Flash of Unstyled Content (FOUC)
(function() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (savedTheme !== 'light' && prefersDark);
  if (isDark) {
    document.documentElement.classList.add('dark-mode');
    document.body?.classList.add('dark-mode'); // Also apply to body if available
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('theme-toggle-icon');
  const toggleText = document.getElementById('theme-toggle-text');

  // Sync body class in case it was missed during immediate execution
  if (document.documentElement.classList.contains('dark-mode')) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }

  function updateToggleUI(isDark) {
    if (toggleIcon) toggleIcon.textContent = isDark ? '☀️' : '🌙';
    if (toggleText) toggleText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }

  // Initial UI sync
  const isDark = body.classList.contains('dark-mode');
  updateToggleUI(isDark);

  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    updateToggleUI(isDark);
    
    // Dispatch a custom event to notify charts or other elements that theme has changed
    const event = new CustomEvent('themeChanged', { detail: { isDark } });
    document.dispatchEvent(event);
  }

  // Add click listener
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyDark = body.classList.contains('dark-mode');
      setTheme(!isCurrentlyDark);
    });
  }
});
