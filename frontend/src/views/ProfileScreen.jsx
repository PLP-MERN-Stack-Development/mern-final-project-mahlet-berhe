import React from 'react';
import {
  CheckCircle,
  User,
  Bell,
  Languages,
  Shield,
  CreditCard,
  HelpCircle,
  FileText,
  ChevronRight,
  LogOut
} from 'lucide-react';

const ProfileScreen = ({
  t = {},
  userType = '',
  handleLogout = () => {}
}) => {
  const isWorker = userType === 'worker';

  const menuItems = [
    { icon: <User />, label: t.editProfile || 'Edit Profile' },
    { icon: <Bell />, label: t.notifications || 'Notifications', badge: '3' },
    { icon: <Languages />, label: t.language || 'Language' },
    { icon: <Shield />, label: t.privacy || 'Privacy & Safety' },
    { icon: <CreditCard />, label: t.paymentMethods || 'Payment Methods' },
    { icon: <HelpCircle />, label: t.support || 'Help & Support' },
    { icon: <FileText />, label: t.termsOfService || 'Terms of Service' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 pb-16">
        <div className="flex items-center gap-4 text-white">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl font-bold shadow-xl">
            A
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-1">Adam K.</h2>
            <p className="text-blue-100 mb-2">{isWorker ? t.worker || 'Worker' : t.customer || 'Customer'}</p>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{t.verified || 'Verified'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats for Workers */}
      <div className="px-4 -mt-10">
        {isWorker && (
          <div className="bg-white rounded-2xl p-5 shadow-lg mb-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">42</p>
              <p className="text-xs text-gray-600 mt-1">{t.activeJobs || 'Active Jobs'}</p>
            </div>
            <div className="text-center border-x border-gray-200">
              <p className="text-3xl font-bold text-green-600">98%</p>
              <p className="text-xs text-gray-600 mt-1">{t.rating || 'Rating'}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">4.9★</p>
              <p className="text-xs text-gray-600 mt-1">{t.reviews || 'Reviews'}</p>
            </div>
          </div>
        )}

        {/* Menu */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="w-full p-4 flex items-center gap-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="text-gray-600">{item.icon}</div>
              <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
              {item.badge && (
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-50 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t.logout || 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;