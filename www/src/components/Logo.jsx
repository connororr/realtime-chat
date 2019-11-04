import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';

const OuterWrapper = styled.div`
  filter: invert(23%) sepia(85%) saturate(2356%) hue-rotate(234deg)
    brightness(77%) contrast(82%);
`;

const ImgLogo = styled.img`
  margin: 0;
  display: inline-block;
  max-height: 45px;
  filter: invert(23%) sepia(85%) saturate(2356%) hue-rotate(234deg)
    brightness(77%) contrast(82%);
`;

const Logo = () => (
  <OuterWrapper>
    <ImgLogo src={logo} alt="UA Consultants" />
  </OuterWrapper>
);
export default Logo;
