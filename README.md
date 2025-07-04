# AccraRemoteJobs 🔥

A modern remote job board for Accra, Ghana and beyond. Find remote jobs worldwide and work from anywhere.

## 🚀 Features

- **Remote Job Listings** - Browse remote jobs from companies worldwide
- **Advanced Search & Filtering** - Search by category, region, and keywords
- **Firebase Authentication** - Secure login with email/password or Google
- **Job Applications** - Track your job applications
- **Saved Jobs** - Bookmark jobs for later
- **Responsive Design** - Works on all devices
- **PWA Support** - Install as a mobile app

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: Firebase Auth
- **Styling**: Custom CSS with modern design
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/accra-remote-jobs.git
   cd accra-remote-jobs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔥 Firebase Configuration

The application uses Firebase Authentication. The configuration is already set up in `firebase-config.js` using the provided Google services credentials.

### Important Notes:

- **Local Development**: The app includes a fallback authentication system for local development
- **Production**: Firebase works fully when deployed to a proper domain (HTTP/HTTPS)
- **Google Sign-In**: Requires HTTP/HTTPS protocol to work properly

## 🎯 Usage

### For Job Seekers:
1. **Browse Jobs** - View all available remote positions
2. **Search & Filter** - Find jobs by category, region, or keywords
3. **Sign Up/Login** - Create an account to apply and save jobs
4. **Apply to Jobs** - Submit applications with one click
5. **Track Applications** - View your applied jobs in your profile
6. **Save Jobs** - Bookmark interesting positions for later

### For Employers:
1. **Post Jobs** - Submit remote job listings
2. **Reach Talent** - Connect with remote workers in Accra and beyond
3. **Manage Listings** - Update and manage your job postings

## 🔧 Development

### Project Structure:
```
accra-remote-jobs/
├── index.html          # Main application
├── styles.css          # Styling
├── app.js              # Main application logic
├── firebase-config.js  # Firebase configuration
├── package.json        # Dependencies
├── README.md           # This file
└── netlify/            # Deployment configuration
    └── functions/
        └── get-jobs.js
```

### Key Files:
- `index.html` - Main HTML structure with authentication modals
- `styles.css` - Complete styling including dark mode and responsive design
- `app.js` - Application logic, job management, and UI interactions
- `firebase-config.js` - Firebase authentication setup and fallback system

## 🌐 Deployment

### Netlify (Recommended):
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.`
4. Deploy!

### Other Platforms:
- **Vercel**: Connect repository and deploy
- **GitHub Pages**: Push to `gh-pages` branch
- **Firebase Hosting**: Use Firebase CLI to deploy

## 🔐 Authentication

The application supports multiple authentication methods:

### Firebase Authentication:
- Email/Password signup and login
- Google OAuth sign-in
- Password reset functionality
- Profile management

### Fallback System:
- Works in local development environments
- Uses localStorage for demo purposes
- Maintains full functionality without Firebase

## 📱 PWA Features

- **Installable** - Add to home screen
- **Offline Support** - Service worker for offline functionality
- **Responsive** - Works on all device sizes
- **Fast Loading** - Optimized for performance

## 🎨 Design Features

- **Modern UI** - Clean, professional design
- **Dark Mode** - Toggle between light and dark themes
- **Responsive** - Mobile-first design approach
- **Accessible** - Follows web accessibility guidelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bernard Figbenu**
- Email: hello@accraremotejobs.com
- Website: https://accraremotejobs.com
- GitHub: [@bernardfigbenu](https://github.com/bernardfigbenu)

## 🙏 Acknowledgments

- Inspired by WeWorkRemotely
- Built for the Accra tech community
- Powered by Firebase
- Icons by Font Awesome

---

**Made with ❤️ in Accra, Ghana** 