import React from 'react';
import { CheckCircle, Star, MapPin, Clock } from 'lucide-react';

const WorkerCard = ({
  worker = {},
  onClick = () => {},
  favorites = [],
  t = {}
}) => {
  const isFavorite = favorites.includes(worker.id);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all transform hover:scale-[1.02]"
      aria-label={`View profile for ${worker.name}`}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
            {worker.name?.charAt(0) || 'W'}
          </div>
          {worker.available && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 truncate">{worker.name}</h3>
                {worker.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-600">{t[worker.categoryKey] || 'Category'}</p>
            </div>
            <div className="text-right ml-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-sm">{worker.rating || '0.0'}</span>
              </div>
              <p className="text-xs text-gray-500">{worker.jobs || '0 jobs'}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {(worker.skills || []).slice(0, 2).map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
            {worker.skills?.length > 2 && (
              <span className="text-xs text-gray-500">
                +{worker.skills.length - 2}
              </span>
            )}
          </div>

          {/* Location & Rate */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{worker.distance || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{worker.responseTime || 'N/A'}</span>
              </div>
            </div>
            <p className="font-bold text-blue-600">
              {worker.hourlyRate || 0} ETB {t.perHour || '/hr'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;