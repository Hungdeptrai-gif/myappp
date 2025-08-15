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
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  color: #111827;
  margin-bottom: 0.5rem;
`;

const ModalSubtitle = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
`;

const OrderSummary = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: left;
  margin: 1rem 0;
`;

const SummaryTitle = styled.h3`
  color: #111827;
  margin-bottom: 0.75rem;
  font-size: 1rem;
`;

const SummaryTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  font-weight: 700;
`;

const CustomizationDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const SocialSection = styled.div`
  margin-top: 1rem;
`;

const SocialTitle = styled.h4`
  color: #111827;
  margin-bottom: 0.5rem;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
`;

const ZaloButton = styled(SocialButton)`
  background: #0a7cff;
  color: white;
`;

const FacebookButton = styled(SocialButton)`
  background: #1877f2;
  color: white;
`;

const InstagramButton = styled(SocialButton)`
  background: #e1306c;
  color: white;
`;

const ContactInfo = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: left;
  margin-top: 1rem;
`;

const ContactTitle = styled.h4`
  color: #111827;
  margin-bottom: 0.5rem;
`;

const ContactText = styled.p`
  color: #374151;
  margin: 0.25rem 0;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #4f46e5;
  }
`;

const VND_RATE = 1000;
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(Math.round(price * VND_RATE));
};

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  const { customization, total } = useCustomizationStore();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <SuccessIcon>🎉</SuccessIcon>
        
        <ModalTitle>Đặt hàng thành công!</ModalTitle>
        <ModalSubtitle>
          Cảm ơn bạn. Chúng tôi sẽ xử lý đơn hàng ngay lập tức!
        </ModalSubtitle>
        
        <OrderSummary>
          <SummaryTitle>Tóm tắt đơn hàng</SummaryTitle>
          
          <CustomizationDetails>
            {customization.character && (
              <DetailItem>
                <span>Nhân vật:</span>
                <span>{customization.character.name}</span>
              </DetailItem>
            )}
            
            {customization.background && (
              <DetailItem>
                <span>Phông nền:</span>
                <span>{customization.background.name}</span>
              </DetailItem>
            )}
            
            {customization.hairstyle && (
              <DetailItem>
                <span>Kiểu tóc:</span>
                <span>{customization.hairstyle.name}</span>
              </DetailItem>
            )}
            
            {customization.hat && (
              <DetailItem>
                <span>Mũ:</span>
                <span>{customization.hat.name}</span>
              </DetailItem>
            )}
            
            {customization.clothes.length > 0 && (
              <DetailItem>
                <span>Quần áo:</span>
                <span>{customization.clothes.map(c => c.name).join(', ')}</span>
              </DetailItem>
            )}
            
            {customization.accessories.length > 0 && (
              <DetailItem>
                <span>Phụ kiện:</span>
                <span>{customization.accessories.map(a => a.name).join(', ')}</span>
              </DetailItem>
            )}
            
            {customization.pet && (
              <DetailItem>
                <span>Thú cưng:</span>
                <span>{customization.pet.name}</span>
              </DetailItem>
            )}
            
            {customization.personalText && (
              <DetailItem>
                <span>Lời nhắn:</span>
                <span>{customization.personalText}</span>
              </DetailItem>
            )}
          </CustomizationDetails>
          
          <SummaryTotal>
            <span>Tổng cộng:</span>
            <span>{formatPrice(total)}</span>
          </SummaryTotal>
        </OrderSummary>
        
        <SocialSection>
          <SocialTitle>Theo dõi chúng tôi</SocialTitle>
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
          <ContactTitle>Cần hỗ trợ?</ContactTitle>
          <ContactText>📧 Email: support@theluvingifts.com</ContactText>
          <ContactText>📞 Điện thoại: +84 123 456 789</ContactText>
          <ContactText>⏰ Thời gian: Thứ 2 - Thứ 6, 9:00 - 18:00 (GMT+7)</ContactText>
        </ContactInfo>
        
        <CloseButton onClick={onClose}>
          Đóng
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal;
