import React from 'react';
import { Bell, Calendar, MapPin } from 'lucide-react';

const WorkerDashboard = ({ t = {} }) => (
  <div className="min-h-screen bg-gray-50 pb-20">
    {/* Header */}
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 pb-8">
      <div className="flex justify-between items-start mb-6">
        <div className="text-white">
          <h1 className="text-2xl font-bold mb-1">{t.myJobs || 'My Jobs'}</h1>
          <p className="text-blue-100">{t.welcomeBack || 'Welcome back, Abebe!'}</p>
        </div>
        <button
          className="bg-white/20 backdrop-blur-sm p-2 rounded-xl relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            3
          </span>
        </button>
      </div>

      {/* Earnings */}
      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <p className="text-gray-600 text-sm mb-2">{t.todaysEarnings || "Today's Earnings"}</p>
        <p className="text-4xl font-bold text-gray-900 mb-4">1,250 ETB</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">{t.thisWeek || 'This Week'}</p>
            <p className="font-bold text-gray-900 text-lg">8,500 ETB</p>
          </div>
          <div className="border-l border-gray-200 pl-4">
            <p className="text-gray-600">{t.thisMonth || 'This Month'}</p>
            <p className="font-bold text-gray-900 text-lg">32,450 ETB</p>
          </div>
        </div>
      </div>
    </div>

    {/* Job Sections */}
    <div className="px-4 space-y-6 mt-4">
      {/* Pending Jobs */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-900 text-lg">{t.pendingJobs || 'Pending Jobs'}</h2>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">3</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">Kitchen pipe leak repair</h3>
              <p className="text-sm text-gray-600">Bole, Addis Ababa</p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
              500 ETB
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3 bg-gray-50 p-3 rounded-xl">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Tomorrow, 10:00 AM</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>2.3 km</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              {t.acceptJob || 'Accept Job'}
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              {t.declineJob || 'Decline'}
            </button>
          </div>
        </div>
      </section>

      {/* Active Jobs */}
      <section>
        <h2 className="font-bold text-gray-900 text-lg mb-3">{t.activeJobs || 'Active Jobs'}</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">Deep cleaning service</h3>
              <p className="text-sm text-gray-600">CMC, Addis Ababa</p>
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
              {t.inProgress || 'In Progress'}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              <MapPin className="w-4 h-4" />
              {t.getDirections || 'Get Directions'}
            </button>
            <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              {t.markComplete || 'Mark as Complete'}
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default WorkerDashboard;