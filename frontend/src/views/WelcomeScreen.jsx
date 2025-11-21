import React from 'react';

const WelcomeScreen = ({ t, language, setLanguage, setUserType, navigateTo }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">{t.welcome || 'Welcome to DailyWork'}</h1>
      <p className="text-blue-100 mb-6">{t.tagline || 'Trusted local workers near you'}</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => {
            setUserType('customer');
            navigateTo('onboarding');
          }}
          className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
        >
          {t.continueAsCustomer || 'Continue as Customer'}
        </button>

        <button
          onClick={() => {
            setUserType('worker');
            navigateTo('onboarding');
          }}
          className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
        >
          {t.continueAsWorker || 'Continue as Worker'}
        </button>
      </div>

      <button
        onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
        className="text-sm underline hover:text-blue-200 transition-colors"
      >
        {language === 'en' ? 'አማርኛ ይምረጡ' : 'Switch to English'}
      </button>
    </div>
  );
};

export default WelcomeScreen;