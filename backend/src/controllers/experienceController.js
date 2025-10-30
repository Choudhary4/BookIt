import { Experience } from '../models/Experience.js';

// Get all active experiences
export const getAllExperiences = async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice } = req.query;

    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = Number(minPrice);
      if (maxPrice) query.basePrice.$lte = Number(maxPrice);
    }

    const experiences = await Experience.find(query).select('-slots');

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get single experience by ID with slots
export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found',
      });
    }

    // Filter out past slots
    const now = new Date();
    experience.slots = experience.slots.filter(slot => new Date(slot.date) >= now);

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
