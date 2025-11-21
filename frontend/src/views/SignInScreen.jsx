import React, { useState } from 'react';

const SignInScreen = ({
  t = {},
  handleLogin = () => {},
  navigateTo = () => {}
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const login = () => {
    if (email.trim() && password.trim()) {
      handleLogin({ name: 'Mahlet', email }, role);
    } else {
      alert(t.invalidCredentials || 'Invalid email or password');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">{t.signIn || 'Sign In'}</h1>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        {t.role || 'Role'}
      </label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="customer">{t.customer || 'Customer'}</option>
        <option value="worker">{t.worker || 'Worker'}</option>
      </select>

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
        onClick={login}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
      >
        {t.login || 'Log In'}
      </button>

      <p className="text-sm text-center mt-4">
        {t.noAccount || "Don't have an account?"}{' '}
        <button
          onClick={() => navigateTo('signup')}
          className="text-blue-600 underline font-medium"
        >
          {t.signUp || 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default SignInScreen;