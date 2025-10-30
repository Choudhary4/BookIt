import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experienceService } from '../services/api';
import type { Experience, Slot } from '../types';
import Loader from '../components/common/Loader';
import { formatCurrency } from '../utils/helpers';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [lastClickedSlot, setLastClickedSlot] = useState<Slot | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    if (id) fetchExperience();
  }, [id]);

  // Revalidate slot when quantity changes
  useEffect(() => {
    if (selectedSlot && selectedSlot.availableSpots < numberOfPeople) {
      setSelectedSlot(null);
    } else if (
      !selectedSlot &&
      lastClickedSlot &&
      lastClickedSlot.availableSpots >= numberOfPeople
    ) {
      setSelectedSlot(lastClickedSlot);
    }
  }, [numberOfPeople, selectedSlot, lastClickedSlot]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const response = await experienceService.getById(id!);
      setExperience(response.data);

      if (response.data.slots && response.data.slots.length > 0) {
        setSelectedSlot(response.data.slots[0]);
        setLastClickedSlot(response.data.slots[0]);
        const firstDate = new Date(response.data.slots[0].date).toDateString();
        setSelectedDate(firstDate);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load experience details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error || !experience) {
    return (
      <div className="max-w-7xl mx-auto text-center py-16">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#FFD84D] hover:bg-[#f5c933] text-black px-6 py-2 rounded-md font-semibold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Get unique dates
  const getUniqueDates = () => {
    if (!experience?.slots) return [];
    const dates = experience.slots.map((slot) =>
      new Date(slot.date).toDateString()
    );
    return [...new Set(dates)];
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const uniqueDates = getUniqueDates();

  // Get slots for selected date
  const getSlotsForDate = (dateString: string) => {
    if (!experience?.slots) return [];
    return experience.slots.filter(
      (slot) => new Date(slot.date).toDateString() === dateString
    );
  };

  const slotsForSelectedDate = getSlotsForDate(selectedDate);

  const subtotal = selectedSlot
    ? selectedSlot.price * numberOfPeople
    : experience.basePrice * numberOfPeople;
  const tax = Math.round((subtotal * 6) / 100);
  const total = subtotal + tax;

  const isSlotValid =
    selectedSlot && selectedSlot.availableSpots >= numberOfPeople;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 mb-6 hover:text-black"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Details</span>
        </button>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2">
            <img
              src={experience.images?.[0]}
              alt={experience.title}
              className="w-full h-[380px] object-cover rounded-xl"
            />

            <div className="mt-8">
              <h1 className="text-2xl font-semibold text-gray-900">{experience.title}</h1>
              <p className="text-gray-600 mt-3 leading-relaxed">{experience.shortDescription}</p>

              {/* Date Selection */}
              <div className="mt-8">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Choose date</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueDates.map((date, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-2 rounded-md text-sm font-medium border ${
                        selectedDate === date
                          ? 'bg-[#FFD84D] text-black border-[#FFD84D]'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mt-8">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Choose time</h3>
                <div className="flex flex-wrap gap-2">
                  {slotsForSelectedDate.map((slot, index) => {
                    const isNotAvailable = slot.availableSpots < numberOfPeople;
                    const isSelected = selectedSlot?._id === slot._id;

                    return (
                      <button
                        key={slot._id || index}
                        onClick={() => {
                          if (!isNotAvailable) {
                            setSelectedSlot(slot);
                            setLastClickedSlot(slot);
                          }
                        }}
                        disabled={isNotAvailable}
                        className={`flex items-center justify-between gap-3 px-4 py-2 border rounded-md text-sm min-w-[130px] ${
                          isNotAvailable
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
                            : isSelected
                            ? 'bg-[#FFD84D] border-[#FFD84D] text-black'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100 bg-white'
                        }`}
                      >
                        <span>{slot.startTime}</span>
                        {isNotAvailable ? (
                          <span className="text-xs text-gray-500 font-medium">Sold Out</span>
                        ) : (
                          <span className="text-red-500 text-xs font-medium">
                            {slot.availableSpots} left
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-gray-500 text-xs mt-2">All times are in IST (GMT +5:30)</p>
              </div>

              {/* About Section */}
              <div className="mt-10">
                <h3 className="text-base font-semibold text-gray-900 mb-2">About</h3>
                <p className="bg-gray-100 text-gray-700 text-sm p-3 rounded-md">
                  Scenic routes, trained guides, and safety briefing. Minimum age 10.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section (Pricing) */}
          <div className="lg:col-span-1">
            <div className="bg-[#EEEEEE] rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Starts at</span>
                  <span className="font-semibold">₹{experience.basePrice}</span>
                </div>

                {/* Quantity */}
                <div className="flex justify-between text-gray-700">
                  <span>Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                      className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-600"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold">{numberOfPeople}</span>
                    <button
                      onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                      className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxes</span>
                  <span>₹{tax}</span>
                </div>

                <div className="border-t border-gray-300 pt-3 flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={() => {
                  if (isSlotValid) {
                    navigate('/checkout', {
                      state: {
                        experience,
                        slot: selectedSlot,
                        numberOfPeople,
                      },
                    });
                  }
                }}
                disabled={!isSlotValid}
                className={`w-full mt-6 py-2 font-medium rounded-md ${
                  isSlotValid
                    ? 'bg-[#FFD84D] hover:bg-[#f5c933] text-black cursor-pointer'
                    : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>

              {!isSlotValid && selectedSlot && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  Not enough spots for selected quantity
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
