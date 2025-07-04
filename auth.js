// AccraRemoteJobs - Authentication System
// Handles user login, signup, and profile management

// User state
let currentUser = null;
let appliedJobs = [];
let savedJobs = [];

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
  checkAuthStatus();
  loadUserData();
});

// Check if user is logged in
function checkAuthStatus() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    currentUser = JSON.parse(userData);
    updateAuthUI();
  }
}

// Load user data from localStorage
function loadUserData() {
  const savedAppliedJobs = localStorage.getItem('appliedJobs');
  const savedSavedJobs = localStorage.getItem('savedJobs');
  
  if (savedAppliedJobs) {
    appliedJobs = JSON.parse(savedAppliedJobs);
  }
  
  if (savedSavedJobs) {
    savedJobs = JSON.parse(savedSavedJobs);
  }
}

// Update authentication UI
function updateAuthUI() {
  const authButtons = document.getElementById('auth-buttons');
  const profileDropdown = document.getElementById('profile-dropdown');
  
  if (currentUser) {
    // User is logged in
    if (authButtons) authButtons.style.display = 'none';
    if (profileDropdown) {
      profileDropdown.style.display = 'block';
      document.getElementById('user-email').textContent = currentUser.email;
      document.getElementById('profile-email').textContent = currentUser.email;
    }
    loadAppliedJobs();
  } else {
    // User is not logged in
    if (authButtons) authButtons.style.display = 'flex';
    if (profileDropdown) profileDropdown.style.display = 'none';
  }
}

// Show authentication modal
function showAuthModal(type) {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  
  modal.style.display = 'block';
  
  if (type === 'login') {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
  } else if (type === 'signup') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
  }
}

// Close authentication modal
function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Switch between login and signup forms
function switchAuthForm(type) {
  if (type === 'login') {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
  } else if (type === 'signup') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
  }
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  showLoading();
  
  // Simulate login API call
  setTimeout(() => {
    hideLoading();
    
    // For demo purposes, accept any email/password combination
    if (email && password) {
      currentUser = {
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        id: Date.now().toString()
      };
      
      localStorage.setItem('userData', JSON.stringify(currentUser));
      updateAuthUI();
      closeAuthModal();
      showNotification('Successfully signed in!', 'success');
      
      // Clear form
      document.getElementById('loginEmail').value = '';
      document.getElementById('loginPassword').value = '';
    } else {
      showNotification('Invalid email or password', 'error');
    }
  }, 1500);
}

// Handle signup form submission
function handleSignup(event) {
  event.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  
  if (!name || !email || !password || !confirmPassword) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }
  
  if (!agreeTerms) {
    showNotification('Please agree to the terms and conditions', 'error');
    return;
  }
  
  showLoading();
  
  // Simulate signup API call
  setTimeout(() => {
    hideLoading();
    
    // For demo purposes, create account with any valid data
    currentUser = {
      email: email,
      name: name,
      id: Date.now().toString()
    };
    
    localStorage.setItem('userData', JSON.stringify(currentUser));
    updateAuthUI();
    closeAuthModal();
    showNotification('Account created successfully!', 'success');
    
    // Clear form
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirmPassword').value = '';
    document.getElementById('agreeTerms').checked = false;
  }, 1500);
}

// Logout user
function logout() {
  currentUser = null;
  localStorage.removeItem('userData');
  updateAuthUI();
  showNotification('Successfully signed out', 'success');
  
  // Hide profile menu
  const profileMenu = document.getElementById('profileMenu');
  if (profileMenu) {
    profileMenu.classList.remove('show');
  }
}

// Toggle profile dropdown
function toggleProfileDropdown() {
  const profileMenu = document.getElementById('profileMenu');
  if (profileMenu) {
    profileMenu.classList.toggle('show');
  }
}

