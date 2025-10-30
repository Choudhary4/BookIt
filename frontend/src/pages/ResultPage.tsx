import { useLocation, useNavigate } from 'react-router-dom';
import type { Booking, Experience } from '../types';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { success, booking, experience, message } = location.state as {
    success: boolean;
    booking?: Booking;
    experience?: Experience;
    message?: string;
  };

  // ❌ Failure UI
  if (!success) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mb-8 shadow-md">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-10.95a1 1 0 00-1.414-1.414L10 8.586 7.879 6.465a1 1 0 00-1.414 1.414L8.586 10l-2.121 2.121a1 1 0 001.414 1.415L10 11.414l2.121 2.122a1 1 0 001.415-1.415L11.414 10l2.122-2.121z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Booking Failed
        </h1>
        <p className="text-lg text-gray-600 mb-8 font-medium">
          {message || 'Something went wrong. Please try again later.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-md bg-gray-300 text-gray-700 text-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-md bg-[#FFD84D] text-black text-lg font-bold hover:bg-[#f5c933] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // 🟩 Success UI
  if (!booking || !experience) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center text-center px-4">
      {/* Brighter green icon + slightly larger */}
      <div className="w-20 h-20 bg-[#28A745] rounded-full flex items-center justify-center mb-8 shadow-md">
        <svg
          className="w-14 h-14 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

   {/* Title + Ref ID */}
<h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
  Booking Confirmed
</h1>
<p className="text-sm sm:text-base text-[#6B6B6B] mb-8 font-medium">
  Ref ID:&nbsp;
  <span className="text-[#6B6B6B]">{booking.bookingReference || '—'}</span>
</p>

{/* Button */}
<button
  onClick={() => navigate('/')}
  className="px-6 py-2 rounded-md bg-[#E5E5E5] text-[#5A5A5A] text-sm font-medium hover:bg-[#DCDCDC] transition-colors"
>
  Back to Home
</button>

    </div>
  );
};

export default ResultPage;
