import React from 'react';
import styled from 'styled-components';
import { useCustomizationStore } from '../store/customizationStore';
import { 
  characters, backgrounds, clothes, hairstyles, hats, 
  accessories, pets
} from '../data/products';
import { Character, Background, Hairstyle, Hat, Pet, Clothing, Accessory } from '../types';

interface OptionSelectorProps {
  step: number;
}

const Container = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StepTitle = styled.h3`
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  text-align: center;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const OptionCard = styled.div<{ selected: boolean }>`
  border: 2px solid ${props => props.selected ? '#111827' : '#e5e7eb'};
  border-radius: 0.75rem;
  padding: 0.75rem 0.75rem 0.875rem 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#0f172a' : 'white'};
  color: ${props => props.selected ? 'white' : '#111827'};
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: #111827;
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(2, 6, 23, 0.08);
  }
`;

const OptionImage = styled.div<{ image: string }>`
  width: 64px;
  height: 64px;
  margin: 0 auto 0.5rem;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const PriceBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #111827;
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  font-weight: 700;
`;

const SelectedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SelectedItem = styled.span`
  background: #eef2ff;
  color: #111827;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  border: 1px solid #c7d2fe;
`;

const RemoveButton = styled.button`
  margin-left: 0.5rem;
  background: transparent;
  color: #ef4444;
`;

const MultiSelectContainer = styled.div`
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 0.75rem;
  padding: 0.75rem;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const formatPrice = (price: number): string => {
  if (price === 0) return 'Free';
  return `+$${price}`;
};

const OptionSelector: React.FC<OptionSelectorProps> = ({ step }) => {
  const { 
    customization, 
    setCharacter, setBackground, setHairstyle, setHat, setPet,
    addClothing, removeClothing, addAccessory, removeAccessory,
    setPersonalText
  } = useCustomizationStore();

  type OptionRenderable = { id: string; name: string; image: string; price: number };
  const renderOption = (
    item: OptionRenderable,
    selected: boolean,
    onClick: () => void
  ) => (
    <OptionCard key={item.id} selected={selected} onClick={onClick}>
      <PriceBadge>{formatPrice(item.price)}</PriceBadge>
      <OptionImage image={item.image} />
      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.name}</div>
    </OptionCard>
  );

  const renderSingleOptions = (
    type: 'character' | 'background' | 'hairstyle' | 'hat' | 'pet',
    items: (Character | Background | Hairstyle | Hat | Pet)[]
  ) => (
    <OptionsGrid>
      {items.map((item) => {
        const isSelected = 
          (type === 'character' && customization.character?.id === item.id) ||
          (type === 'background' && customization.background?.id === item.id) ||
          (type === 'hairstyle' && customization.hairstyle?.id === item.id) ||
          (type === 'hat' && customization.hat?.id === item.id) ||
          (type === 'pet' && customization.pet?.id === item.id);
        const clickHandler = () => {
          if (type === 'character') setCharacter(item as Character);
          if (type === 'background') setBackground(item as Background);
          if (type === 'hairstyle') setHairstyle(item as Hairstyle);
          if (type === 'hat') setHat(item as Hat);
          if (type === 'pet') setPet(item as Pet);
        };
        return renderOption(item as OptionRenderable, isSelected, clickHandler);
      })}
    </OptionsGrid>
  );

  const renderMultiSelectOptions = (
    type: 'clothes' | 'accessories',
    items: (Clothing | Accessory)[]
  ) => (
    <>
      <OptionsGrid>
        {items.map((item) => {
          const isSelected =
            (type === 'clothes' && customization.clothes.some(c => c.id === item.id)) ||
            (type === 'accessories' && customization.accessories.some(a => a.id === item.id));
          const clickHandler = () => {
            if (isSelected) {
              if (type === 'clothes') removeClothing(item.id);
              if (type === 'accessories') removeAccessory(item.id);
            } else {
              if (type === 'clothes') addClothing(item as Clothing);
              if (type === 'accessories') addAccessory(item as Accessory);
            }
          };
          return renderOption(item as OptionRenderable, isSelected, clickHandler);
        })}
      </OptionsGrid>
      <SelectedItems>
        {(type === 'clothes' ? customization.clothes : customization.accessories).map(item => (
          <SelectedItem key={item.id}>
            {item.name}
            <RemoveButton
              onClick={() => (type === 'clothes' ? removeClothing(item.id) : removeAccessory(item.id))}
            >
              ×
            </RemoveButton>
          </SelectedItem>
        ))}
      </SelectedItems>
    </>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <StepTitle>Choose Your Character</StepTitle>
            {renderSingleOptions('character', characters)}
          </>
        );
      
      case 2:
        return (
          <>
            <StepTitle>Select Background</StepTitle>
            {renderSingleOptions('background', backgrounds)}
          </>
        );
      
      case 3:
        return (
          <>
            <StepTitle>Style Your Character</StepTitle>
            {renderSingleOptions('hairstyle', hairstyles)}
            {renderSingleOptions('hat', hats)}
            {renderMultiSelectOptions('clothes', clothes)}
            {renderMultiSelectOptions('accessories', accessories)}
            {renderSingleOptions('pet', pets)}
          </>
        );
      
      case 4:
        return (
          <>
            <StepTitle>Add Personal Touch</StepTitle>
            <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
              Add a name or personal message to your gift
            </p>
            <TextInput
              type="text"
              placeholder="Enter your message here..."
              value={customization.personalText}
              onChange={(e) => setPersonalText(e.target.value)}
              maxLength={100}
            />
          </>
        );
      
      default:
        return <StepTitle>Select Options</StepTitle>;
    }
  };

  return (
    <Container>
      {renderStep()}
    </Container>
  );
};

export default OptionSelector;
