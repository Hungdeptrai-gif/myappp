import { DiscountCode } from '../types';

export const discountCodes: DiscountCode[] = [
  { code: 'WELCOME10', discount: 10, maxDiscount: 15, description: '10% off your first order', valid: true },
  { code: 'SAVE20', discount: 20, maxDiscount: 25, description: '20% off orders over $50', valid: true },
  { code: 'FREESHIP', discount: 0, maxDiscount: 10, description: 'Free shipping on orders over $100', valid: true },
  { code: 'HOLIDAY25', discount: 25, maxDiscount: 30, description: '25% off holiday special', valid: true }
];

export const validateDiscountCode = (code: string): DiscountCode | null => {
  const discountCode = discountCodes.find(dc => dc.code === code.toUpperCase());
  return discountCode && discountCode.valid ? discountCode : null;
};

export const calculateDiscount = (code: string, subtotal: number): number => {
  const discountCode = validateDiscountCode(code);
  if (!discountCode) return 0;
  
  const discountAmount = (subtotal * discountCode.discount) / 100;
  return Math.min(discountAmount, discountCode.maxDiscount);
};
