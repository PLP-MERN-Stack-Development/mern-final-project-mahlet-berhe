import React, { useState } from 'react';
import {
  AlertTriangle, Languages, Bell, Search, X, Filter, TrendingUp,
  MapPin, Calendar, MessageCircle, DollarSign
} from 'lucide-react';
import WorkerCard from '../components/Workercard';

const CustomerHomeScreen = ({
  t,
  language = 'en',
  setLanguage = () => {},
  navigateTo = () => {},
  setSelectedWorker = () => {},
  setSelectedCategory = () => {},
  categories = [],
  workers = [],
  urgentJobs = [],
  notifications = [],
  markNotificationRead = () => {},
  isOffline = false,
  favorites = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredWorkers = searchQuery
    ? workers.filter(w =>
        w.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t[w.categoryKey]?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      )
    : workers;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {isOffline && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-3 flex items-center gap-3 animate-slide-down">
          <AlertTriangle className="w-5 h-5 text-yellow-700 flex-shrink-0" />
          <p className="text-sm text-yellow-700 font-medium">
            {language === 'en'
              ? "You're offline. Some features may be limited."
              : 'ከመስመር ውጭ ነዎት። አንዳንድ ባህሪያት የተገደቡ ሊሆኑ ይችላሉ።'}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-b-3xl p-6 pb-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{t.appName}</h1>
            <p className="text-blue-100 text-sm">{t.tagline}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
              className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl hover:bg-white/30 transition-all"
            >
              <Languages className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl hover:bg-white/30 transition-all relative"
            >
              <Bell className="w-5 h-5 text-white" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-xl">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          )}
          <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-4">
        {!searchQuery && (
          <>
            {/* Categories */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-900 text-lg">{t.categories}</h2>
                <button className="text-blue-600 text-sm font-semibold hover:underline">{t.viewAll}</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      navigateTo('workersList');
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 transition-all group"
                  >
                    <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
                    <span className="text-xs font-medium text-gray-700 text-center">{t[cat.key]}</span>
                    <span className="text-xs text-gray-500">{cat.workers}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgent Jobs */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h2 className="font-bold text-gray-900 text-lg">{t.urgentJobs}</h2>
                <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-bold ml-auto">
                  {urgentJobs.length}
                </span>
              </div>
              {urgentJobs.map(job => (
                <div key={job.id} className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4 mb-3 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{job.title[language]}</h3>
                        <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                          {t.urgent}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{job.timePosted}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">{job.budget}</span>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                      {t.bookNow}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Worker List */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-gray-900 text-lg">
              {searchQuery ? `${filteredWorkers.length} ${t.noResults.split(' ')[0]}` : t.topRated}
            </h2>
            {!searchQuery && <button className="text-blue-600 text-sm font-semibold hover:underline">{t.viewAll}</button>}
          </div>
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map(worker => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                t={t}
                language={language}
                favorites={favorites}
                onClick={() => {
                  setSelectedWorker(worker);
                  navigateTo('workerProfile');
                }}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t.noResults}</p>
            </div>
          )}
        </div>
      </div>

            {/* Notifications Panel */}
            {showNotifications && (
              <div
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-end z-50"
                onClick={() => setShowNotifications(false)}
              >
                <div
                  className="w-full sm:w-96 h-full bg-white p-4 overflow-y-auto shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{t.notifications}</h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Close notifications"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
      
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <p>{t.noNotifications}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map(n => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-lg border ${n.read ? 'bg-gray-50 border-gray-100' : 'bg-white border-blue-100 shadow-sm'}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{n.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                              <p className="text-xs text-gray-400 mt-2">{n.time}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {!n.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markNotificationRead(n.id);
                                  }}
                                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700"
                                >
                                  {t.markRead}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
      
          </div>
        );
      };
      
      export default CustomerHomeScreen;