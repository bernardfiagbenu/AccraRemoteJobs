// Firebase Configuration for AccraRemoteJobs
// Using the provided Google services configuration

// Check if we're in a supported environment
const isSupportedEnvironment = () => {
  const protocol = window.location.protocol;
  return protocol === 'http:' || protocol === 'https:' || protocol === 'chrome-extension:';
};

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBsleAnl5ZWTyGp11DsIHJY0mOD_PNMx5k",
  authDomain: "g00gleauthen-2afqo4.firebaseapp.com",
  projectId: "g00gleauthen-2afqo4",
  storageBucket: "g00gleauthen-2afqo4.firebasestorage.app",
  messagingSenderId: "151985888576",
  appId: "1:151985888576:android:89b98cf4aeb401a8f8aea5"
};

// Initialize Firebase only in supported environments
let auth = null;
let googleProvider = null;

if (isSupportedEnvironment()) {
  try {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Initialize Firebase Auth
    auth = firebase.auth();
    
    // Google Auth Provider
    googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope('email');
    googleProvider.addScope('profile');
    
    console.log('Firebase initialized successfully! 🔥');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.warn('⚠️ Firebase requires HTTP/HTTPS protocol. Running in demo mode with localStorage authentication.');
}

// Auth state observer (only if Firebase is available)
if (auth) {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in
      console.log('User signed in:', user.email);
      currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
      
      // Save user data to localStorage for persistence
      localStorage.setItem('userData', JSON.stringify(currentUser));
      updateAuthUI();
      
      // Load user's applied jobs from Firebase
      loadUserAppliedJobs();
      
    } else {
      // User is signed out
      console.log('User signed out');
      currentUser = null;
      localStorage.removeItem('userData');
      updateAuthUI();
    }
  });
}

// Fallback authentication for unsupported environments
const fallbackAuth = {
  currentUser: null,
  
  signIn: function(email, password) {
    return new Promise((resolve, reject) => {
      // Simulate authentication delay
      setTimeout(() => {
        if (email && password) {
          this.currentUser = {
            uid: 'demo-' + Date.now(),
            email: email,
            displayName: email.split('@')[0],
            photoURL: null,
            emailVerified: true
          };
          
          currentUser = this.currentUser;
          localStorage.setItem('userData', JSON.stringify(currentUser));
          updateAuthUI();
          loadUserAppliedJobs();
          
          resolve({ user: this.currentUser });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },
  
  signUp: function(email, password, displayName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          this.currentUser = {
            uid: 'demo-' + Date.now(),
            email: email,
            displayName: displayName || email.split('@')[0],
            photoURL: null,
            emailVerified: true
          };
          
          currentUser = this.currentUser;
          localStorage.setItem('userData', JSON.stringify(currentUser));
          updateAuthUI();
          loadUserAppliedJobs();
          
          resolve({ user: this.currentUser });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },
  
  signOut: function() {
    return new Promise((resolve) => {
      this.currentUser = null;
      currentUser = null;
      localStorage.removeItem('userData');
      updateAuthUI();
      resolve();
    });
  }
};

// Sign in with Google
function signInWithGoogle() {
  if (!isSupportedEnvironment()) {
    showNotification('Google Sign-In requires HTTP/HTTPS. Please use a local server.', 'warning');
    return;
  }
  
  if (!auth) {
    showNotification('Firebase not available. Please check your configuration.', 'error');
    return;
  }
  
  showLoading();
  
  auth.signInWithPopup(googleProvider)
    .then((result) => {
      hideLoading();
      closeAuthModal();
      showNotification('Successfully signed in with Google!', 'success');
    })
    .catch((error) => {
      hideLoading();
      console.error('Google sign-in error:', error);
      
      let errorMessage = 'Failed to sign in with Google';
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Pop-up was blocked. Please allow pop-ups for this site';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in was cancelled';
          break;
        case 'auth/operation-not-supported-in-this-environment':
          errorMessage = 'Google Sign-In not supported in this environment. Please use HTTP/HTTPS.';
          break;
        default:
          errorMessage = error.message;
      }
      
      showNotification(errorMessage, 'error');
    });
}

// Sign in with email and password
function signInWithEmailAndPassword(email, password) {
  if (auth) {
    return auth.signInWithEmailAndPassword(email, password);
  } else {
    return fallbackAuth.signIn(email, password);
  }
}

// Create user with email and password
function createUserWithEmailAndPassword(email, password) {
  if (auth) {
    return auth.createUserWithEmailAndPassword(email, password);
  } else {
    return fallbackAuth.signUp(email, password);
  }
}

// Sign out
function signOut() {
  if (auth) {
    return auth.signOut();
  } else {
    return fallbackAuth.signOut();
  }
}

// Send password reset email
function sendPasswordResetEmail(email) {
  if (auth) {
    return auth.sendPasswordResetEmail(email);
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        showNotification('Password reset email sent! (Demo mode)', 'success');
        resolve();
      }, 1000);
    });
  }
}

// Update user profile
function updateUserProfile(displayName, photoURL) {
  if (auth && auth.currentUser) {
    return auth.currentUser.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    });
  } else if (currentUser) {
    // Update localStorage user data
    currentUser.displayName = displayName;
    currentUser.photoURL = photoURL;
    localStorage.setItem('userData', JSON.stringify(currentUser));
    updateAuthUI();
    return Promise.resolve();
  }
}

