import { Character, Background, Clothing, Hairstyle, Hat, Accessory, Pet, ShippingOption } from '../types';

export const BASE_PRICE = 25;

export const characters: Character[] = [
  { id: 'char1', name: 'Cute Girl', image: '/images/characters/cute-girl.png', price: 0 },
  { id: 'char2', name: 'Handsome Boy', image: '/images/characters/handsome-boy.png', price: 0 },
  { id: 'char3', name: 'Baby', image: '/images/characters/baby.png', price: 0 },
  { id: 'char4', name: 'Elder', image: '/images/characters/elder.png', price: 0 },
  { id: 'char5', name: 'Couple', image: '/images/characters/couple.png', price: 5 }
];

export const backgrounds: Background[] = [
  { id: 'bg1', name: 'Beach', image: '/images/backgrounds/beach.png', price: 0 },
  { id: 'bg2', name: 'Mountain', image: '/images/backgrounds/mountain.png', price: 0 },
  { id: 'bg3', name: 'City', image: '/images/backgrounds/city.png', price: 0 },
  { id: 'bg4', name: 'Garden', image: '/images/backgrounds/garden.png', price: 0 },
  { id: 'bg5', name: 'Space', image: '/images/backgrounds/space.png', price: 3 }
];

export const clothes: Clothing[] = [
  { id: 'cloth1', name: 'Casual T-Shirt', image: '/images/clothes/casual-tshirt.png', price: 2, category: 'top' },
  { id: 'cloth2', name: 'Dress', image: '/images/clothes/dress.png', price: 4, category: 'dress' },
  { id: 'cloth3', name: 'Jeans', image: '/images/clothes/jeans.png', price: 3, category: 'bottom' },
  { id: 'cloth4', name: 'Suit', image: '/images/clothes/suit.png', price: 6, category: 'formal' },
  { id: 'cloth5', name: 'Winter Coat', image: '/images/clothes/winter-coat.png', price: 5, category: 'outerwear' }
];

export const hairstyles: Hairstyle[] = [
  { id: 'hair1', name: 'Short Hair', image: '/images/hairstyles/short-hair.png', price: 0 },
  { id: 'hair2', name: 'Long Hair', image: '/images/hairstyles/long-hair.png', price: 0 },
  { id: 'hair3', name: 'Curly Hair', image: '/images/hairstyles/curly-hair.png', price: 2 },
  { id: 'hair4', name: 'Ponytail', image: '/images/hairstyles/ponytail.png', price: 1 },
  { id: 'hair5', name: 'Braids', image: '/images/hairstyles/braids.png', price: 2 }
];

export const hats: Hat[] = [
  { id: 'hat1', name: 'Baseball Cap', image: '/images/hats/baseball-cap.png', price: 2 },
  { id: 'hat2', name: 'Beanie', image: '/images/hats/beanie.png', price: 2 },
  { id: 'hat3', name: 'Sun Hat', image: '/images/hats/sun-hat.png', price: 3 },
  { id: 'hat4', name: 'Party Hat', image: '/images/hats/party-hat.png', price: 1 },
  { id: 'hat5', name: 'Crown', image: '/images/hats/crown.png', price: 5 }
];

export const accessories: Accessory[] = [
  { id: 'acc1', name: 'Glasses', image: '/images/accessories/glasses.png', price: 2, category: 'face' },
  { id: 'acc2', name: 'Necklace', image: '/images/accessories/necklace.png', price: 3, category: 'neck' },
  { id: 'acc3', name: 'Watch', image: '/images/accessories/watch.png', price: 4, category: 'wrist' },
  { id: 'acc4', name: 'Earrings', image: '/images/accessories/earrings.png', price: 2, category: 'ears' },
  { id: 'acc5', name: 'Bracelet', image: '/images/accessories/bracelet.png', price: 2, category: 'wrist' }
];

export const pets: Pet[] = [
  { id: 'pet1', name: 'Dog', image: '/images/pets/dog.png', price: 3 },
  { id: 'pet2', name: 'Cat', image: '/images/pets/cat.png', price: 3 },
  { id: 'pet3', name: 'Bird', image: '/images/pets/bird.png', price: 2 },
  { id: 'pet4', name: 'Fish', image: '/images/pets/fish.png', price: 1 },
  { id: 'pet5', name: 'Rabbit', image: '/images/pets/rabbit.png', price: 2 }
];

export const shippingOptions: ShippingOption[] = [
  { id: 'standard', name: 'Standard Shipping', price: 5, description: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 10, description: '2-3 business days' },
  { id: 'overnight', name: 'Overnight', price: 20, description: 'Next business day' }
];
