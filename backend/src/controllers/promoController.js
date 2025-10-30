import { PromoCode } from '../models/PromoCode.js';

// Validate promo code
export const validatePromoCode = async (req, res) => {
  try {
    const { code, amount } = req.body;

    if (!code || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Code and amount are required',
      });
    }

    const promoCode = await PromoCode.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or inactive promo code',
      });
    }

    // Check expiry
    if (promoCode.expiryDate && new Date() > promoCode.expiryDate) {
      return res.status(400).json({
        success: false,
        message: 'Promo code has expired',
      });
    }

    // Check minimum purchase
    if (amount < promoCode.minPurchase) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase of ₹${promoCode.minPurchase} required`,
      });
    }

    // Calculate discount
    let discount = 0;
    if (promoCode.discountType === 'percentage') {
      discount = (amount * promoCode.discountValue) / 100;
      if (promoCode.maxDiscount && discount > promoCode.maxDiscount) {
        discount = promoCode.maxDiscount;
      }
    } else {
      discount = promoCode.discountValue;
    }

    const finalAmount = amount - discount;

    res.status(200).json({
      success: true,
      data: {
        code: promoCode.code,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue,
        discount: discount,
        finalAmount: finalAmount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
