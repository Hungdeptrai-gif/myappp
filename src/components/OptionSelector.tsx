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
  border: 2px solid ${props => props.selected ? '#6366f1' : '#e5e7eb'};
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#f0f4ff' : 'white'};
  
  &:hover {
    border-color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
  }
`;

const OptionImage = styled.div<{ image: string }>`
  width: 60px;
  height: 60px;
  margin: 0 auto 0.5rem;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const OptionName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin: 0 0 0.25rem 0;
`;

const OptionPrice = styled.p`
  font-size: 0.75rem;
  color: #6366f1;
  font-weight: 600;
  margin: 0;
`;

const MultiSelectContainer = styled.div`
  margin-top: 1rem;
`;

const MultiSelectTitle = styled.h4`
  font-size: 1rem;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const SelectedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SelectedItem = styled.div`
  background: #6366f1;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0;
  
  &:hover {
    opacity: 0.8;
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-top: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const formatPrice = (price: number): string => {
  if (price === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const OptionSelector: React.FC<OptionSelectorProps> = ({ step }) => {
  const { 
    customization, 
    setCharacter, 
    setBackground, 
    addClothing, 
    removeClothing,
    setHairstyle, 
    setHat, 
    addAccessory, 
    removeAccessory,
    setPet, 
    setPersonalText 
  } = useCustomizationStore();

  const isSelected = (type: string, id: string): boolean => {
    switch (type) {
      case 'character':
        return customization.character?.id === id;
      case 'background':
        return customization.background?.id === id;
      case 'hairstyle':
        return customization.hairstyle?.id === id;
      case 'hat':
        return customization.hat?.id === id;
      case 'pet':
        return customization.pet?.id === id;
      default:
        return false;
    }
  };

  const handleOptionClick = (type: string, item: Character | Background | Hairstyle | Hat | Pet) => {
    switch (type) {
      case 'character':
        setCharacter(item);
        break;
      case 'background':
        setBackground(item);
        break;
      case 'hairstyle':
        setHairstyle(item);
        break;
      case 'hat':
        setHat(item);
        break;
      case 'pet':
        setPet(item);
        break;
    }
  };

  const renderSingleOptions = <T extends Character | Background | Hairstyle | Hat | Pet>(
    type: string, 
    items: T[]
  ) => {
    return (
      <OptionsGrid>
        {items.map((item) => (
          <OptionCard
            key={item.id}
            selected={isSelected(type, item.id)}
            onClick={() => handleOptionClick(type, item)}
          >
            <OptionImage image={item.image} />
            <OptionName>{item.name}</OptionName>
            <OptionPrice>{formatPrice(item.price)}</OptionPrice>
          </OptionCard>
        ))}
      </OptionsGrid>
    );
  };

  const renderMultiSelectOptions = <T extends Clothing | Accessory>(
    type: string, 
    items: T[]
  ) => {
    const isClothes = type === 'clothes';
    const selectedItems = isClothes ? customization.clothes : customization.accessories;
    const addItem = isClothes ? addClothing : addAccessory;
    const removeItem = isClothes ? removeClothing : removeAccessory;

    return (
      <MultiSelectContainer>
        <MultiSelectTitle>Select {type}</MultiSelectTitle>
        <OptionsGrid>
          {items.map((item) => (
            <OptionCard
              key={item.id}
              selected={false}
              onClick={() => addItem(item)}
            >
              <OptionImage image={item.image} />
              <OptionName>{item.name}</OptionName>
              <OptionPrice>{formatPrice(item.price)}</OptionPrice>
            </OptionCard>
          ))}
        </OptionsGrid>
        
        <SelectedItems>
          {selectedItems.map((item) => (
            <SelectedItem key={item.id}>
              {item.name}
              <RemoveButton
                onClick={() => removeItem(item.id)}
              >
                ×
              </RemoveButton>
            </SelectedItem>
          ))}
        </SelectedItems>
      </MultiSelectContainer>
    );
  };

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
