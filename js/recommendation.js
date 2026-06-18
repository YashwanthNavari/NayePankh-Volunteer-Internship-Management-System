/**
 * Recommendation script for NayePankh Volunteer Management System
 * Maps user inputs (Skills & Interests) to a specific team.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recommendation-form');
  const resultContainer = document.getElementById('recommendation-result');
  const teamNameEl = document.getElementById('rec-team-name');
  const teamDescEl = document.getElementById('rec-team-description');
  const teamProjEl = document.getElementById('rec-team-project');

  if (!form || !resultContainer) return;

  // Comprehensive 5x4 mapping (20 combinations)
  const recommendationsMap = {
    // ----------------------------------------------------
    // Skills: Python
    // ----------------------------------------------------
    'Python_Education': {
      team: 'Tech Education Team',
      desc: 'You will help design basic coding curricula and teach Python fundamentals to kids in adopted government schools.',
      project: 'Python Basics for Kids'
    },
    'Python_Technology': {
      team: 'Backend Engineering Team',
      desc: 'You will build and maintain server infrastructure, APIs, and administrative automation tools for NayePankh operations.',
      project: 'Volunteer Portal Upgrades'
    },
    'Python_Marketing': {
      team: 'Data Analytics Outreach Team',
      desc: 'Analyze social media engagement and donor stats to help optimize campaign target areas using data insights.',
      project: 'Target Area Performance Models'
    },
    'Python_Environment': {
      team: 'Environmental Analytics Team',
      desc: 'Use Python libraries to map and visualize urban trash accumulation patterns and tree cover datasets.',
      project: 'Local Green Space Mapping'
    },

    // ----------------------------------------------------
    // Skills: Web Development
    // ----------------------------------------------------
    'Web Development_Education': {
      team: 'EdTech Portal Team',
      desc: 'Help construct and maintain online educational modules, quizzes, and learning trackers for students.',
      project: 'Interactive Learning Platform'
    },
    'Web Development_Technology': {
      team: 'Frontend Platform Team',
      desc: 'Revamp current web portals with responsive design systems, dark modes, and modular interfaces.',
      project: 'Web Portal Interface Revamp'
    },
    'Web Development_Marketing': {
      team: 'Campaign Microsites Team',
      desc: 'Develop fast, search-engine-optimized landing pages and event forms to maximize campaign registration rates.',
      project: 'Fundraiser Drive Microsites'
    },
    'Web Development_Environment': {
      team: 'Eco-Tracker Team',
      desc: 'Build web visualizers to display neighborhood trash cleanups, tree counts, and recycle statistics.',
      project: 'Cleanliness Metrics Portal'
    },

    // ----------------------------------------------------
    // Skills: Teaching
    // ----------------------------------------------------
    'Teaching_Education': {
      team: 'Remedial Education Team',
      desc: 'Focus on providing academic support, teaching primary school subjects, and coaching students on weekends.',
      project: 'Weekend Academic Support Camps'
    },
    'Teaching_Technology': {
      team: 'Digital Literacy Instructors',
      desc: 'Conduct physical workshops teaching basic operating system usage, word processing, and internet searches.',
      project: 'Digital Literacy Campaign'
    },
    'Teaching_Marketing': {
      team: 'Outreach Mentors',
      desc: 'Train new volunteers, organize orientation camps, and deliver talks at colleges to recruit new change-makers.',
      project: 'College Ambassador Orientation'
    },
    'Teaching_Environment': {
      team: 'Eco-Education Instructors',
      desc: 'Run recycling workshops and nature study sessions at school camps to build early sustainability awareness.',
      project: 'School Recycling Workshops'
    },

    // ----------------------------------------------------
    // Skills: Design
    // ----------------------------------------------------
    'Design_Education': {
      team: 'Creative Curriculum Creators',
      desc: 'Illustrate textbook materials, design printable activity sheets, and compile graphical study decks.',
      project: 'Visual Reading Activity Sheets'
    },
    'Design_Technology': {
      team: 'UI UX Design Unit',
      desc: 'Create vector wireframes, user flow diagrams, and UI assets for the developer teams to build portals.',
      project: 'Volunteer System Dashboard Redesign'
    },
    'Design_Marketing': {
      team: 'Social Graphics & Branding Team',
      desc: 'Craft banner packages, brochures, posters, and reels to build brand consistency on Instagram and LinkedIn.',
      project: 'Annual Donation Drive Campaign'
    },
    'Design_Environment': {
      team: 'Eco-Branding Creators',
      desc: 'Design physical flyers, trash bin stickers, and environmental infographic boards for local parks.',
      project: 'Park Cleaning Signage Campaign'
    },

    // ----------------------------------------------------
    // Skills: Communication
    // ----------------------------------------------------
    'Communication_Education': {
      team: 'Parent-Teacher Outreach Team',
      desc: 'Liaison with school administrations, build volunteer schedules, and consult parents on child progress.',
      project: 'Parent-Teacher Consultations 2026'
    },
    'Communication_Technology': {
      team: 'Tech Helpdesk & Docs Team',
      desc: 'Write easy-to-follow guide docs and record instructional tutorials explaining how to use our applications.',
      project: 'Student Portal Knowledge Base'
    },
    'Communication_Marketing': {
      team: 'PR & Corporate Relations Team',
      desc: 'Draft newsletters, coordinate corporate CSR meetings, and compose announcements for media publication.',
      project: 'Monthly Newsletter & CSR Proposal'
    },
    'Communication_Environment': {
      team: 'Community Environmental Advocates',
      desc: 'Organize public meetings and recruit shopkeepers to adopt plastic-free policies in local markets.',
      project: 'Plastic-Free Market Campaign'
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedSkill = document.getElementById('rec-skill').value;
    const selectedInterest = document.getElementById('rec-interest').value;

    if (!selectedSkill || !selectedInterest) {
      window.showToast('Please select both a skill and an interest.', 'error');
      return;
    }

    // Lookup key
    const mappingKey = `${selectedSkill}_${selectedInterest}`;
    const result = recommendationsMap[mappingKey];

    if (result) {
      // Hide container momentarily to trigger animations again
      resultContainer.classList.remove('active');
      
      // Update DOM
      setTimeout(() => {
        teamNameEl.textContent = result.team;
        teamDescEl.textContent = result.desc;
        teamProjEl.textContent = result.project;
        
        resultContainer.classList.add('active');
        
        // Scroll smoothly to output
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);

    } else {
      window.showToast('No matching team found for this selection.', 'error');
    }
  });
});
