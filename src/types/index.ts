export interface Character {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface Background {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface Clothing {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

export interface Hairstyle {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface Hat {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface Accessory {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

export interface Pet {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface DiscountCode {
  code: string;
  discount: number;
  maxDiscount: number;
  description: string;
  valid: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CustomizationState {
  character: Character | null;
  background: Background | null;
  clothes: Clothing[];
  hairstyle: Hairstyle | null;
  hat: Hat | null;
  accessories: Accessory[];
  pet: Pet | null;
  personalText: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  note: string;
  discountCode: string;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export interface CustomizationStore {
  currentStep: number;
  customization: CustomizationState;
  formData: OrderFormData;
  discountCode: string;
  shippingOption: ShippingOption;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  setCurrentStep: (step: number) => void;
  setCharacter: (character: Character) => void;
  setBackground: (background: Background) => void;
  addClothing: (clothing: Clothing) => void;
  removeClothing: (clothingId: string) => void;
  setHairstyle: (hairstyle: Hairstyle) => void;
  setHat: (hat: Hat) => void;
  addAccessory: (accessory: Accessory) => void;
  removeAccessory: (accessoryId: string) => void;
  setPet: (pet: Pet) => void;
  setPersonalText: (text: string) => void;
  setFormData: (data: Partial<OrderFormData>) => void;
  setDiscountCode: (code: string) => void;
  setShippingOption: (option: ShippingOption) => void;
  reset: () => void;
}

export interface OrderRequest {
  customization: CustomizationState;
  formData: OrderFormData;
  discountCode: string;
  shippingOption: ShippingOption;
  orderSummary: OrderSummary;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
}

export type Step = 1 | 2 | 3 | 4 | 5;
