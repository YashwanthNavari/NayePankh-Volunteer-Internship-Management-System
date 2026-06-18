# NayePankh Volunteer Management System

An interactive, responsive portal designed for NayePankh Foundation to streamline volunteer registration, internship applications, dashboard statistics reporting, and role allocations.

## Features

- **Responsive Web Portal**: Fully mobile-responsive interface aligning layouts and navigation styles on screen widths below `768px`.
- **Theme Support**: Integrated dark mode switcher with local storage persistence to remember user visual preferences.
- **Milestone & Programs Overview**: Showcases volunteer stats, program focus grids, and volunteer feedback.
- **Interactive Registration & Application Forms**: Stores submitted volunteer and internship details locally under the `volunteers` and `internshipApplications` keys in `localStorage`.
- **Insights Dashboard**: Powered by Chart.js. Aggregates data dynamically from local storage and displays them in a doughnut chart (Skills Distribution) and a bar chart (Internship Role Applications) that reactively update to theme toggles.
- **Team Recommendation Wizard**: An interactive wizard matching skills (Python, Web Development, Teaching, Design, Communication) and interests (Education, Technology, Marketing, Environment) to recommend NayePankh teams.
- **Contact Channels**: Quick-access details for head office location, phone, email, and social networks.

## Technology Stack

- **Markup**: HTML5 Semantic Structures
- **Styling**: Modern CSS3 (Grid systems, Flexbox, Variable-driven themes, Keyframe animations)
- **Logics & State**: Vanilla ES6 JavaScript (LocalStorage APIs, Intersection Observers)
- **Charts**: Chart.js Library via CDN
- **Icons**: FontAwesome v6 via CDN

## Directory Structure

```
nayepankh-volunteer-management-system/
├── index.html            # Home & landing page
├── about.html            # Mission, vision, and core values
├── volunteer.html        # Registration portal
├── internship.html       # Application portal
├── dashboard.html        # Chart.js analytics dashboard
├── recommendation.html   # Skills recommendation wizard
├── contact.html          # Office locations and message form
├── css/
│   └── style.css         # Theme colors, styling systems, and responsive queries
├── js/
│   ├── darkmode.js       # Theme switching and storage logic
│   ├── script.js         # Navigation, scroll animations, and form validation handlers
│   ├── dashboard.js      # Chart aggregates and canvas renderer
│   └── recommendation.js # Skills-interests matrix mappings
└── README.md             # Project information
```

## GitHub Pages Deployment

To deploy this project to GitHub Pages:

1. Initialize Git, add files, and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial Commit"
   ```
2. Configure a main branch and add your GitHub repository remote url:
   ```bash
   git branch -M main
   git remote add origin YOUR_REPO_URL
   ```
3. Push to your main branch:
   ```bash
   git push -u origin main
   ```
4. Navigate to your repository page on GitHub.
5. Click **Settings** -> **Pages** (in the sidebar).
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Select **main** branch, set the folder to `/ (root)`, and click **Save**.
8. Within a few minutes, your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.
