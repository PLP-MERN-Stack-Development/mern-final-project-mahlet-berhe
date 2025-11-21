import React from 'react';
import {
  Home,
  Search,
  Calendar,
  MessageCircle,
  User,
  Briefcase,
  DollarSign
} from 'lucide-react';

const BottomNav = ({
  currentScreen = '',
  navigateTo = () => {},
  userType = 'customer',
  t = {}
}) => {
  const customerTabs = [
    { key: 'home', icon: <Home />, label: t.home || 'Home' },
    { key: 'search', icon: <Search />, label: t.search || 'Search' },
    { key: 'bookings', icon: <Calendar />, label: t.bookings || 'Bookings' },
    { key: 'messages', icon: <MessageCircle />, label: t.messages || 'Messages' },
    { key: 'profile', icon: <User />, label: t.profile || 'Profile' }
  ];

  const workerTabs = [
    { key: 'workerDashboard', icon: <Home />, label: t.home || 'Dashboard' },
    { key: 'jobs', icon: <Briefcase />, label: t.jobs || 'Jobs' },
    { key: 'messages', icon: <MessageCircle />, label: t.messages || 'Messages' },
    { key: 'earnings', icon: <DollarSign />, label: t.earnings || 'Earnings' },
    { key: 'profile', icon: <User />, label: t.profile || 'Profile' }
  ];

  const tabs = userType === 'customer' ? customerTabs : workerTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 max-w-2xl mx-auto shadow-lg z-50" aria-label="Bottom navigation">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => navigateTo(tab.key)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              currentScreen === tab.key
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label={tab.label}
          >
            {React.cloneElement(tab.icon, {
              className: `w-6 h-6 ${
                currentScreen === tab.key ? 'scale-110' : ''
              } transition-transform`
            })}
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;