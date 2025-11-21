import React, { useState, useEffect } from 'react';
import translations from './translations';
import {
  workers,
  categories,
  urgentJobs,
  notifications,
  chatMessages
} from './data/mockData';

import WelcomeScreen from './views/WelcomeScreen';
import OnboardingScreen from './views/OnboardingScreen';
import CustomerHomeScreen from './views/CustomerHomeScreen';
import BookingsScreen from './views/BookingsScreen';
import ProfileScreen from './views/ProfileScreen';
import ChatScreen from './views/ChatScreen';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [userType, setUserType] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    description: '',
    budget: '',
    location: '',
    notes: ''
  });
  const [favorites, setFavorites] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeChat, setActiveChat] = useState(workers[0]);
  const [chatInput, setChatInput] = useState('');

  const t = translations[language];

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('welcome'), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigateTo = (screen, data = null) => {
    if (data?.worker) setSelectedWorker(data.worker);
    if (data?.category) setSelectedCategory(data.category);
    if (data?.chat) setActiveChat(data.chat);
    setCurrentScreen(screen);
  };

  const handleBookingSubmit = () => {
    if (!bookingForm.date || !bookingForm.time || !bookingForm.description) {
      alert(language === 'en' ? 'Please fill all required fields' : 'እባክዎ ሁሉንም የሚፈለጉ መስኮች ይሙሉ');
      return;
    }

    alert(language === 'en' ? 'Booking confirmed!' : 'ቦታ ማስያዝ ተረጋግጧል!');
    setBookingForm({
      date: '',
      time: '',
      description: '',
      budget: '',
      location: '',
      notes: ''
    });
    navigateTo('home');
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    // You can push to chatMessages array here if it's stateful
    setChatInput('');
  };

  const markNotificationRead = (id) => {
    // Optional: update notification state
  };

  return (
  
    <>
      {currentScreen === 'Splash' && (
        <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white text-5xl font-bold">
          DW
        </div>
      )}

      {currentScreen === 'Welcome' && (
        <WelcomeScreen
          t={t}
          language={language}
          setLanguage={setLanguage}
          setUserType={setUserType}
          navigateTo={navigateTo}
        />
      )}

      {currentScreen === 'Onboarding' && (
        <OnboardingScreen
          t={t}
          language={language}
          navigateTo={navigateTo}
        />
      )}

      {currentScreen === 'Home' && (
        <CustomerHomeScreen
          t={t}
          language={language}
          setLanguage={setLanguage}
          navigateTo={navigateTo}
          setSelectedWorker={setSelectedWorker}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          workers={workers}
          urgentJobs={urgentJobs}
          notifications={notifications}
          markNotificationRead={markNotificationRead}
          isOffline={isOffline}
          favorites={favorites}
        />
      )}

      {currentScreen === 'Bookings' && (
        <BookingsScreen
          t={t}
          language={language}
          selectedWorker={selectedWorker}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
          navigateTo={navigateTo}
          handleBookingSubmit={handleBookingSubmit}
        />
      )}

      {currentScreen === 'Profile' && (
        <ProfileScreen
          t={t}
          userType={userType}
        />
      )}

      {currentScreen === 'Chat' && (
        <ChatScreen
          activeChat={activeChat}
          workers={workers}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          sendMessage={sendMessage}
          navigateTo={navigateTo}
          t={t}
          language={language}
        />
      )}
    </>
  );
};

export default App;