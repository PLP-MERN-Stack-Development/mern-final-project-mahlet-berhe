import React, { useState, useEffect } from 'react';
import SplashScreen from './views/SplashScreen';
import WelcomeScreen from './views/WelcomeScreen';
import OnboardingScreen from './views/OnboardingScreen';
import SignInScreen from './views/SignInScreen';
import SignUpScreen from './views/SignupScreen';
import CustomerHomeScreen from './views/CustomerHomeScreen';
import WorkerProfileScreen from './views/WorkerProfileScreen';
import WorkerDashboard from './views/WorkerDashboard';
import BookingScreen from './views/BookingScreen';
import BookingsScreen from './views/BookingsScreen';
import MessagesScreen from './views/MessagesScreen';
import ChatScreen from './views/ChatScreen';
import JobsScreen from './views/JobsScreen';
import ProfileScreen from './views/ProfileScreen';
import BottomNav from './components/BottomNav';
import LoadingOverlay from './components/LoadingOverlay';
import translations from './translations';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    description: '',
    budget: '',
    location: '',
    notes: ''
  });

  const t = translations[language];

  const workers = [
    {
      id: 1,
      name: 'Abel',
      categoryKey: 'plumbing',
      hourlyRate: 150,
      phone: '0912345678',
      rating: 4.8,
      jobs: '12 jobs',
      skills: ['Pipe Fixing', 'Leak Detection', 'Installation'],
      distance: '1.2 km',
      responseTime: '15 min',
      available: true,
      verified: true,
      bio: 'Experienced plumber with 10+ years in residential and commercial plumbing.',
      yearsExperience: 10,
      completionRate: 95,
      reviews: []
    }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Fix leaking faucet',
      location: 'Bole, Addis Ababa',
      price: 500,
      date: 'Today, 2:00 PM',
      distance: '1.5 km',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Bathroom tile repair',
      location: 'CMC, Addis Ababa',
      price: 750,
      date: 'Tomorrow, 11:00 AM',
      distance: '3.2 km',
      status: 'active'
    }
  ];

  const bookings = [
    { id: 1, title: 'Plumbing Repair', date: 'Nov 20', status: 'confirmed' },
    { id: 2, title: 'Electrical Fix', date: 'Nov 22', status: 'pending' },
    { id: 3, title: 'Cleaning Service', date: 'Nov 25', status: 'completed' }
  ];

  const navigateTo = (screen) => setCurrentScreen(screen);

  const handleLogin = (userData, role) => {
    setUser(userData);
    setUserType(role);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userType', role);
    setCurrentScreen(role === 'customer' ? 'home' : 'workerProfile');
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    localStorage.clear();
    setCurrentScreen('signin');
  };

  const handleBookingSubmit = () => {
    console.log('Booking submitted:', bookingForm);
    alert(t.confirmBooking || 'Booking confirmed!');
    setBookingForm({
      date: '',
      time: '',
      description: '',
      budget: '',
      location: '',
      notes: ''
    });
    navigateTo('bookings');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedType = localStorage.getItem('userType');
    if (savedUser && savedType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedType);
      setCurrentScreen(savedType === 'customer' ? 'home' : 'workerProfile');
    } else {
      const timer = setTimeout(() => setCurrentScreen('welcome'), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen relative">
      {isLoading && <LoadingOverlay t={t} />}

      {/* Debug Reset Button */}
      <button
        onClick={() => {
          localStorage.clear();
          setUser(null);
          setUserType(null);
          setCurrentScreen('splash');
        }}
        className="fixed top-4 right-4 bg-red-600 text-white px-3 py-1 rounded z-50"
      >
        Reset App
      </button>

      {/* Splash → Welcome → Onboarding → Auth */}
      {currentScreen === 'splash' && <SplashScreen t={t} />}
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          t={t}
          language={language}
          setLanguage={setLanguage}
          setUserType={setUserType}
          navigateTo={navigateTo}
        />
      )}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen
          t={t}
          language={language}
          userType={userType}
          navigateTo={navigateTo}
          goBack={() => navigateTo('welcome')}
        />
      )}
      {currentScreen === 'signin' && (
        <SignInScreen t={t} handleLogin={handleLogin} navigateTo={navigateTo} />
      )}
      {currentScreen === 'signup' && (
        <SignUpScreen t={t} navigateTo={navigateTo} />
      )}

      {/* Authenticated Screens */}
      {user && (
        <>
          {currentScreen === 'home' && userType === 'customer' && (
            <CustomerHomeScreen
              t={t}
              workers={workers}
              navigateTo={navigateTo}
              language={language}
              setLanguage={setLanguage}
              setSelectedWorker={() => {}}
              setSelectedCategory={() => {}}
              categories={[]}
              urgentJobs={[]}
              notifications={[]}
              markNotificationRead={() => {}}
              isOffline={false}
              favorites={[]}
            />
          )}

          {currentScreen === 'workerProfile' && userType === 'worker' && (
            <WorkerProfileScreen
              t={t}
              language={language}
              user={user}
              setUser={setUser}
              navigateTo={navigateTo}
              selectedWorker={workers[0]}
              workers={workers}
              favorites={[]}
              toggleFavorite={() => {}}
              setActiveChat={() => {}}
              handleLogout={handleLogout}
            />
          )}

          {currentScreen === 'workerDashboard' && userType === 'worker' && (
            <WorkerDashboard t={t} />
          )}

          {currentScreen === 'messages' && (
            <MessagesScreen t={t} navigateTo={navigateTo} workers={workers} setActiveChat={() => {}} />
          )}

          {currentScreen === 'chat' && (
            <ChatScreen t={t} language={language} navigateTo={navigateTo} />
          )}

          {currentScreen === 'booking' && (
            <BookingScreen
              t={t}
              language={language}
              selectedWorker={workers[0]}
              workers={workers}
              bookingForm={bookingForm}
              setBookingForm={setBookingForm}
              navigateTo={navigateTo}
              handleBookingSubmit={handleBookingSubmit}
            />
          )}

          {currentScreen === 'bookings' && (
            <BookingsScreen
              t={t}
              language={language}
              bookings={bookings}
              bookingForm={bookingForm}
              setBookingForm={setBookingForm}
              navigateTo={navigateTo}
              handleBookingSubmit={handleBookingSubmit}
              selectedWorker={workers[0]}
              workers={workers}
            />
          )}

          {currentScreen === 'jobs' && <JobsScreen t={t} jobs={jobs} />}
          {currentScreen === 'profile' && (
            <ProfileScreen t={t} userType={userType} handleLogout={handleLogout} />
          )}

          {/* Bottom Navigation */}
          {!['splash', 'welcome', 'onboarding', 'signin', 'signup', 'chat', 'booking', 'workerProfile'].includes(currentScreen) && (
            <BottomNav
              currentScreen={currentScreen}
              navigateTo={navigateTo}
              userType={userType}
              t={t}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;