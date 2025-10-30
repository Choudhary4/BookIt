import { Booking } from '../models/Booking.js';
import { Experience } from '../models/Experience.js';
import mongoose from 'mongoose';

// Create a new booking
export const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      experienceId,
      slotId,
      customerInfo,
      numberOfPeople,
      pricing,
    } = req.body;

    // Validate required fields
    if (!experienceId || !slotId || !customerInfo || !numberOfPeople || !pricing) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Find experience and slot
    const experience = await Experience.findById(experienceId).session(session);

    if (!experience) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Experience not found',
      });
    }

    const slot = experience.slots.id(slotId);

    if (!slot) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Slot not found',
      });
    }

    // Check availability
    if (slot.availableSpots < numberOfPeople) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: `Only ${slot.availableSpots} spots available`,
      });
    }

    // Create booking
    const booking = new Booking({
      experienceId,
      slotId,
      customerInfo,
      numberOfPeople,
      slotDetails: {
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
      pricing,
      status: 'confirmed',
    });

    await booking.save({ session });

    // Update slot availability
    slot.availableSpots -= numberOfPeople;
    await experience.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

// Get booking by reference
export const getBookingByReference = async (req, res) => {
  try {
    const { reference } = req.params;

    const booking = await Booking.findOne({ bookingReference: reference })
      .populate('experienceId', 'title location images');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
