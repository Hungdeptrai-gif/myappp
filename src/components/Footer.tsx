"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Wrap = styled.footer`
  background: #0b1220;
  color: #cbd5e1;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid #1f2937;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const ColTitle = styled.h4`
  color: #f8fafc;
  margin-bottom: 0.75rem;
`;

const LinkItem = styled(Link)`
  display: block;
  color: #cbd5e1;
  margin: 0.25rem 0;
  font-size: 0.95rem;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #1f2937;
  margin-top: 1.25rem;
  padding-top: 1rem;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <Wrap>
      <Inner>
        <Grid>
          <div>
            <ColTitle>The Loving Gifts</ColTitle>
            <p style={{ color: '#94a3b8' }}>Quà tặng cá nhân hoá, giao nhanh, chất lượng cao.</p>
          </div>
          <div>
            <ColTitle>Mua sắm</ColTitle>
            <LinkItem href="#builder">Tuỳ chỉnh</LinkItem>
            <LinkItem href="#order">Đặt hàng</LinkItem>
            <LinkItem href="#faq">Câu hỏi thường gặp</LinkItem>
          </div>
          <div>
            <ColTitle>Công ty</ColTitle>
            <LinkItem href="#about">Về chúng tôi</LinkItem>
            <LinkItem href="#contact">Liên hệ</LinkItem>
          </div>
          <div>
            <ColTitle>Pháp lý</ColTitle>
            <LinkItem href="#terms">Điều khoản</LinkItem>
            <LinkItem href="#privacy">Quyền riêng tư</LinkItem>
          </div>
        </Grid>
        <Bottom>
          <span>© {new Date().getFullYear()} The Loving Gifts</span>
          <span>Đã đăng ký bản quyền.</span>
        </Bottom>
      </Inner>
    </Wrap>
  );
};

export default Footer;