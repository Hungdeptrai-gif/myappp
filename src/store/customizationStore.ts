import { create } from 'zustand';
import { CustomizationStore, CustomizationState, OrderFormData, ShippingOption } from '../types';
import { characters, backgrounds, hairstyles, shippingOptions, BASE_PRICE } from '../data/products';
import { calculateDiscount } from '../data/discountCodes';

const initialState: CustomizationState = {
  character: characters[0],
  background: backgrounds[0],
  clothes: [],
  hairstyle: hairstyles[0],
  hat: null,
  accessories: [],
  pet: null,
  personalText: ''
};

const initialFormData: OrderFormData = {
  name: '',
  phone: '',
  address: '',
  note: '',
  discountCode: ''
};

const initialShippingOption: ShippingOption = shippingOptions[0];

// Only create the store on the client side
const createStore = () => {

  return create<CustomizationStore>((set) => ({
  currentStep: 1,
  customization: initialState,
  formData: initialFormData,
  discountCode: '',
  shippingOption: initialShippingOption,
  subtotal: BASE_PRICE,
  discount: 0,
  shipping: initialShippingOption.price,
  total: BASE_PRICE + initialShippingOption.price,

  setCurrentStep: (step) => set({ currentStep: step }),

  setCharacter: (character) => {
    set((state) => {
      const newCustomization = { ...state.customization, character };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  setBackground: (background) => {
    set((state) => {
      const newCustomization = { ...state.customization, background };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  addClothing: (clothing) => {
    set((state) => {
      const newClothes = [...state.customization.clothes, clothing];
      const newCustomization = { ...state.customization, clothes: newClothes };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  removeClothing: (clothingId) => {
    set((state) => {
      const newClothes = state.customization.clothes.filter(c => c.id !== clothingId);
      const newCustomization = { ...state.customization, clothes: newClothes };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  setHairstyle: (hairstyle) => {
    set((state) => {
      const newCustomization = { ...state.customization, hairstyle };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  setHat: (hat) => {
    set((state) => {
      const newCustomization = { ...state.customization, hat };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  addAccessory: (accessory) => {
    set((state) => {
      const newAccessories = [...state.customization.accessories, accessory];
      const newCustomization = { ...state.customization, accessories: newAccessories };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  removeAccessory: (accessoryId) => {
    set((state) => {
      const newAccessories = state.customization.accessories.filter(a => a.id !== accessoryId);
      const newCustomization = { ...state.customization, accessories: newAccessories };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  setPet: (pet) => {
    set((state) => {
      const newCustomization = { ...state.customization, pet };
      const newSubtotal = calculateSubtotal(newCustomization);
      const newDiscount = calculateDiscount(state.discountCode, newSubtotal);
      const newTotal = newSubtotal - newDiscount + state.shipping;
      
      return {
        customization: newCustomization,
        subtotal: newSubtotal,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  setPersonalText: (text) => {
    set((state) => ({
      customization: { ...state.customization, personalText: text }
    }));
  },

  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data }
    }));
  },

  setDiscountCode: (code) => {
    set((state) => {
      const newDiscount = calculateDiscount(code, state.subtotal);
      const newTotal = state.subtotal - newDiscount + state.shipping;
      
      return {
        discountCode: code,
        discount: newDiscount,
        total: newTotal
      };
    });
  },

  setShippingOption: (option) => {
    set((state) => {
      const newShipping = option.price;
      const newTotal = state.subtotal - state.discount + newShipping;
      
      return {
        shippingOption: option,
        shipping: newShipping,
        total: newTotal
      };
    });
  },

  reset: () => set({
    currentStep: 1,
    customization: initialState,
    formData: initialFormData,
    discountCode: '',
    shippingOption: initialShippingOption,
    subtotal: BASE_PRICE,
    discount: 0,
    shipping: initialShippingOption.price,
    total: BASE_PRICE + initialShippingOption.price
  })
}));
};

// Create a client-side only store
let store: ReturnType<typeof createStore> | null = null;

export const useCustomizationStore = () => {
  if (typeof window === 'undefined') {
    // Return a mock store for SSR
    return {
      currentStep: 1,
      customization: initialState,
      formData: initialFormData,
      discountCode: '',
      shippingOption: initialShippingOption,
      subtotal: BASE_PRICE,
      discount: 0,
      shipping: initialShippingOption.price,
      total: BASE_PRICE + initialShippingOption.price,
      setCurrentStep: () => {},
      setCharacter: () => {},
      setBackground: () => {},
      addClothing: () => {},
      removeClothing: () => {},
      setHairstyle: () => {},
      setHat: () => {},
      addAccessory: () => {},
      removeAccessory: () => {},
      setPet: () => {},
      setPersonalText: () => {},
      setFormData: () => {},
      setDiscountCode: () => {},
      setShippingOption: () => {},
      reset: () => {}
    } as CustomizationStore;
  }

  if (!store) {
    store = createStore();
  }

  return store();
};

function calculateSubtotal(customization: CustomizationState): number {
  let total = BASE_PRICE;
  
  if (customization.character) total += customization.character.price;
  if (customization.background) total += customization.background.price;
  if (customization.hairstyle) total += customization.hairstyle.price;
  if (customization.hat) total += customization.hat.price;
  if (customization.pet) total += customization.pet.price;
  
  customization.clothes.forEach(item => total += item.price);
  customization.accessories.forEach(item => total += item.price);
  
  return total;
}
