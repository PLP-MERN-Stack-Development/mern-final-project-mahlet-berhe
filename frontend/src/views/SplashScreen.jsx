 import React from 'react';

const SplashScreen = ({ t = {} }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center animate-fade-in">
    <div className="text-center">
      {/* Logo */}
      <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce-slow">
        <span className="text-5xl font-bold text-blue-600" aria-label="App Logo">DW</span>
      </div>

      {/* App Name and Tagline */}
      <h1 className="text-5xl font-bold text-white mb-3 animate-slide-up">
        {t.appName || 'DailyWork'}
      </h1>
      <p
        className="text-blue-100 text-lg animate-slide-up"
        style={{ animationDelay: '0.2s' }}
      >
        {t.tagline || 'Trusted local workers near you'}
      </p>

      {/* Loading Dots */}
      <div className="mt-10 flex justify-center" aria-label="Loading">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SplashScreen;