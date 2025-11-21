import React from 'react';

const BookingScreen = ({
  t = {},
  bookingForm,
  setBookingForm,
  handleBookingSubmit,
  navigateTo,
  selectedWorker
}) => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">{t.bookingDetails || 'Booking Details'}</h1>

      <input
        type="text"
        placeholder={t.description || 'Description'}
        value={bookingForm.description}
        onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        placeholder={t.budget || 'Budget'}
        value={bookingForm.budget}
        onChange={(e) => setBookingForm({ ...bookingForm, budget: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        placeholder={t.location || 'Location'}
        value={bookingForm.location}
        onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="date"
        value={bookingForm.date}
        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="time"
        value={bookingForm.time}
        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <textarea
        placeholder={t.notes || 'Additional Notes'}
        value={bookingForm.notes}
        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={handleBookingSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
      >
        {t.confirmBooking || 'Confirm Booking'}
      </button>
    </div>
  );
};

export default BookingScreen;