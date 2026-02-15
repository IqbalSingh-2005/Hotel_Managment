# Hotel Management System

A premium, full-featured hotel management system built with React and Firebase, featuring advanced booking capabilities, user dashboards, admin analytics, Google OAuth authentication, and AI-powered customer support.

## 🌟 Features

### Customer-Facing Features
- **Authentication System**
  - ✅ Login with email/password (Firebase Auth)
  - ✅ User registration with validation
  - ✅ Password reset flow
  - ✅ **Google OAuth Sign-In** (Fully Integrated)
  - ✅ Session persistence
  - ✅ Firebase Authentication integration

- **Advanced Room Search & Booking**
  - Multi-criteria filtering (price, rating, amenities, guests)
  - Date range selection (check-in/out)
  - Real-time search
  - Sort by price, rating, or recommendation
  - Premium room cards with images and details
  - 6 room types (Deluxe, Executive, Family, Premium, Standard, Honeymoon)

- **User Dashboard**
  - Profile management with edit functionality
  - View active bookings
  - Cancel bookings (24-hour policy)
  - Booking statistics
  - Status tracking (Confirmed, Pending, Cancelled)

- **AI Chatbot**
  - Interactive customer support
  - Predefined responses for common queries
  - Quick action buttons
  - Typing indicators
  - Auto-suggestions

### Admin Features
- **Analytics Dashboard**
  - Revenue tracking with growth indicators
  - Booking metrics
  - Occupancy rate monitoring
  - Active users statistics
  - Recent bookings overview
  - Top performing rooms analysis

- **Management Interface**
  - Quick access to room management
  - Booking oversight
  - User management
  - Report generation

### System Features
- **Notification System**
  - Toast notifications (Success, Error, Warning, Info)
  - Auto-dismiss functionality
  - Context API implementation
  - Manual close option

- **Premium UI/UX**
  - Glass-morphism design
  - Gradient animations
  - Smooth transitions
  - Loading skeletons
  - Responsive design (mobile-first)
  - Premium color scheme
  - Professional default avatars and placeholders

## 🛠 Tech Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Backend**: Firebase (Authentication + Firestore)
- **Authentication**: Firebase Auth with Google OAuth 2.0
- **Database**: Cloud Firestore
- **Routing**: React Router DOM 7.6.3
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.525.0
- **State Management**: React Context API + Hooks
- **Linting**: ESLint 9.25.0

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/IqbalSingh-2005/Hotel_Managment.git
   cd Hotel_Managment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Required!)
   - Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Create a `.env` file by copying `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your Firebase credentials in the `.env` file (get these from Firebase Console)
   - Enable Google Authentication in Firebase Console

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Background.jsx
│   ├── Navbar.jsx
│   ├── Ham_Menu.jsx
│   ├── Chatbot.jsx
│   ├── LoadingSkeletons.jsx
│   └── ...
├── config/             # Configuration files
│   └── firebase.js     # Firebase configuration & initialization
├── contexts/           # React Context providers
│   ├── AuthContext.jsx # Authentication API & state management
│   └── NotificationContext.jsx
├── services/           # API and database services
│   ├── firebase.service.js  # Firestore CRUD operations (API Layer)
│   └── initData.js     # Sample data initialization
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── SearchRooms.jsx
│   ├── UserProfile.jsx
│   ├── MyBookings.jsx
│   ├── AdminDashboard.jsx
│   └── ...
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

**📖 API Documentation:** See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed information about all API endpoints and their usage.

## 🎨 Design System

### Color Palette
- **Primary**: White overlays on dark backgrounds
- **Accents**: Blue-to-purple gradients (#3B82F6 to #9333EA)
- **Status Colors**:
  - Success: Green (#22C55E)
  - Error: Red (#EF4444)
  - Warning: Yellow (#EAB308)
  - Info: Blue (#3B82F6)

### Typography
- **Headings**: Cinzel Decorative (luxury feel)
- **Body**: Lora (readable, professional)
- **Weights**: 300, 400, 600, 700

### Components
- **Cards**: `rounded-3xl` with `backdrop-blur-xl`
- **Buttons**: Gradient backgrounds with hover transforms
- **Inputs**: `rounded-xl` with focus rings
- **Icons**: Lucide React (w-5 h-5)

## 📱 Pages

1. **/** - Home page with hero section
2. **/login** - User authentication
3. **/signup** - User registration
4. **/forgot-password** - Password reset
5. **/booking** - Search and filter rooms
6. **/profile** - User profile management
7. **/my-bookings** - Active bookings
8. **/admin** - Admin dashboard
9. **/rooms** - Rooms showcase
10. **/restaurant** - Restaurant information
11. **/gym** - Gym facilities
12. **/events** - Events and conferences
13. **/contact** - Contact form

## 🔧 Configuration

### Firebase Configuration
See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed Firebase setup instructions including:
- Creating a Firebase project
- Enabling authentication methods
- Setting up Firestore database
- Configuring security rules
- Google OAuth setup

### Tailwind Configuration
Custom animations and utilities in `tailwind.config.js`:
- Text gradient animation
- Slide-up animation
- Blob animations
- Custom font families

### Vite Configuration
Optimized build settings in `vite.config.js`:
- React plugin
- Fast refresh
- Build optimization

## 🗄️ Database

### Firebase Firestore Collections

- **users**: User profiles and settings
- **bookings**: Hotel room reservations
- **rooms**: Available rooms with details
- **reviews**: User reviews for rooms

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete database schema and [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API endpoints to interact with these collections.

## 🔐 Security

- ✅ Firebase Authentication with email/password and Google OAuth
- ✅ Firestore security rules for data protection
- ✅ Input validation on all forms
- ✅ XSS prevention through React's built-in escaping
- ✅ No inline scripts
- ✅ Secure authentication flow
- ✅ 0 security vulnerabilities (CodeQL scan)

## 🎯 Implemented Features

### Authentication & Backend
- ✅ Firebase Authentication (Email/Password)
- ✅ Google OAuth 2.0 Sign-In
- ✅ Cloud Firestore database
- ✅ User profile management
- ✅ Session persistence
- ✅ Secure data storage

### Future Enhancements

#### Advanced Features
- Payment gateway integration (Stripe/PayPal)
- Machine learning price prediction
- Collaborative filtering recommendations
- Email notifications
- SMS alerts
- Calendar synchronization
- WebSocket for real-time updates

#### Admin Features
- Hotel management (add/edit)
- Room management interface
- User management
- Detailed analytics
- Report generation (CSV/PDF)

## 📊 Performance

- **Bundle Size**: 323KB JS (93KB gzipped)
- **CSS Size**: 36KB (6.6KB gzipped)
- **Build Time**: ~3 seconds
- **Lighthouse Score**: Optimized for performance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Iqbal Singh**
- GitHub: [@IqbalSingh-2005](https://github.com/IqbalSingh-2005)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Vite for the blazing fast build tool

---

**Built with ❤️ using React + Vite + Tailwind CSS**
