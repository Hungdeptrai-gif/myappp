"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Announcement = styled.div`
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  text-align: center;
  padding: 0.5rem 1rem;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const Nav = styled.nav`
  background: white;
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid #e5e7eb;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  color: #111827;
  font-size: 1.125rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionBtn = styled(Link)`
  background: #111827;
  color: white;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
`;

const GhostBtn = styled(Link)`
  background: #f3f4f6;
  color: #111827;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Header: React.FC = () => {
  return (
    <header>
      <Announcement>
        Free shipping on orders over $100 • 24/7 Support • 100% Satisfaction
      </Announcement>
      <Nav>
        <NavInner>
          <Brand href="/">The Loving Gifts</Brand>
          <Actions>
            <GhostBtn href="#builder">Customize</GhostBtn>
            <ActionBtn href="#order">Order Now</ActionBtn>
          </Actions>
        </NavInner>
      </Nav>
    </header>
  );
};

export default Header;