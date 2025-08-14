import React from 'react';
import styled from 'styled-components';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
}

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StepCircle = styled.div<{ active: boolean; completed: boolean }>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  
  background: ${props => {
    if (props.completed) return '#10b981';
    if (props.active) return '#6366f1';
    return '#e5e7eb';
  }};
  
  color: ${props => {
    if (props.completed || props.active) return 'white';
    return '#6b7280';
  }};
  
  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

const StepTitle = styled.h3<{ active: boolean; completed: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5rem 0 0.25rem 0;
  color: ${props => {
    if (props.completed) return '#10b981';
    if (props.active) return '#6366f1';
    return '#6b7280';
  }};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StepDescription = styled.p<{ active: boolean; completed: boolean }>`
  font-size: 0.875rem;
  margin: 0;
  color: ${props => {
    if (props.completed) return '#10b981';
    if (props.active) return '#6366f1';
    return '#9ca3af';
  }};
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  position: relative;
`;

const Connector = styled.div<{ completed: boolean }>`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  width: 100%;
  height: 2px;
  background: ${props => props.completed ? '#10b981' : '#e5e7eb'};
  z-index: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StepNavigation: React.FC<StepNavigationProps> = ({ steps, currentStep }) => {
  return (
    <StepContainer>
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isLast = index === steps.length - 1;
        
        return (
          <StepWrapper key={step.number}>
            {!isLast && (
              <Connector completed={isCompleted} />
            )}
            
            <StepCircle active={isActive} completed={isCompleted}>
              {isCompleted ? '✓' : step.number}
            </StepCircle>
            
            <StepTitle active={isActive} completed={isCompleted}>
              {step.title}
            </StepTitle>
            
            <StepDescription active={isActive} completed={isCompleted}>
              {step.description}
            </StepDescription>
          </StepWrapper>
        );
      })}
    </StepContainer>
  );
};

export default StepNavigation;
