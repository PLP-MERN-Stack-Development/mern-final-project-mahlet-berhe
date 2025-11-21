   import React, { useState } from 'react';
import {
  ChevronLeft, Heart, Share2, MoreVertical, CheckCircle, Star, MapPin,
  Phone, MessageCircle, Info, Award, Calendar, ThumbsUp, ImageIcon
} from 'lucide-react';

const WorkerProfileScreen = ({
  t = {},
  language = 'en',
  user = {},
  setUser = () => {},
  navigateTo = () => {},
  selectedWorker = null,
  workers = [],
  favorites = [],
  toggleFavorite = () => {},
  setActiveChat = () => {}
}) => {
  const [activeTab, setActiveTab] = useState('about');
  const worker = selectedWorker || workers[0] || {
    name: 'Worker',
    phone: '',
    categoryKey: '',
    rating: 0,
    jobs: '0 jobs',
    distance: 'N/A',
    hourlyRate: 0,
    available: false,
    verified: false,
    reviews: []
  };
  const isFavorite = favorites.includes(worker.id);

  const handleLogout = () => {
    setUser(null);
    navigateTo('signin');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="bg-white/20 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-white/30 transition-all"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(worker.id);
              }}
              className={`backdrop-blur-sm p-2 rounded-xl transition-all ${
                isFavorite ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'
              }`}
              aria-label="Toggle favorite"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white text-white' : 'text-white'}`} />
            </button>
            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-white/30 transition-all" aria-label="Share">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-white/30 transition-all" aria-label="More options">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Worker Info */}
        <div className="flex gap-4 items-start text-white">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl font-bold shadow-xl">
              {worker.name.charAt(0)}
            </div>
            {worker.available && (
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-3 border-white rounded-full shadow-md" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{worker.name}</h1>
              {worker.verified && <CheckCircle className="w-5 h-5" />}
            </div>
            <p className="text-blue-100 mb-3">{t[worker.categoryKey]}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{worker.rating}</span>
                <span className="text-blue-100">({worker.jobs})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{worker.distance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call & Message Buttons */}
      <div className="px-4 -mt-4 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-xl flex gap-3">
          <button
            onClick={() => window.location.href = `tel:${worker.phone}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            {t.callNow}
          </button>
          <button
            onClick={() => {
              setActiveChat(worker);
              navigateTo('chat');
            }}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            {t.message}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-1.5 flex gap-1 shadow-sm">
          {['about', 'reviews', 'portfolio'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">{t.bio || 'About'}</h3>
              <p className="text-gray-600 text-sm">{worker.bio || 'No bio available.'}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">{t.skills || 'Skills'}</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {worker.skills?.length > 0 ? worker.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                )) : <li>{t.noSkills || 'No skills listed.'}</li>}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">{t.experience || 'Experience'}</h3>
              <p className="text-gray-600 text-sm">{worker.yearsExperience || 'N/A'} {t.years || 'years'}</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {worker.reviews?.length > 0 ? worker.reviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{review.user}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.text}</p>
               <button className="text-blue-600 text-sm font-semibold flex items-center gap-2 hover:underline">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{t.helpful || 'Helpful'} ({review.helpful})</span>
                </button>
              </div>
            )) : (
              <div className="bg-white rounded-2xl p-8 text-center">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {language === 'en' ? 'No reviews yet' : 'ገና ምንም ግምገማዎች የሉም'}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-square flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <ImageIcon className="w-12 h-12 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book Now Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 max-w-2xl mx-auto">
        <button
          onClick={() => navigateTo('booking')}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          {t.bookNow || 'Book Now'} – {worker.hourlyRate || 0} ETB {t.perHour || '/hr'}
        </button>
      </div>

      {/* Log Out Button */}
      <div className="fixed bottom-4 left-0 right-0 px-4 max-w-2xl mx-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 rounded-2xl font-bold shadow-md hover:bg-red-700 transition-all"
        >
          {t.logout || 'Log Out'}
        </button>
      </div>
    </div>
  );
};

export default WorkerProfileScreen;