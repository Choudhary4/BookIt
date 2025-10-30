import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingService, promoService } from '../services/api';
import type { Experience, Slot, CustomerInfo } from '../types';
import { formatCurrency, formatDate } from '../utils/helpers';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, slot, numberOfPeople } = location.state as {
    experience: Experience;
    slot: Slot;
    numberOfPeople: number;
  };

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agree, setAgree] = useState(false);

  const basePrice = slot.price * numberOfPeople;
  const discount = promoApplied ? promoDiscount : 0;
  const subtotalAfterDiscount = basePrice - discount;
  const taxes = Math.round(subtotalAfterDiscount * 0.06); // 6% tax
  const total = subtotalAfterDiscount + taxes;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Enter a promo code');
      return;
    }

    try {
      setPromoLoading(true);
      setPromoError(null);
      const response = await promoService.validate(promoCode, basePrice);

      setPromoDiscount(response.data.discount);
      setPromoApplied(true);
      setPromoError(null);
    } catch (error: any) {
      setPromoError(error.response?.data?.message || 'Invalid promo code');
      setPromoApplied(false);
      setPromoDiscount(0);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;

    // Validate customer info
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      setPromoError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData = {
        experienceId: experience._id,
        slotId: slot._id,
        customerInfo,
        numberOfPeople,
        pricing: {
          basePrice,
          discount,
          promoCode: promoApplied ? promoCode : null,
          totalAmount: total
        },
      };
      const response = await bookingService.create(bookingData);
      navigate('/result', {
        state: { success: true, booking: response.data, experience },
      });
    } catch (error: any) {
      navigate('/result', {
        state: {
          success: false,
          message:
            error.response?.data?.message ||
            'Booking failed. Please try again.',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 mb-6 hover:text-black"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-[15px] font-medium">Checkout</span>
        </button>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <div className="bg-[#F2F2F2] rounded-xl p-6 space-y-4">
              {/* Full Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Full Name */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">
      Full name
    </label>
    <input
      type="text"
      placeholder="Your name"
      value={`${customerInfo.firstName} ${customerInfo.lastName}`.trim()}
      onChange={(e) => {
        const [first, ...last] = e.target.value.split(' ');
        setCustomerInfo({
          ...customerInfo,
          firstName: first || '',
          lastName: last.join(' ') || '',
        });
      }}
      className="w-full rounded-md bg-[#EAEAEA] px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none"
    />
  </div>

  {/* Email */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">
      Email
    </label>
    <input
      type="email"
      placeholder="Your email"
      value={customerInfo.email || ''}
      onChange={(e) =>
        setCustomerInfo({ ...customerInfo, email: e.target.value })
      }
      className="w-full rounded-md bg-[#EAEAEA] px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none"
    />
  </div>
</div>



              {/* Promo Code */}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="w-full rounded-md bg-[#EAEAEA] px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={promoLoading || promoApplied}
                  className="px-5 py-3 rounded-md bg-black text-white font-semibold text-[15px] hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                  {promoLoading ? '...' : promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>

              {promoError && (
                <p className="text-red-500 text-sm">{promoError}</p>
              )}

              {promoApplied && (
                <p className="text-green-600 text-sm font-medium">
                  Promo code applied! You saved {formatCurrency(discount)}
                </p>
              )}

              {/* Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <label className="text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </form>

          {/* Right Section */}
          <div className="lg:col-span-1">
            <div className="bg-[#F2F2F2] rounded-xl p-6">
              <div className="space-y-4 text-gray-800 text-[15px]">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span>{formatDate(slot.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span>{slot.startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Qty</span>
                  <span>{numberOfPeople}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(basePrice)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes (6%)</span>
                  <span>{formatCurrency(taxes)}</span>
                </div>

                <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-semibold text-lg">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!agree || isSubmitting}
                className={`w-full mt-6 py-3 rounded-md font-semibold text-lg flex items-center justify-center gap-2 ${
                  agree && !isSubmitting
                    ? 'bg-[#FFD84D] hover:bg-[#f5c933] text-black'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Pay and Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
