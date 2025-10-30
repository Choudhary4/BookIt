import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  availableSpots: {
    type: Number,
    required: true,
    min: 0,
  },
  totalSpots: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['adventure', 'cultural', 'nature', 'food', 'wellness', 'sightseeing'],
    },
    duration: {
      type: String,
      required: true,
    },
    images: [{
      type: String,
      required: true,
    }],
    basePrice: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    highlights: [{
      type: String,
    }],
    included: [{
      type: String,
    }],
    notIncluded: [{
      type: String,
    }],
    slots: [slotSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Experience = mongoose.model('Experience', experienceSchema);
