import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience',
      required: true,
    },
    slotId: {
      type: String,
      required: true,
    },
    customerInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      }
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
    },
    slotDetails: {
      date: Date,
      startTime: String,
      endTime: String,
    },
    pricing: {
      basePrice: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        default: 0,
      },
      promoCode: {
        type: String,
        default: null,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    bookingReference: {
      type: String,
      unique: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate booking reference before saving
bookingSchema.pre('save', function (next) {
  if (!this.bookingReference) {
    this.bookingReference = 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

export const Booking = mongoose.model('Booking', bookingSchema);
