import mongoose from 'mongoose';
import { config } from '../config/index.js';
import { Experience } from '../models/Experience.js';

const experiences = [
  {
    title: 'Kayaking',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Experience the thrill of kayaking through mangrove forests and pristine waters. Perfect for both beginners and experienced paddlers.',
    shortDescription: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Udupi',
    category: 'adventure',
    duration: '3 hours',
    images: ['https://res.cloudinary.com/dfqgwph6t/image/upload/v1761835640/brave_screenshot_v0.app_5_xa7tbv.png'],
    basePrice: 999,
    rating: 4.5,
    reviewCount: 124,
    highlights: [
      'Professional kayaking instructor',
      'All safety equipment provided',
      'Small group size (max 8 people)',
      'Suitable for beginners',
    ],
    included: [
      'Kayak and paddle',
      'Life jacket',
      'Safety briefing',
      'Bottled water',
    ],
    notIncluded: [
      'Transportation to location',
      'Personal expenses',
      'Meals',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '08:00 AM',
        endTime: '11:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 999,
      },
      {
        date: new Date('2025-11-06'),
        startTime: '08:00 AM',
        endTime: '11:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 999,
      },
    ],
  },
  {
    title: 'Nandi Hills Sunrise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Watch the spectacular sunrise from Nandi Hills, one of the most scenic spots near Bangalore.',
    shortDescription: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Bangalore',
    category: 'nature',
    duration: '4 hours',
    images: ['https://res.cloudinary.com/dfqgwph6t/image/upload/v1761835631/brave_screenshot_v0.app_6_cjmbvj.png'],
    basePrice: 899,
    rating: 4.7,
    reviewCount: 256,
    highlights: [
      'Early morning pickup',
      'Breathtaking sunrise views',
      'Light breakfast included',
      'Professional photographer guide',
    ],
    included: [
      'Transportation from Bangalore',
      'Entry fees',
      'Light breakfast',
      'Guide',
    ],
    notIncluded: [
      'Personal expenses',
      'Additional meals',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '04:30 AM',
        endTime: '08:30 AM',
        availableSpots: 12,
        totalSpots: 12,
        price: 899,
      },
      {
        date: new Date('2025-11-06'),
        startTime: '04:30 AM',
        endTime: '08:30 AM',
        availableSpots: 12,
        totalSpots: 12,
        price: 899,
      },
    ],
  },
  {
    title: 'Coffee Trail',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Explore the lush coffee plantations of Coorg, learn about coffee cultivation, and taste fresh brews.',
    shortDescription: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Coorg',
    category: 'nature',
    duration: '5 hours',
    images: ['https://res.cloudinary.com/dfqgwph6t/image/upload/v1761835642/brave_screenshot_v0.app_2_v8utpl.png'],
    basePrice: 1299,
    rating: 4.8,
    reviewCount: 189,
    highlights: [
      'Guided plantation tour',
      'Coffee tasting session',
      'Learn about coffee processing',
      'Scenic nature walk',
    ],
    included: [
      'Plantation tour',
      'Coffee tasting',
      'Local guide',
      'Refreshments',
    ],
    notIncluded: [
      'Transportation',
      'Lunch',
      'Shopping',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '09:00 AM',
        endTime: '02:00 PM',
        availableSpots: 10,
        totalSpots: 10,
        price: 1299,
      },
      {
        date: new Date('2025-11-07'),
        startTime: '09:00 AM',
        endTime: '02:00 PM',
        availableSpots: 10,
        totalSpots: 10,
        price: 1299,
      },
    ],
  },
  {
    title: 'Kayaking',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Paddle through the scenic rivers of Udupi, Karnataka and enjoy the natural beauty.',
    shortDescription: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Udupi, Karnataka',
    category: 'adventure',
    duration: '3 hours',
    images: ['https://res.cloudinary.com/dfqgwph6t/image/upload/v1761835630/brave_screenshot_v0.app_7_olf4sz.png'],
    basePrice: 999,
    rating: 4.6,
    reviewCount: 98,
    highlights: [
      'River kayaking experience',
      'Safety equipment provided',
      'Expert instruction',
      'Beautiful natural scenery',
    ],
    included: [
      'Kayak and paddle',
      'Life jacket and helmet',
      'Professional guide',
      'Safety briefing',
    ],
    notIncluded: [
      'Transportation',
      'Food and beverages',
      'Personal items',
    ],
    slots: [
      {
        date: new Date('2025-11-06'),
        startTime: '10:00 AM',
        endTime: '01:00 PM',
        availableSpots: 8,
        totalSpots: 8,
        price: 999,
      },
      {
        date: new Date('2025-11-08'),
        startTime: '10:00 AM',
        endTime: '01:00 PM',
        availableSpots: 8,
        totalSpots: 8,
        price: 999,
      },
    ],
  },
  {
    title: 'Nandi Hills Sunrise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Witness the magical golden hour sunset from the hills near Bangalore.',
    shortDescription: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Bangalore',
    category: 'nature',
    duration: '4 hours',
    images: ['https://res.cloudinary.com/dfqgwph6t/image/upload/v1761835636/brave_screenshot_v0.app_4_k3slbg.png'],
    basePrice: 899,
    rating: 4.7,
    reviewCount: 312,
    highlights: [
      'Sunset viewing',
      'Photography opportunities',
      'Evening snacks',
      'Guided tour',
    ],
    included: [
      'Transportation',
      'Entry tickets',
      'Evening snacks',
      'Guide service',
    ],
    notIncluded: [
      'Dinner',
      'Personal expenses',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '03:00 PM',
        endTime: '07:00 PM',
        availableSpots: 12,
        totalSpots: 12,
        price: 899,
      },
      {
        date: new Date('2025-11-07'),
        startTime: '03:00 PM',
        endTime: '07:00 PM',
        availableSpots: 12,
        totalSpots: 12,
        price: 899,
      },
    ],
  },
  {
    title: 'Boat Cruise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Enjoy a serene boat cruise through the famous Sunderban mangrove forests.',
    shortDescription: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Sunderban',
    category: 'nature',
    duration: '6 hours',
    images: ['https://res.cloudinary.com/dfqgwph6t/image/upload/v1761835639/brave_screenshot_v0.app_amo7by.png'],
    basePrice: 1199,
    rating: 4.5,
    reviewCount: 167,
    highlights: [
      'Mangrove forest cruise',
      'Wildlife spotting opportunities',
      'Lunch included',
      'Expert naturalist guide',
    ],
    included: [
      'Boat cruise',
      'Lunch',
      'Guide',
      'Entry permits',
    ],
    notIncluded: [
      'Transportation to departure point',
      'Camera fees',
      'Personal expenses',
    ],
    slots: [
      {
        date: new Date('2025-11-06'),
        startTime: '08:00 AM',
        endTime: '02:00 PM',
        availableSpots: 15,
        totalSpots: 15,
        price: 1199,
      },
      {
        date: new Date('2025-11-09'),
        startTime: '08:00 AM',
        endTime: '02:00 PM',
        availableSpots: 15,
        totalSpots: 15,
        price: 1199,
      },
    ],
  },
  {
    title: 'Bungee Jumping',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Take the leap with India\'s highest bungee jumping experience in Manali.',
    shortDescription: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Manali',
    category: 'adventure',
    duration: '2 hours',
    images: ['https://res.cloudinary.com/dfqgwph6t/image/upload/v1761835640/brave_screenshot_v0.app_1_ecwnya.png'],
    basePrice: 1499,
    rating: 4.9,
    reviewCount: 423,
    highlights: [
      'Highest bungee jump in India',
      'Professional safety standards',
      'Video recording included',
      'Certificate of completion',
    ],
    included: [
      'Bungee jump',
      'Safety equipment',
      'Video recording',
      'Certificate',
    ],
    notIncluded: [
      'Transportation',
      'Food',
      'Photo package (available separately)',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        availableSpots: 6,
        totalSpots: 6,
        price: 1499,
      },
      {
        date: new Date('2025-11-06'),
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        availableSpots: 6,
        totalSpots: 6,
        price: 1499,
      },
      {
        date: new Date('2025-11-08'),
        startTime: '02:00 PM',
        endTime: '04:00 PM',
        availableSpots: 6,
        totalSpots: 6,
        price: 1499,
      },
    ],
  },
  {
    title: 'Coffee Trail',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Trek through the forest trails of Coorg and immerse yourself in nature.',
    shortDescription: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Coorg',
    category: 'adventure',
    duration: '4 hours',
    images: ['https://res.cloudinary.com/dfqgwph6t/image/upload/v1761835637/brave_screenshot_v0.app_3_afbkpz.png'],
    basePrice: 1299,
    rating: 4.6,
    reviewCount: 145,
    highlights: [
      'Guided forest trek',
      'Bird watching opportunities',
      'Photography spots',
      'Refreshments included',
    ],
    included: [
      'Trekking guide',
      'Trail permit',
      'Refreshments',
      'First aid kit',
    ],
    notIncluded: [
      'Transportation',
      'Meals',
      'Personal trekking gear',
    ],
    slots: [
      {
        date: new Date('2025-11-07'),
        startTime: '06:00 AM',
        endTime: '10:00 AM',
        availableSpots: 10,
        totalSpots: 10,
        price: 1299,
      },
      {
        date: new Date('2025-11-09'),
        startTime: '06:00 AM',
        endTime: '10:00 AM',
        availableSpots: 10,
        totalSpots: 10,
        price: 1299,
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB Connected');

    // Clear existing data
    await Experience.deleteMany({});
    console.log('Existing experiences cleared');

    // Insert new experiences
    await Experience.insertMany(experiences);
    console.log('Highway Delite experiences seeded successfully');

    console.log(`✅ Successfully seeded ${experiences.length} experiences!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