// Load user's applied jobs from Firebase
function loadUserAppliedJobs() {
  if (!currentUser) return;
  
  // For demo purposes, we'll use localStorage
  // In a real app, you'd fetch from Firestore
  const savedAppliedJobs = localStorage.getItem(`appliedJobs_${currentUser.uid}`);
  if (savedAppliedJobs) {
    appliedJobs = JSON.parse(savedAppliedJobs);
  }
  
  const savedSavedJobs = localStorage.getItem(`savedJobs_${currentUser.uid}`);
  if (savedSavedJobs) {
    savedJobs = JSON.parse(savedSavedJobs);
  }
}

// Save applied jobs to Firebase (localStorage for demo)
function saveAppliedJobs() {
  if (!currentUser) return;
  
  localStorage.setItem(`appliedJobs_${currentUser.uid}`, JSON.stringify(appliedJobs));
  localStorage.setItem(`savedJobs_${currentUser.uid}`, JSON.stringify(savedJobs));
}

// Enhanced apply to job function with Firebase
function applyToJob(jobId) {
  if (!currentUser) {
    showAuthModal('login');
    showNotification('Please sign in to apply for jobs', 'info');
    return;
  }
  
  if (appliedJobs.includes(jobId)) {
    showNotification('You have already applied to this job!', 'info');
    return;
  }
  
  showLoading();
  
  // Simulate application process
  setTimeout(() => {
    hideLoading();
    
    // Add to applied jobs
    appliedJobs.push(jobId);
    saveAppliedJobs();
    
    // Reload jobs to update UI
    loadJobs();
    loadAppliedJobs();
    
    showNotification('Application submitted successfully!', 'success');
  }, 2000);
}

// Enhanced save job function with Firebase
function saveJob(jobId) {
  if (!currentUser) {
    showAuthModal('login');
    showNotification('Please sign in to save jobs', 'info');
    return;
  }
  
  if (savedJobs.includes(jobId)) {
    // Remove from saved jobs
    savedJobs = savedJobs.filter(id => id !== jobId);
    showNotification('Job removed from saved list!', 'success');
  } else {
    // Add to saved jobs
    savedJobs.push(jobId);
    showNotification('Job saved to your list!', 'success');
  }
  
  saveAppliedJobs();
  
  // Reload jobs to update UI
  loadJobs();
}

// Enhanced logout function
function logout() {
  signOut()
    .then(() => {
      currentUser = null;
      appliedJobs = [];
      savedJobs = [];
      localStorage.removeItem('userData');
      updateAuthUI();
      showNotification('Successfully signed out', 'success');
      
      // Hide profile menu
      const profileMenu = document.getElementById('profileMenu');
      if (profileMenu) {
        profileMenu.classList.remove('show');
      }
    })
    .catch((error) => {
      console.error('Logout error:', error);
      showNotification('Error signing out', 'error');
    });
}

// Enhanced login handler
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  showLoading();
  
  signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      hideLoading();
      closeAuthModal();
      showNotification('Successfully signed in!', 'success');
      
      // Clear form
      document.getElementById('loginEmail').value = '';
      document.getElementById('loginPassword').value = '';
    })
    .catch((error) => {
      hideLoading();
      console.error('Login error:', error);
      
      let errorMessage = 'Failed to sign in';
      if (auth) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email address';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled';
            break;
          default:
            errorMessage = error.message;
        }
      } else {
        errorMessage = error.message || 'Invalid credentials';
      }
      
      showNotification(errorMessage, 'error');
    });
}

// Enhanced signup handler
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
  
  if (password.length < 6) {
    showNotification('Password must be at least 6 characters long', 'error');
    return;
  }
  
  if (!agreeTerms) {
    showNotification('Please agree to the terms and conditions', 'error');
    return;
  }
  
  showLoading();
  
  createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update user profile with display name
      return updateUserProfile(name);
    })
    .then(() => {
      hideLoading();
      closeAuthModal();
      showNotification('Account created successfully!', 'success');
      
      // Clear form
      document.getElementById('signupName').value = '';
      document.getElementById('signupEmail').value = '';
      document.getElementById('signupPassword').value = '';
      document.getElementById('signupConfirmPassword').value = '';
      document.getElementById('agreeTerms').checked = false;
    })
    .catch((error) => {
      hideLoading();
      console.error('Signup error:', error);
      
      let errorMessage = 'Failed to create account';
      if (auth) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'An account with this email already exists';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak';
            break;
          default:
            errorMessage = error.message;
        }
      } else {
        errorMessage = error.message || 'Failed to create account';
      }
      
      showNotification(errorMessage, 'error');
    });
}

// Show forgot password
function showForgotPassword() {
  const email = document.getElementById('loginEmail').value;
  
  if (!email) {
    showNotification('Please enter your email address first', 'error');
    return;
  }
  
  showLoading();
  
  sendPasswordResetEmail(email)
    .then(() => {
      hideLoading();
      showNotification('Password reset email sent! Check your inbox.', 'success');
    })
    .catch((error) => {
      hideLoading();
      console.error('Password reset error:', error);
      
      let errorMessage = 'Failed to send reset email';
      if (auth) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email address';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          default:
            errorMessage = error.message;
        }
      } else {
        errorMessage = error.message || 'Failed to send reset email';
      }
      
      showNotification(errorMessage, 'error');
    });
}

console.log('Firebase configuration loaded successfully! 🔥');
console.log('Environment check:', isSupportedEnvironment() ? '✅ Supported' : '⚠️ Demo mode'); 