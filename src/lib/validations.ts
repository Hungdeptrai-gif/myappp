import { z } from 'zod';

export const orderFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters').max(200, 'Address must be less than 200 characters'),
  note: z.string().max(500, 'Note must be less than 500 characters').optional(),
  discountCode: z.string().max(20, 'Discount code must be less than 20 characters').optional()
});

export const discountCodeSchema = z.object({
  code: z.string().min(1, 'Discount code is required').max(20, 'Discount code must be less than 20 characters')
});

export const personalizationSchema = z.object({
  text: z.string().min(1, 'Personalized text is required').max(100, 'Text must be less than 100 characters')
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
export type DiscountCodeData = z.infer<typeof discountCodeSchema>;
export type PersonalizationData = z.infer<typeof personalizationSchema>;
