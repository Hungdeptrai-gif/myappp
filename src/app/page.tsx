"use client";

import React, { useState } from 'react';
import { StepNavigation, ProductPreview, OptionSelector, OrderForm, SuccessModal } from '@/components';
import ClientWrapper from '@/components/ClientWrapper';
import { useCustomizationStore } from '@/store/customizationStore';

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
    { number: 1, title: 'Character', description: 'Choose a base character' },
    { number: 2, title: 'Background', description: 'Pick a scene' },
    { number: 3, title: 'Style', description: 'Hair, clothes, accessories, pet' },
    { number: 4, title: 'Personalize', description: 'Add your message' },
    { number: 5, title: 'Review & Order', description: 'Enter details and submit' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', color: '#111827', marginBottom: '0.5rem' }}>Custom Gift Creator</h1>
          <p style={{ color: '#6b7280' }}>Design your perfect personalized gift in 5 easy steps</p>
        </header>

        <StepNavigation steps={steps} currentStep={currentStep} />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          <div>
            {currentStep <= 4 ? (
              <OptionSelector step={currentStep} />
            ) : (
              <OrderForm onSuccess={() => setShowSuccess(true)} />
            )}
          </div>

          <div>
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
                Back
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: 600
                  }}
                >
                  Next
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
