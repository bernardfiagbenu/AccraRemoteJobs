// Simplified App.js

// Global variables
let currentUser = null;
let jobs = [];
let isAdmin = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadJobs();
    setupEventListeners();
});

// Initialize the application
function initializeApp() {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForUser();
    }
    
    // Check if user is admin (you can modify this logic)
    checkAdminStatus();
}

// Check if current user is admin
function checkAdminStatus() {
    if (currentUser && currentUser.email) {
        // Simple admin check - you can modify this logic
        isAdmin = currentUser.email.includes('admin') || currentUser.email.includes('bernard');
        if (isAdmin) {
            // Display user's actual name instead of "Admin"
            const userRole = document.getElementById('userRole');
            if (userRole) {
                userRole.textContent = currentUser.displayName || currentUser.email.split('@')[0];
            }
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterJobs(this.value);
        });
    }
    
    // Post job form
    const postJobForm = document.getElementById('postJobForm');
    if (postJobForm) {
        postJobForm.addEventListener('submit', handlePostJob);
    }
}

// Google Sign In
function signInWithGoogle() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                currentUser = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                };
                
                localStorage.setItem('user', JSON.stringify(currentUser));
                updateUIForUser();
                checkAdminStatus();
                showNotification('Successfully signed in!', 'success');
            })
            .catch((error) => {
                console.error('Sign in error:', error);
                showNotification('Sign in failed. Please try again.', 'error');
            });
    } else {
        // Fallback for local development
        currentUser = {
            uid: 'local-user',
            email: 'admin@accraremotejobs.com',
            displayName: 'Bernard Figbenu',
            photoURL: null
        };
        localStorage.setItem('user', JSON.stringify(currentUser));
        updateUIForUser();
        checkAdminStatus();
        showNotification('Signed in (local mode)', 'info');
    }
}

// Sign Out
function signOut() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut()
            .then(() => {
                currentUser = null;
                localStorage.removeItem('user');
                updateUIForUser();
                showNotification('Signed out successfully', 'info');
            })
            .catch((error) => {
                console.error('Sign out error:', error);
            });
    } else {
        // Fallback for local development
        currentUser = null;
        localStorage.removeItem('user');
        updateUIForUser();
        showNotification('Signed out (local mode)', 'info');
    }
}

// Update UI based on user authentication status
function updateUIForUser() {
    const authButtons = document.getElementById('auth-buttons');
    const profileDropdown = document.getElementById('profile-dropdown');
    const userEmail = document.getElementById('userEmail');
    const postJobBtn = document.getElementById('postJobBtn');
    const footerSignIn = document.getElementById('footerSignIn');
    
    if (currentUser) {
        authButtons.style.display = 'none';
        profileDropdown.style.display = 'block';
        userEmail.textContent = currentUser.email;
        
        // Hide footer sign in link when logged in
        if (footerSignIn) {
            footerSignIn.style.display = 'none';
        }
        
        // Show/hide post job button based on admin status
        if (isAdmin) {
            postJobBtn.style.display = 'block';
        } else {
            postJobBtn.style.display = 'none';
        }
    } else {
        authButtons.style.display = 'block';
        profileDropdown.style.display = 'none';
        
        // Show footer sign in link when not logged in
        if (footerSignIn) {
            footerSignIn.style.display = 'inline';
        }
    }
}

// Toggle profile menu
function toggleProfile() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.toggle('show');
}

// Close profile menu when clicking outside
document.addEventListener('click', function(event) {
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileMenu = document.getElementById('profileMenu');
    
    if (!profileDropdown.contains(event.target)) {
        profileMenu.classList.remove('show');
    }
});

