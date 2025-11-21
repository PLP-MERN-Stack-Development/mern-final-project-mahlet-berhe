import React, { useState } from 'react';

const SignUpScreen = ({
  t = {},
  navigateTo = () => {}
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    if (name.trim() && email.trim() && password.trim()) {
      alert(t.signupSuccess || 'Account created! Please log in.');
      navigateTo('signin');
    } else {
      alert(t.fillAllFields || 'Please fill in all fields');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">{t.signUp || 'Sign Up'}</h1>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        {t.name || 'Name'}
      </label>
      <input
        type="text"
        placeholder={t.name || 'Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">
        {t.email || 'Email'}
      </label>
      <input
        type="email"
        placeholder={t.email || 'Email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">
        {t.password || 'Password'}
      </label>
      <input
        type="password"
        placeholder={t.password || 'Password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <button
        onClick={signup}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
      >
        {t.createAccount || 'Create Account'}
      </button>

      <p className="text-sm text-center mt-4">
        {t.alreadyHaveAccount || 'Already have an account?'}{' '}
        <button
          onClick={() => navigateTo('signin')}
          className="text-blue-600 underline font-medium"
        >
          {t.login || 'Log In'}
        </button>
      </p>
    </div>
  );
};

export default SignUpScreen;