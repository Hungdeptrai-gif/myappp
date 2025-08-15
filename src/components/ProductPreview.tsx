import React from 'react';
import styled from 'styled-components';
import { useCustomizationStore } from '../store/customizationStore';

const PreviewArea = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 16px 30px rgba(2, 6, 23, 0.08);
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PreviewTitle = styled.h3`
  color: #111827;
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const PreviewFrame = styled.div`
  width: 320px;
  height: 320px;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  position: relative;
  overflow: hidden;
  background: #f1f5f9;
  margin-bottom: 0.75rem;
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
  background: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 700;
  color: #111827;
  z-index: 4;
  max-width: 80%;
  word-wrap: break-word;
`;

const PlaceholderText = styled.p`
  color: #94a3b8;
  font-size: 1rem;
  margin: 0;
`;

const PriceDisplay = styled.div`
  background: #111827;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const VND_RATE = 1000;
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(Math.round(price * VND_RATE));
};

const ProductPreview: React.FC = () => {
  const { customization, total } = useCustomizationStore();

  const hasCustomization = customization.character || customization.background;

  if (!hasCustomization) {
    return (
      <PreviewArea>
        <PreviewTitle>Live Preview</PreviewTitle>
        <PreviewFrame>
          <PlaceholderText>Choose options to see your gift here</PlaceholderText>
        </PreviewFrame>
        <PriceDisplay>{formatPrice(total)}</PriceDisplay>
      </PreviewArea>
    );
  }

  return (
    <PreviewArea>
      <PreviewTitle>Live Preview</PreviewTitle>
      <PreviewFrame>
        {customization.background && (
          <BackgroundLayer image={customization.background.image} />
        )}
        {customization.character && (
          <CharacterLayer image={customization.character.image} />
        )}
        {customization.accessories.map((acc, index) => (
          <AccessoryLayer key={acc.id + index} image={acc.image} />
        ))}
        {customization.pet && (
          <AccessoryLayer image={customization.pet.image} top="70%" left="70%" />
        )}
        {customization.personalText && (
          <TextLayer>{customization.personalText}</TextLayer>
        )}
      </PreviewFrame>
      <PriceDisplay>{formatPrice(total)}</PriceDisplay>
    </PreviewArea>
  );
};

export default ProductPreview;
