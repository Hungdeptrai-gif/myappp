import React from 'react';
import styled from 'styled-components';
import { useCustomizationStore } from '../store/customizationStore';

interface SuccessModalProps {
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  animation: scaleIn 0.3s ease-out;
  
  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  color: white;
`;

const ModalTitle = styled.h2`
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
`;

const ModalSubtitle = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const OrderSummary = styled.div`
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const SummaryTitle = styled.h4`
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 0.5rem;
`;

const CustomizationDetails = styled.div`
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SocialSection = styled.div`
  margin-bottom: 2rem;
`;

const SocialTitle = styled.h4`
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ZaloButton = styled(SocialButton)`
  background: #0068ff;
  color: white;
`;

const FacebookButton = styled(SocialButton)`
  background: #1877f2;
  color: white;
`;

const InstagramButton = styled(SocialButton)`
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

const ContactTitle = styled.h4`
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const ContactText = styled.p`
  color: #6b7280;
  margin: 0.5rem 0;
  font-size: 0.875rem;
`;

const CloseButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #4f46e5;
  }
`;

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  const { customization, total } = useCustomizationStore();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <SuccessIcon>🎉</SuccessIcon>
        
        <ModalTitle>Order Submitted Successfully!</ModalTitle>
        <ModalSubtitle>
          Thank you for your order. We&apos;ll start processing it right away!
        </ModalSubtitle>
        
        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <CustomizationDetails>
            {customization.character && (
              <DetailItem>
                <span>Character:</span>
                <span>{customization.character.name}</span>
              </DetailItem>
            )}
            
            {customization.background && (
              <DetailItem>
                <span>Background:</span>
                <span>{customization.background.name}</span>
              </DetailItem>
            )}
            
            {customization.hairstyle && (
              <DetailItem>
                <span>Hairstyle:</span>
                <span>{customization.hairstyle.name}</span>
              </DetailItem>
            )}
            
            {customization.hat && (
              <DetailItem>
                <span>Hat:</span>
                <span>{customization.hat.name}</span>
              </DetailItem>
            )}
            
            {customization.clothes.length > 0 && (
              <DetailItem>
                <span>Clothes:</span>
                <span>{customization.clothes.map(c => c.name).join(', ')}</span>
              </DetailItem>
            )}
            
            {customization.accessories.length > 0 && (
              <DetailItem>
                <span>Accessories:</span>
                <span>{customization.accessories.map(a => a.name).join(', ')}</span>
              </DetailItem>
            )}
            
            {customization.pet && (
              <DetailItem>
                <span>Pet:</span>
                <span>{customization.pet.name}</span>
              </DetailItem>
            )}
            
            {customization.personalText && (
              <DetailItem>
                <span>Personal Text:</span>
                <span>{customization.personalText}</span>
              </DetailItem>
            )}
          </CustomizationDetails>
          
          <SummaryTotal>
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </SummaryTotal>
        </OrderSummary>
        
        <SocialSection>
          <SocialTitle>Follow Us & Get Updates</SocialTitle>
          <SocialButtons>
            <ZaloButton href="https://zalo.me/your-zalo-id" target="_blank" rel="noopener noreferrer">
              📱 Zalo
            </ZaloButton>
            <FacebookButton href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer">
              📘 Facebook
            </FacebookButton>
            <InstagramButton href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
              📷 Instagram
            </InstagramButton>
          </SocialButtons>
        </SocialSection>
        
        <ContactInfo>
          <ContactTitle>Need Help?</ContactTitle>
          <ContactText>📧 Email: support@theluvingifts.com</ContactText>
          <ContactText>📞 Phone: +84 123 456 789</ContactText>
          <ContactText>⏰ Hours: Mon-Fri 9AM-6PM (GMT+7)</ContactText>
        </ContactInfo>
        
        <CloseButton onClick={onClose}>
          Close
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal;
