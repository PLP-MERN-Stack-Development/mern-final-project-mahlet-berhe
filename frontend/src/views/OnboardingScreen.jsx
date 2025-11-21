import React from 'react';

const OnboardingScreen = ({ t, language, userType, navigateTo, goBack }) => {
  const isCustomer = userType === 'customer';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        {isCustomer ? t.onboarding1Title || 'Find trusted workers' : t.onboarding3Title || 'Grow your business'}
      </h1>

      <p className="text-gray-600 mb-6">
        {isCustomer ? t.onboarding1Desc || 'Book reliable professionals' : t.onboarding3Desc || 'Get discovered by customers'}
      </p>

      <button
        onClick={() => navigateTo('signin')}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all mb-4"
      >
        {t.getStarted || 'Get Started'}
      </button>

      <button
        onClick={goBack}
        className="text-sm text-blue-600 underline"
      >
        {t.back || 'Back'}
      </button>
    </div>
  );
};

export default OnboardingScreen;