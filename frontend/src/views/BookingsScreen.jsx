import React from 'react';
import { ChevronLeft, Calendar, Clock, MapPin, Check } from 'lucide-react';

const BookingsScreen = ({
  t,
  language,
  selectedWorker,
  workers = [],
  bookingForm = {
    date: '',
    time: '',
    description: '',
    budget: '',
    location: '',
    notes: ''
  },
  setBookingForm = () => {},
  navigateTo,
  handleBookingSubmit = () => {}
}) => {
  const worker = selectedWorker || (Array.isArray(workers) ? workers[0] : {});
  const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigateTo('workerProfile')} className="text-gray-600 hover:text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{t.bookingDetails}</h1>
      </div>

      {/* Booking Form */}
      <div className="p-4 space-y-4">
        {/* Worker Info */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              {worker?.name?.charAt(0) || 'W'}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{worker?.name || 'Worker'}</p>
              <p className="text-sm text-gray-600">{t[worker?.categoryKey] || 'Category'}</p>
            </div>
            <p className="font-bold text-blue-600 text-lg">
              {worker?.hourlyRate || 0} ETB{t.perHour}
            </p>
          </div>
        </div>

        {/* Date Picker */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <label className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            {t.selectDate}
          </label>
          <input
            type="date"
            value={bookingForm.date}
            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-colors"
          />
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <label className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
            {t.selectTime}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setBookingForm({ ...bookingForm, time })}
                className={`py-3 rounded-xl font-medium transition-all ${
                  bookingForm.time === time
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <label className="font-semibold text-gray-900 mb-3">{t.jobDescription}</label>
          <textarea
            value={bookingForm.description}
            onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
            placeholder={language === 'en' ? 'Describe what you need...' : 'የሚፈልጉትን ይግለጹ...'}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 outline-none h-32 resize-none transition-colors"
          />
        </div>

        {/* Budget */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <label className="font-semibold text-gray-900 mb-3">{t.estimatedBudget}</label>
          <div className="relative">
            <input
              type="number"
              value={bookingForm.budget}
              onChange={(e) => setBookingForm({ ...bookingForm, budget: e.target.value })}
              placeholder="0"
              className="w-full p-4 pr-16 border-2 border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">ETB</span>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <label className="font-semibold text-gray-900 mb-3">{t.locationDetails}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={bookingForm.location}
              onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
              placeholder={language === 'en' ? 'Enter address' : 'አድራሻ ያስገቡ'}
              className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-colors"
            />
            <button className="bg-blue-100 text-blue-600 px-5 rounded-xl hover:bg-blue-200 transition-colors">
              <MapPin className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <label className="font-semibold text-gray-900 mb-3">{t.additionalNotes}</label>
          <textarea
            value={bookingForm.notes}
            onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
            placeholder={language === 'en' ? 'Any special requirements...' : 'ማንኛውም ልዩ መስፈርቶች...'}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 outline-none h-24 resize-none transition-colors"
          />
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg max-w-2xl mx-auto">
        <button
          onClick={handleBookingSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          {t.confirmBooking}
        </button>
      </div>
    </div>
  );
};

export default BookingsScreen;