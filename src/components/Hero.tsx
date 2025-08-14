"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Wrap = styled.section`
  background: radial-gradient(1200px 400px at 50% -50%, #c7d2fe 0%, transparent 60%),
              linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%);
  border-bottom: 1px solid #e5e7eb;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 2rem 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #0f172a;
`;

const Subtitle = styled.p`
  color: #475569;
  margin: 0.75rem 0 1.5rem 0;
`;

const CTAWrap = styled.div`
  display: inline-flex;
  gap: 0.75rem;
`;

const Primary = styled(Link)`
  background: #111827;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 700;
`;

const Secondary = styled(Link)`
  background: #e5e7eb;
  color: #111827;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 700;
`;

const Hero: React.FC = () => {
  return (
    <Wrap>
      <Inner>
        <Title>Design personalized gifts they&apos;ll love</Title>
        <Subtitle>Pick a character, scene, and style. Add your message. Preview in real time.</Subtitle>
        <CTAWrap>
          <Primary href="#builder">Start Customizing</Primary>
          <Secondary href="#order">Order Now</Secondary>
        </CTAWrap>
      </Inner>
    </Wrap>
  );
};

export default Hero;