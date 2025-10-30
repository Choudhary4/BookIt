import mongoose from 'mongoose';
import { config } from '../config/index.js';
import { Experience } from '../models/Experience.js';
import { PromoCode } from '../models/PromoCode.js';

const experiences = [
  {
    title: 'Sunrise Hot Air Balloon Ride',
    description: 'Experience the magic of Jaipur from the sky as you float over ancient forts, palaces, and the Pink City during a breathtaking sunrise. This unforgettable adventure offers panoramic views and a unique perspective of Rajasthan\'s rich heritage. Perfect for photography enthusiasts and adventure seekers alike.',
    shortDescription: 'Soar above Jaipur in a hot air balloon and witness stunning sunrise views.',
    location: 'Jaipur, Rajasthan',
    category: 'adventure',
    duration: '3 hours',
    images: [
      'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    ],
    basePrice: 8999,
    rating: 4.8,
    reviewCount: 342,
    highlights: [
      'Professional pilot with 10+ years experience',
      'Complimentary champagne toast after landing',
      'Flight certificate',
      'Hotel pickup and drop-off',
    ],
    included: [
      'Hot air balloon flight',
      'Safety briefing',
      'Breakfast after the flight',
      'Transportation from hotel',
    ],
    notIncluded: [
      'Personal expenses',
      'Travel insurance',
      'Gratuities',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '05:30 AM',
        endTime: '08:30 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 8999,
      },
      {
        date: new Date('2025-11-06'),
        startTime: '05:30 AM',
        endTime: '08:30 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 8999,
      },
      {
        date: new Date('2025-11-08'),
        startTime: '05:30 AM',
        endTime: '08:30 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 8999,
      },
      {
        date: new Date('2025-11-10'),
        startTime: '05:30 AM',
        endTime: '08:30 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 8999,
      },
    ],
  },
  {
    title: 'Kerala Backwaters Houseboat Tour',
    description: 'Cruise through the serene backwaters of Alleppey in a traditional Kettuvallam (houseboat). Enjoy the lush green landscapes, village life, and authentic Kerala cuisine prepared onboard. This relaxing journey takes you through narrow canals, vast lakes, and paddy fields, offering a glimpse into the tranquil life of Kerala\'s waterways.',
    shortDescription: 'Explore Kerala\'s tranquil backwaters on a traditional houseboat.',
    location: 'Alleppey, Kerala',
    category: 'nature',
    duration: '8 hours',
    images: [
      'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
      'https://images.unsplash.com/photo-1508881598441-324f3974994b?w=800',
    ],
    basePrice: 4999,
    rating: 4.7,
    reviewCount: 521,
    highlights: [
      'Traditional Kerala lunch included',
      'Air-conditioned bedroom',
      'Experienced crew',
      'Scenic village views',
    ],
    included: [
      'Houseboat rental',
      'Welcome drinks',
      'Kerala style lunch',
      'Evening tea and snacks',
    ],
    notIncluded: [
      'Alcoholic beverages',
      'Personal expenses',
      'Transportation to departure point',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '11:00 AM',
        endTime: '07:00 PM',
        availableSpots: 6,
        totalSpots: 6,
        price: 4999,
      },
      {
        date: new Date('2025-11-07'),
        startTime: '11:00 AM',
        endTime: '07:00 PM',
        availableSpots: 6,
        totalSpots: 6,
        price: 4999,
      },
      {
        date: new Date('2025-11-09'),
        startTime: '11:00 AM',
        endTime: '07:00 PM',
        availableSpots: 6,
        totalSpots: 6,
        price: 4999,
      },
    ],
  },
  {
    title: 'Old Delhi Food Walking Tour',
    description: 'Embark on a culinary adventure through the bustling streets of Old Delhi. Sample over 10 different authentic dishes from legendary eateries and hidden gems. From savory chaat to sweet jalebis, experience the rich flavors that have made Delhi a food lover\'s paradise. Learn about the history and culture behind each dish from your local guide.',
    shortDescription: 'Taste authentic Delhi street food on a guided walking tour.',
    location: 'Old Delhi, Delhi',
    category: 'food',
    duration: '4 hours',
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=800',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ],
    basePrice: 1499,
    rating: 4.9,
    reviewCount: 1205,
    highlights: [
      'Visit 8-10 different food stops',
      'Local expert guide',
      'Small group size (max 8 people)',
      'Vegetarian options available',
    ],
    included: [
      'Food tastings',
      'Bottled water',
      'English-speaking guide',
      'Walking tour of Old Delhi',
    ],
    notIncluded: [
      'Hotel pickup',
      'Additional food and drinks',
      'Transportation',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '09:00 AM',
        endTime: '01:00 PM',
        availableSpots: 8,
        totalSpots: 8,
        price: 1499,
      },
      {
        date: new Date('2025-11-05'),
        startTime: '04:00 PM',
        endTime: '08:00 PM',
        availableSpots: 8,
        totalSpots: 8,
        price: 1499,
      },
      {
        date: new Date('2025-11-06'),
        startTime: '09:00 AM',
        endTime: '01:00 PM',
        availableSpots: 8,
        totalSpots: 8,
        price: 1499,
      },
      {
        date: new Date('2025-11-07'),
        startTime: '04:00 PM',
        endTime: '08:00 PM',
        availableSpots: 8,
        totalSpots: 8,
        price: 1499,
      },
    ],
  },
  {
    title: 'Taj Mahal Sunrise Tour',
    description: 'Witness the breathtaking beauty of the Taj Mahal at sunrise, when the monument glows in soft golden light and crowds are minimal. This UNESCO World Heritage site is one of the Seven Wonders of the World, and seeing it at dawn is truly a once-in-a-lifetime experience. Your expert guide will share fascinating stories and history of this symbol of love.',
    shortDescription: 'Visit the iconic Taj Mahal at sunrise with an expert guide.',
    location: 'Agra, Uttar Pradesh',
    category: 'sightseeing',
    duration: '5 hours',
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
      'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    ],
    basePrice: 2999,
    rating: 4.8,
    reviewCount: 2341,
    highlights: [
      'Skip-the-line entry tickets',
      'Professional historian guide',
      'Hotel pickup from Agra',
      'Best time to avoid crowds',
    ],
    included: [
      'Entry fees to Taj Mahal',
      'Expert guide',
      'Hotel pickup and drop-off',
      'Bottled water',
    ],
    notIncluded: [
      'Breakfast',
      'Personal expenses',
      'Tips and gratuities',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '05:30 AM',
        endTime: '10:30 AM',
        availableSpots: 15,
        totalSpots: 15,
        price: 2999,
      },
      {
        date: new Date('2025-11-06'),
        startTime: '05:30 AM',
        endTime: '10:30 AM',
        availableSpots: 15,
        totalSpots: 15,
        price: 2999,
      },
      {
        date: new Date('2025-11-08'),
        startTime: '05:30 AM',
        endTime: '10:30 AM',
        availableSpots: 15,
        totalSpots: 15,
        price: 2999,
      },
    ],
  },
  {
    title: 'Yoga & Meditation Retreat',
    description: 'Rejuvenate your mind, body, and soul with a full-day yoga and meditation retreat in the spiritual capital of Rishikesh. Set along the banks of the sacred Ganges River, this experience includes morning yoga sessions, guided meditation, pranayama (breathing exercises), and a vegetarian sattvic meal. Perfect for beginners and experienced practitioners alike.',
    shortDescription: 'Find inner peace with yoga and meditation by the Ganges.',
    location: 'Rishikesh, Uttarakhand',
    category: 'wellness',
    duration: '6 hours',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
    ],
    basePrice: 3499,
    rating: 4.9,
    reviewCount: 687,
    highlights: [
      'Certified yoga instructor',
      'Riverside location',
      'All equipment provided',
      'Organic vegetarian meal',
    ],
    included: [
      'Yoga and meditation sessions',
      'Yoga mat and props',
      'Healthy breakfast and lunch',
      'Herbal tea',
    ],
    notIncluded: [
      'Transportation',
      'Personal expenses',
      'Accommodation',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '07:00 AM',
        endTime: '01:00 PM',
        availableSpots: 12,
        totalSpots: 12,
        price: 3499,
      },
      {
        date: new Date('2025-11-07'),
        startTime: '07:00 AM',
        endTime: '01:00 PM',
        availableSpots: 12,
        totalSpots: 12,
        price: 3499,
      },
      {
        date: new Date('2025-11-09'),
        startTime: '07:00 AM',
        endTime: '01:00 PM',
        availableSpots: 12,
        totalSpots: 12,
        price: 3499,
      },
    ],
  },
  {
    title: 'Goa Beach Hopping & Water Sports',
    description: 'Explore the best beaches of North Goa in this action-packed adventure. Try thrilling water sports including parasailing, jet skiing, and banana boat rides. Visit famous beaches like Calangute, Baga, and Anjuna, with time to relax and soak in the sun. Perfect for groups and adventure enthusiasts looking for an adrenaline rush.',
    shortDescription: 'Enjoy water sports and explore beautiful Goa beaches.',
    location: 'North Goa, Goa',
    category: 'adventure',
    duration: '7 hours',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    ],
    basePrice: 5999,
    rating: 4.6,
    reviewCount: 892,
    highlights: [
      'Multiple water sports activities',
      'Visit 4-5 beaches',
      'Professional instructors',
      'Safety equipment provided',
    ],
    included: [
      'Water sports (3 activities)',
      'Life jackets and safety gear',
      'Transportation between beaches',
      'Guide',
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Meals and drinks',
      'Additional water sports',
      'Beach photographs',
    ],
    slots: [
      {
        date: new Date('2025-11-06'),
        startTime: '10:00 AM',
        endTime: '05:00 PM',
        availableSpots: 20,
        totalSpots: 20,
        price: 5999,
      },
      {
        date: new Date('2025-11-08'),
        startTime: '10:00 AM',
        endTime: '05:00 PM',
        availableSpots: 20,
        totalSpots: 20,
        price: 5999,
      },
      {
        date: new Date('2025-11-10'),
        startTime: '10:00 AM',
        endTime: '05:00 PM',
        availableSpots: 20,
        totalSpots: 20,
        price: 5999,
      },
    ],
  },
  {
    title: 'Udaipur Palace & Lake Tour',
    description: 'Discover the romance and grandeur of Udaipur, the City of Lakes. Visit the magnificent City Palace, cruise on Lake Pichola, and explore the beautiful Jagdish Temple. This tour combines history, architecture, and scenic beauty, offering a comprehensive experience of Rajasthan\'s most romantic city. Includes a traditional Rajasthani lunch with lake views.',
    shortDescription: 'Explore Udaipur\'s palaces and enjoy a scenic lake cruise.',
    location: 'Udaipur, Rajasthan',
    category: 'cultural',
    duration: '6 hours',
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
      'https://images.unsplash.com/photo-1577894947058-07751bae1db9?w=800',
    ],
    basePrice: 3999,
    rating: 4.7,
    reviewCount: 1034,
    highlights: [
      'City Palace guided tour',
      'Boat ride on Lake Pichola',
      'Visit Jagdish Temple',
      'Traditional Rajasthani lunch',
    ],
    included: [
      'All entry tickets',
      'English-speaking guide',
      'Boat ride',
      'Lunch at lakeside restaurant',
      'Air-conditioned vehicle',
    ],
    notIncluded: [
      'Hotel pickup (available at extra cost)',
      'Personal expenses',
      'Alcoholic beverages',
    ],
    slots: [
      {
        date: new Date('2025-11-05'),
        startTime: '10:00 AM',
        endTime: '04:00 PM',
        availableSpots: 12,
        totalSpots: 12,
        price: 3999,
      },
      {
        date: new Date('2025-11-07'),
        startTime: '10:00 AM',
        endTime: '04:00 PM',
        availableSpots: 12,
        totalSpots: 12,
        price: 3999,
      },
      {
        date: new Date('2025-11-09'),
        startTime: '10:00 AM',
        endTime: '04:00 PM',
        availableSpots: 12,
        totalSpots: 12,
        price: 3999,
      },
    ],
  },
  {
    title: 'Mumbai Street Photography Walk',
    description: 'Capture the vibrant energy of Mumbai through your lens on this guided photography walk. Explore colorful markets, historic architecture, and bustling street scenes in South Mumbai. Your professional photographer guide will provide tips on composition, lighting, and storytelling while navigating through iconic locations like Crawford Market, Kala Ghoda, and the Gateway of India.',
    shortDescription: 'Capture Mumbai\'s vibrant streets with a professional photographer.',
    location: 'Mumbai, Maharashtra',
    category: 'cultural',
    duration: '4 hours',
    images: [
      'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800',
      'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
    ],
    basePrice: 2499,
    rating: 4.8,
    reviewCount: 456,
    highlights: [
      'Professional photographer guide',
      'Small group (max 6 people)',
      'Photo editing tips',
      'Visit iconic locations',
    ],
    included: [
      'Photography guidance',
      'Walking tour',
      'Chai break',
      'Digital photography guide',
    ],
    notIncluded: [
      'Camera equipment',
      'Transportation',
      'Meals',
    ],
    slots: [
      {
        date: new Date('2025-11-06'),
        startTime: '06:00 AM',
        endTime: '10:00 AM',
        availableSpots: 6,
        totalSpots: 6,
        price: 2499,
      },
      {
        date: new Date('2025-11-08'),
        startTime: '06:00 AM',
        endTime: '10:00 AM',
        availableSpots: 6,
        totalSpots: 6,
        price: 2499,
      },
      {
        date: new Date('2025-11-10'),
        startTime: '06:00 AM',
        endTime: '10:00 AM',
        availableSpots: 6,
        totalSpots: 6,
        price: 2499,
      },
    ],
  },
];

const promoCodes = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 1000,
    maxDiscount: 500,
    isActive: true,
    expiryDate: new Date('2025-12-31'),
  },
  {
    code: 'FLAT100',
    discountType: 'fixed',
    discountValue: 100,
    minPurchase: 500,
    isActive: true,
    expiryDate: new Date('2025-12-31'),
  },
  {
    code: 'WELCOME15',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 2000,
    maxDiscount: 1000,
    isActive: true,
    expiryDate: new Date('2025-12-31'),
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB Connected');

    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    console.log('Existing data cleared');

    // Insert experiences
    await Experience.insertMany(experiences);
    console.log('Experiences seeded successfully');

    // Insert promo codes
    await PromoCode.insertMany(promoCodes);
    console.log('Promo codes seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
