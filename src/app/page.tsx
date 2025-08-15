"use client";

import React, { useState } from 'react';
import { StepNavigation, ProductPreview, OptionSelector, OrderForm, SuccessModal } from '@/components';
import ClientWrapper from '@/components/ClientWrapper';
import { useCustomizationStore } from '@/store/customizationStore';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <ClientWrapper>
      <HomeClient />
    </ClientWrapper>
  );
}

function HomeClient() {
  const { currentStep, setCurrentStep } = useCustomizationStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { number: 1, title: 'Nhân vật', description: 'Chọn nhân vật cơ bản' },
    { number: 2, title: 'Phông nền', description: 'Chọn bối cảnh' },
    { number: 3, title: 'Phong cách', description: 'Tóc, quần áo, phụ kiện, thú cưng' },
    { number: 4, title: 'Cá nhân hoá', description: 'Thêm lời nhắn' },
    { number: 5, title: 'Xem lại & Đặt hàng', description: 'Nhập thông tin và gửi đơn' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%)',
      paddingBottom: '2rem'
    }}>
      <Hero />

      <div id="builder" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 0 1rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: '#111827', marginBottom: '0.5rem' }}>Tuỳ chỉnh món quà của bạn</h2>
          <p style={{ color: '#6b7280' }}>Chọn các tuỳ chọn bên dưới. Xem trước cập nhật theo thời gian thực.</p>
        </header>

        <StepNavigation steps={steps} currentStep={currentStep} />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          <div>
            {currentStep <= 4 ? (
              <OptionSelector step={currentStep} />
            ) : (
              <div id="order">
                <OrderForm onSuccess={() => setShowSuccess(true)} />
              </div>
            )}
          </div>

          <div style={{ position: 'sticky', top: '88px', height: 'fit-content' }}>
            <ProductPreview />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  borderRadius: '0.5rem',
                  fontWeight: 600
                }}
              >
                Quay lại
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: '#111827',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: 600
                  }}
                >
                  Tiếp tục
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {showSuccess && (
          <SuccessModal onClose={() => setShowSuccess(false)} />
        )}
      </div>
    </div>
  );
}
