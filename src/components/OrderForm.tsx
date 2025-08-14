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
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return '#d1fae5';
      case 'error': return '#fee2e2';
      case 'info': return '#dbeafe';
      default: return '#f3f4f6';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'success': return '#065f46';
      case 'error': return '#991b1b';
      case 'info': return '#1e40af';
      default: return '#374151';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#a7f3d0';
      case 'error': return '#fecaca';
      case 'info': return '#bfdbfe';
      default: return '#e5e7eb';
    }
  }};
`;

const ShippingSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ShippingTitle = styled.h4`
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const ShippingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ShippingOption = styled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 2px solid ${props => props.selected ? '#6366f1' : '#e5e7eb'};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#f0f4ff' : 'white'};
  
  &:hover {
    border-color: #6366f1;
  }
`;

const ShippingRadio = styled.input`
  margin-right: 0.75rem;
`;

const ShippingInfo = styled.div`
  flex: 1;
`;

const ShippingName = styled.span`
  font-weight: 500;
  color: #374151;
  display: block;
`;

const ShippingDescription = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ShippingPrice = styled.span`
  font-weight: 600;
  color: #6366f1;
`;

const OrderSummary = styled.div`
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const SummaryTitle = styled.h4`
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #10b981;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
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

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
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
      setDiscountMessage({ type: 'error', text: 'Please enter a discount code' });
      return;
    }

    const validCode = validateDiscountCode(discountCode);
    if (validCode) {
      const discountAmount = calculateDiscount(discountCode, subtotal);
      setDiscountMessage({ 
        type: 'success', 
        text: `Discount applied! You saved ${formatPrice(discountAmount)}` 
      });
    } else {
      setDiscountMessage({ type: 'error', text: 'Invalid discount code' });
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      setFormData(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  };

  return (
    <FormGrid>
      <FormTitle>Complete Your Order</FormTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <FormLabel htmlFor="name">Full Name *</FormLabel>
          <FormInput
            id="name"
            {...register('name')}
            className={errors.name ? 'error' : ''}
            placeholder="Enter your full name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel htmlFor="phone">Phone Number *</FormLabel>
          <FormInput
            id="phone"
            {...register('phone')}
            className={errors.phone ? 'error' : ''}
            placeholder="Enter your phone number"
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel htmlFor="address">Delivery Address *</FormLabel>
          <FormTextarea
            id="address"
            {...register('address')}
            className={errors.address ? 'error' : ''}
            placeholder="Enter your complete delivery address"
          />
          {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel htmlFor="note">Special Instructions</FormLabel>
          <FormTextarea
            id="note"
            {...register('note')}
            placeholder="Any special delivery instructions or notes"
          />
        </FormSection>

        <FormSection>
          <FormLabel>Discount Code</FormLabel>
          <DiscountSection>
            <DiscountInput
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter discount code"
            />
            <DiscountButton type="button" onClick={handleDiscountCode}>
              Apply
            </DiscountButton>
          </DiscountSection>
          {discountMessage && (
            <DiscountMessage type={discountMessage.type}>
              {discountMessage.text}
            </DiscountMessage>
          )}
        </FormSection>

        <ShippingSection>
          <ShippingTitle>Shipping Options</ShippingTitle>
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
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </SummaryRow>
          {discount > 0 && (
            <SummaryRow>
              <span>Discount:</span>
              <span>-{formatPrice(discount)}</span>
            </SummaryRow>
          )}
          <SummaryRow>
            <span>Shipping:</span>
            <span>{formatPrice(shipping)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </SummaryRow>
        </OrderSummary>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </SubmitButton>
      </form>
    </FormGrid>
  );
};

export default OrderForm;
