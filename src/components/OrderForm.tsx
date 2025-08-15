import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderFormSchema, OrderFormData } from '../lib/validations';
import { useCustomizationStore } from '../store/customizationStore';
import { shippingOptions } from '../data/products';
import { validateDiscountCode, calculateDiscount } from '../data/discountCodes';

interface OrderFormProps {
  onSuccess: () => void;
}

const FormGrid = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  color: #374151;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
`;

const FormInput = styled.input`
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
  
  &.error {
    border-color: #ef4444;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &.error {
    border-color: #ef4444;
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const DiscountSection = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const DiscountInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const DiscountButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #4f46e5;
  }
`;

const DiscountMessage = styled.div<{ type: 'success' | 'error' | 'info' }>`
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.type === 'error' ? '#991b1b' : props.type === 'success' ? '#065f46' : '#1f2937'};
  background: ${props => props.type === 'error' ? '#fee2e2' : props.type === 'success' ? '#dcfce7' : '#f3f4f6'};
  border: 1px solid ${props => props.type === 'error' ? '#fecaca' : props.type === 'success' ? '#bbf7d0' : '#e5e7eb'};
`;

const ShippingSection = styled.div`
  margin-top: 1.5rem;
`;

const ShippingTitle = styled.h4`
  color: #374151;
  margin-bottom: 0.75rem;
`;

const ShippingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ShippingOption = styled.label<{ selected: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 2px solid ${p => p.selected ? '#111827' : '#e5e7eb'};
  background: ${p => p.selected ? '#0f172a' : 'white'};
  color: ${p => p.selected ? 'white' : '#111827'};
`;

const ShippingRadio = styled.input`
  accent-color: #111827;
`;

const ShippingInfo = styled.div``;

const ShippingName = styled.div`
  font-weight: 700;
`;

const ShippingDescription = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const ShippingPrice = styled.div`
  font-weight: 700;
`;

const OrderSummary = styled.div`
  margin-top: 1rem;
  border-top: 1px dashed #e5e7eb;
  padding-top: 1rem;
`;

const SummaryTitle = styled.h4`
  color: #111827;
  margin-bottom: 0.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #059669;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
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

const OrderForm: React.FC<OrderFormProps> = ({ onSuccess }) => {
  const [discountMessage, setDiscountMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const { 
    formData, 
    setFormData, 
    discountCode, 
    setDiscountCode,
    shippingOption, 
    setShippingOption,
    subtotal, 
    discount, 
    shipping, 
    total 
  } = useCustomizationStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: formData
  });

  const handleDiscountCode = () => {
    if (!discountCode.trim()) {
      setDiscountMessage({ type: 'error', text: 'Vui lòng nhập mã giảm giá' });
      return;
    }

    const validCode = validateDiscountCode(discountCode);
    if (validCode) {
      const discountAmount = calculateDiscount(discountCode, subtotal);
      setDiscountMessage({ 
        type: 'success', 
        text: `Áp dụng mã thành công! Bạn đã tiết kiệm ${formatPrice(discountAmount)}` 
      });
    } else {
      setDiscountMessage({ type: 'error', text: 'Mã giảm giá không hợp lệ' });
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      setFormData(data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess();
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  };

  return (
    <FormGrid>
      <FormTitle>Hoàn tất đơn hàng</FormTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <FormLabel htmlFor="name">Họ và tên *</FormLabel>
          <FormInput
            id="name"
            {...register('name')}
            className={errors.name ? 'error' : ''}
            placeholder="Nhập họ và tên"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel htmlFor="phone">Số điện thoại *</FormLabel>
          <FormInput
            id="phone"
            {...register('phone')}
            className={errors.phone ? 'error' : ''}
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel htmlFor="address">Địa chỉ giao hàng *</FormLabel>
          <FormTextarea
            id="address"
            {...register('address')}
            className={errors.address ? 'error' : ''}
            placeholder="Nhập địa chỉ giao hàng đầy đủ"
          />
          {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel htmlFor="note">Ghi chú</FormLabel>
          <FormTextarea
            id="note"
            {...register('note')}
            placeholder="Ghi chú thêm cho đơn hàng"
          />
        </FormSection>

        <FormSection>
          <FormLabel>Mã giảm giá</FormLabel>
          <DiscountSection>
            <DiscountInput
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Nhập mã giảm giá"
            />
            <DiscountButton type="button" onClick={handleDiscountCode}>
              Áp dụng
            </DiscountButton>
          </DiscountSection>
          {discountMessage && (
            <DiscountMessage type={discountMessage.type}>
              {discountMessage.text}
            </DiscountMessage>
          )}
        </FormSection>

        <ShippingSection>
          <ShippingTitle>Tuỳ chọn vận chuyển</ShippingTitle>
          <ShippingOptions>
            {shippingOptions.map((option) => (
              <ShippingOption key={option.id} selected={shippingOption.id === option.id}>
                <ShippingRadio
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={shippingOption.id === option.id}
                  onChange={() => setShippingOption(option)}
                />
                <ShippingInfo>
                  <ShippingName>{option.name}</ShippingName>
                  <ShippingDescription>{option.description}</ShippingDescription>
                </ShippingInfo>
                <ShippingPrice>{formatPrice(option.price)}</ShippingPrice>
              </ShippingOption>
            ))}
          </ShippingOptions>
        </ShippingSection>

        <OrderSummary>
          <SummaryTitle>Tóm tắt thanh toán</SummaryTitle>
          <SummaryRow>
            <span>Tạm tính:</span>
            <span>{formatPrice(subtotal)}</span>
          </SummaryRow>
          {discount > 0 && (
            <SummaryRow>
              <span>Giảm giá:</span>
              <span>-{formatPrice(discount)}</span>
            </SummaryRow>
          )}
          <SummaryRow>
            <span>Phí vận chuyển:</span>
            <span>{formatPrice(shipping)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tổng cộng:</span>
            <span>{formatPrice(total)}</span>
          </SummaryRow>
        </OrderSummary>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
        </SubmitButton>
      </form>
    </FormGrid>
  );
};

export default OrderForm;
