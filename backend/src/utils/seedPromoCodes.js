import mongoose from 'mongoose';
import { config } from '../config/index.js';
import { PromoCode } from '../models/PromoCode.js';

const promoCodes = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 0,
    maxDiscount: 500,
    isActive: true,
    expiryDate: new Date('2026-12-31'),
  },
  {
    code: 'SAVE20',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 1000,
    maxDiscount: 1000,
    isActive: true,
    expiryDate: new Date('2026-12-31'),
  },
  {
    code: 'FLAT100',
    discountType: 'fixed',
    discountValue: 100,
    minPurchase: 500,
    maxDiscount: null,
    isActive: true,
    expiryDate: new Date('2026-12-31'),
  },
  {
    code: 'WELCOME',
    discountType: 'fixed',
    discountValue: 200,
    minPurchase: 0,
    maxDiscount: null,
    isActive: true,
    expiryDate: new Date('2026-12-31'),
  },
];

const seedPromoCodes = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB Connected');

    await PromoCode.deleteMany({});
    console.log('Existing promo codes cleared');

    await PromoCode.insertMany(promoCodes);
    console.log('Promo codes seeded successfully');

    console.log(`✅ Successfully seeded ${promoCodes.length} promo codes!`);
    console.log('\nAvailable Promo Codes:');
    promoCodes.forEach((promo) => {
      const discountText = promo.discountType === 'percentage'
        ? `${promo.discountValue}% off`
        : `₹${promo.discountValue} off`;
      console.log(`  - ${promo.code}: ${discountText} (Min purchase: ₹${promo.minPurchase})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding promo codes:', error);
    process.exit(1);
  }
};

seedPromoCodes();