// Toggle theme
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.setAttribute('data-theme', 'dark');
        themeToggle.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        body.removeAttribute('data-theme');
        themeToggle.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    const sections = ['jobSearch', 'postJob'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // Show requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// Show post job form (admin only)
function showPostJobForm() {
    if (!currentUser) {
        showNotification('Please sign in to post jobs', 'warning');
        return;
    }
    
    if (!isAdmin) {
        showNotification('Only admins can post jobs', 'warning');
        return;
    }
    
    showSection('postJob');
}

// Handle job posting
function handlePostJob(event) {
    event.preventDefault();
    
    if (!currentUser || !isAdmin) {
        showNotification('Only admins can post jobs', 'error');
        return;
    }
    
    const formData = {
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('companyName').value,
        location: document.getElementById('jobLocation').value,
        salary: document.getElementById('jobSalary').value,
        description: document.getElementById('jobDescription').value,
        applicationUrl: document.getElementById('applicationUrl').value,
        postedBy: currentUser.email,
        postedAt: new Date().toISOString(),
        id: Date.now().toString()
    };
    
    // Add job to local storage
    jobs.unshift(formData);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    
    // Reset form
    event.target.reset();
    
    // Show success message
    showNotification('Job posted successfully!', 'success');
    
    // Return to job search
    showSection('jobSearch');
    
    // Reload jobs
    loadJobs();
}

// Load jobs from storage
function loadJobs() {
    // Clear existing jobs to force update
    localStorage.removeItem('jobs');
    
    // Load sample jobs
    jobs = getSampleJobs();
    localStorage.setItem('jobs', JSON.stringify(jobs));
    
    displayJobs(jobs);
}

// Get sample jobs
function getSampleJobs() {
    return [
        {
            id: '1',
            title: '(Native German) Customer Support Consultant, emails/chats',
            company: 'SupportYourApp',
            location: 'Accra, Greater Accra Region, Ghana (Remote)',
            salary: 'Compensation in USD + Bonuses',
            description: 'Passionate about the world of tech? Join our team as a Customer Support Consultant and thrive in a multicultural and multilingual environment while enjoying your home office. Unlock your potential by mastering new skills and achieving challenging goals with our People First management approach. What you will do: Provide exceptional customer support via chats and emails, build positive and long-lasting relationships with customers, meet team KPIs, always be up-to-date with cutting-edge technology, securely work with customers\' sensitive information, apply the latest customer happiness practices, maintain working knowledge of our client\'s products and services, communicate with developers and other departments of various IT companies. What you need: Native German and English communication skills, at least 6 months of experience in a customer support role, analytical and research skills, positive and responsible attitude, personal laptop or computer (at least 8Gb of RAM) and stable internet connection (minimum 50 Mbps–download and 40 Mbps–upload). Benefits: Flexible schedule, opportunity to work fully remotely, inclusive international environment, compensation in USD, good bonuses for referring friends, paid intensive training and probation, work-life balance, responsive management interested in your growth and long-lasting cooperation, greenhouse conditions for self-development.',
            applicationUrl: 'https://apply.workable.com/supportyourapp/j/B65CA0A4E2/',
            postedBy: 'admin@accraremotejobs.com',
            postedAt: '2025-01-15T10:00:00Z'
        }
    ];
}

// Display jobs
function displayJobs(jobsToShow) {
    const jobListings = document.getElementById('jobListings');
    if (!jobListings) return;
    
    if (jobsToShow.length === 0) {
        jobListings.innerHTML = `
            <div class="no-jobs">
                <i class="fas fa-search"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    jobListings.innerHTML = jobsToShow.map(job => `
        <div class="job-card">
            <div class="job-header">
                <div class="job-logo">
                    <i class="fas fa-building"></i>
                </div>
                <div class="job-info">
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                    <div class="job-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                        <span><i class="fas fa-clock"></i> ${formatDate(job.postedAt)}</span>
                    </div>
                </div>
                <div class="job-salary">
                    <div class="salary-amount">${job.salary}</div>
                </div>
            </div>
            <div class="job-description">
                <p>${job.description}</p>
            </div>
            <div class="job-actions">
                <a href="${job.applicationUrl}" target="_blank" class="btn">
                    <i class="fas fa-external-link-alt"></i>
                    Apply Now
                </a>
            </div>
        </div>
    `).join('');
}

// Filter jobs
function filterJobs(searchTerm) {
    if (!searchTerm.trim()) {
        displayJobs(jobs);
        return;
    }
    
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    displayJobs(filteredJobs);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInHours < 48) {
        return '1 day ago';
    } else {
        return date.toLocaleDateString();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Show legal modal
function showLegalModal(type) {
    const modal = document.getElementById('legalModal');
    const content = document.getElementById('legalContent');
    
    if (type === 'about') {
        content.innerHTML = `
            <h2>About Us</h2>
            <p>AccraRemoteJobs is the premier platform connecting remote workers in Accra, Ghana with global opportunities. We believe in the power of remote work to create economic opportunities and bridge geographical barriers.</p>
            <p>Our mission is to make remote work accessible to everyone in Accra and beyond, connecting talented professionals with innovative companies worldwide.</p>
        `;
    } else if (type === 'contact') {
        content.innerHTML = `
            <h2>Contact Us</h2>
            <p>Get in touch with us for any questions or support.</p>
            <p><strong>Email:</strong> contact@accraremotejobs.com</p>
            <p><strong>Location:</strong> Accra, Ghana</p>
        `;
    }
    
    modal.style.display = 'block';
}

// Close legal modal
function closeLegalModal() {
    const modal = document.getElementById('legalModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('legalModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Function to manually refresh jobs (can be called from browser console)
function refreshJobs() {
    localStorage.removeItem('jobs');
    loadJobs();
    showNotification('Jobs refreshed!', 'success');
}
