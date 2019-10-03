import React from 'react';
import styled from 'styled-components';

// import * as heroBg from "../images/hero.jpg";

import frame from '../images/construction.svg';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 72px);
`;

const Image = styled.img`
  position: absolute;
  bottom: 10vh;
  height: 60vh;
  z-index: 0;
  right: 0;
`;

const Background = styled.div`
  background-color: #317ee3;
  width: inherit;
  min-height: calc(100vh - 72px);
`;

const Hero = ({ children }) => (
  <Background>
    <Wrapper><div>{children}</div></Wrapper>
    <Image src={frame} alt={''} />
  </Background>
);
export default Hero;
