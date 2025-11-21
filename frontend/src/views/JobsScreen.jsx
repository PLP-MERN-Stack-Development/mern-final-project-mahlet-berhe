import React from 'react';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';

const JobsScreen = ({ t = {}, jobs = [] }) => {
  const pending = jobs.filter(job => job.status === 'pending');
  const active = jobs.filter(job => job.status === 'active');
  const completed = jobs.filter(job => job.status === 'completed');

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{job.title || t.untitledJob || 'Untitled Job'}</h3>
          <p className="text-sm text-gray-600">{job.location || t.unknownLocation || 'Unknown Location'}</p>
        </div>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
          {job.price ? `${job.price} ETB` : t.noPrice || 'N/A'}
        </span>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{job.date || t.noDate || 'No date'}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.distance || t.noDistance || 'N/A'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">{t.jobs || 'My Jobs'}</h1>

      {pending.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">{t.pendingJobs || 'Pending Jobs'}</h2>
          {pending.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}

      {active.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">{t.activeJobs || 'Active Jobs'}</h2>
          {active.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">{t.completedJobs || 'Completed Jobs'}</h2>
          {completed.map(job => (
            <div key={job.id} className="relative">
              <JobCard job={job} />
              <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-green-500" />
            </div>
          ))}
        </div>
      )}

      {jobs.length === 0 && (
        <p className="text-gray-500 text-center mt-10">{t.noJobs || 'No jobs available.'}</p>
      )}
    </div>
  );
};

export default JobsScreen;