import React from 'react';
import styled from 'styled-components';
import { useCustomizationStore } from '../store/customizationStore';

const PreviewArea = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PreviewTitle = styled.h3`
  color: #374151;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const PreviewFrame = styled.div`
  width: 300px;
  height: 300px;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  position: relative;
  overflow: hidden;
  background: #f9fafb;
  margin-bottom: 1rem;
`;

const BackgroundLayer = styled.div<{ image: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

const CharacterLayer = styled.div<{ image: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 2;
`;

const AccessoryLayer = styled.div<{ image: string; top?: string; left?: string }>`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 3;
`;

const TextLayer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  color: #374151;
  z-index: 4;
  max-width: 80%;
  word-wrap: break-word;
`;

const PlaceholderText = styled.p`
  color: #9ca3af;
  font-size: 1.1rem;
  margin: 0;
`;

const PriceDisplay = styled.div`
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const ProductPreview: React.FC = () => {
  const { customization, total } = useCustomizationStore();

  const hasCustomization = customization.character || customization.background;

  if (!hasCustomization) {
    return (
      <PreviewArea>
        <PreviewTitle>Product Preview</PreviewTitle>
        <PlaceholderText>Start customizing to see your product here!</PlaceholderText>
      </PreviewArea>
    );
  }

  return (
    <PreviewArea>
      <PreviewTitle>Your Custom Product</PreviewTitle>
      
      <PreviewFrame>
        {customization.background && (
          <BackgroundLayer image={customization.background.image} />
        )}
        
        {customization.character && (
          <CharacterLayer image={customization.character.image} />
        )}
        
        {customization.hairstyle && (
          <AccessoryLayer 
            image={customization.hairstyle.image} 
            top="30%" 
            left="50%" 
          />
        )}
        
        {customization.hat && (
          <AccessoryLayer 
            image={customization.hat.image} 
            top="20%" 
            left="50%" 
          />
        )}
        
        {customization.clothes.map((clothing) => (
          <AccessoryLayer 
            key={clothing.id}
            image={clothing.image} 
            top="50%" 
            left="50%" 
          />
        ))}
        
        {customization.accessories.map((accessory) => (
          <AccessoryLayer 
            key={accessory.id}
            image={accessory.image} 
            top="40%" 
            left="50%" 
          />
        ))}
        
        {customization.pet && (
          <AccessoryLayer 
            image={customization.pet.image} 
            top="70%" 
            left="80%" 
          />
        )}
        
        {customization.personalText && (
          <TextLayer>
            {customization.personalText}
          </TextLayer>
        )}
      </PreviewFrame>
      
      <PriceDisplay>
        Total: {formatPrice(total)}
      </PriceDisplay>
    </PreviewArea>
  );
};

export default ProductPreview;
