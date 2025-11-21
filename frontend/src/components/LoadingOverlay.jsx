import React from 'react';
import { Loader } from 'lucide-react';

const LoadingOverlay = ({ t = {} }) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    role="alert"
    aria-live="assertive"
  >
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-xl">
      <Loader className="w-12 h-12 text-blue-600 animate-spin mb-3" />
      <p className="text-gray-700 font-medium">
        {t.loading || 'Loading...'}
      </p>
    </div>
  </div>
);

export default LoadingOverlay;