// Load applied jobs in profile
function loadAppliedJobs() {
  const appliedJobsList = document.getElementById('applied-jobs-list');
  if (!appliedJobsList) return;
  
  appliedJobsList.innerHTML = '';
  
  if (appliedJobs.length === 0) {
    appliedJobsList.innerHTML = `
      <div style="text-align: center; padding: 1rem; color: var(--text-secondary);">
        <i class="fas fa-briefcase" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
        <p>No applications yet</p>
        <small>Apply to jobs to see them here</small>
      </div>
    `;
    return;
  }
  
  appliedJobs.forEach(jobId => {
    const job = remoteJobs.find(j => j.id === jobId);
    if (job) {
      const jobItem = document.createElement('div');
      jobItem.className = 'applied-job-item';
      jobItem.innerHTML = `
        <h5>${job.title}</h5>
        <p>${job.company}</p>
        <small>Applied on ${new Date().toLocaleDateString()}</small>
      `;
      appliedJobsList.appendChild(jobItem);
    }
  });
}

// Load saved jobs
function loadSavedJobs() {
  const savedJobsList = document.getElementById('savedJobsList');
  if (!savedJobsList) return;
  
  savedJobsList.innerHTML = '';
  
  if (savedJobs.length === 0) {
    savedJobsList.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
        <i class="fas fa-bookmark" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <h3>No saved jobs</h3>
        <p>Save jobs to view them here later</p>
      </div>
    `;
    return;
  }
  
  savedJobs.forEach(jobId => {
    const job = remoteJobs.find(j => j.id === jobId);
    if (job) {
      const jobCard = createJobCard(job);
      savedJobsList.appendChild(jobCard);
    }
  });
}

// Update user profile
function updateProfile() {
  const name = document.getElementById('profile-name').value;
  const location = document.getElementById('profile-location').value;
  
  if (!name) {
    showNotification('Please enter your name', 'error');
    return;
  }
  
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    
    currentUser.name = name;
    currentUser.location = location;
    localStorage.setItem('userData', JSON.stringify(currentUser));
    
    showNotification('Profile updated successfully!', 'success');
  }, 1000);
}

// Update job preferences
function updatePreferences() {
  const categories = Array.from(document.getElementById('preferred-categories').selectedOptions).map(option => option.value);
  const regions = Array.from(document.getElementById('preferred-regions').selectedOptions).map(option => option.value);
  
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    
    currentUser.preferences = {
      categories: categories,
      regions: regions
    };
    localStorage.setItem('userData', JSON.stringify(currentUser));
    
    showNotification('Preferences saved successfully!', 'success');
  }, 1000);
}

// Enhanced apply to job function
function applyToJob(jobId) {
  if (!currentUser) {
    showAuthModal('login');
    showNotification('Please sign in to apply for jobs', 'info');
    return;
  }
  
  showLoading();
  
  // Simulate application process
  setTimeout(() => {
    hideLoading();
    
    // Add to applied jobs if not already applied
    if (!appliedJobs.includes(jobId)) {
      appliedJobs.push(jobId);
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
      loadAppliedJobs();
    }
    
    showNotification('Application submitted successfully!', 'success');
  }, 2000);
}

// Enhanced save job function
function saveJob(jobId) {
  if (!currentUser) {
    showAuthModal('login');
    showNotification('Please sign in to save jobs', 'info');
    return;
  }
  
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
  
  if (!savedJobs.includes(jobId)) {
    savedJobs.push(jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    showNotification('Job saved to your list!', 'success');
  } else {
    showNotification('Job already saved!', 'info');
  }
}

// Show forgot password (placeholder)
function showForgotPassword() {
  showNotification('Password reset feature coming soon!', 'info');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const authModal = document.getElementById('authModal');
  const legalModal = document.getElementById('legalModal');
  
  if (event.target === authModal) {
    closeAuthModal();
  }
  
  if (event.target === legalModal) {
    closeLegalModal();
  }
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAuthModal();
    closeLegalModal();
  }
});

console.log('AccraRemoteJobs Authentication loaded successfully! 🔐'); 