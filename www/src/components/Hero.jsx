import React from 'react';
import styled from 'styled-components';
import * as heroBg from '../images/building.jpg';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 72px);

  & > div {
    position: absolute;
    width: 80vw;
    margin-left: 10vw;
    margin-right: 10vw;
    left: 0;
  }
`;

const Image = styled.img`
  width: 339px;
  height: 476px;
  position: absolute;
  top: 119px;
  right: 10vw;
  object-fit: cover;
  border-radius: 25px;
  border-top-left-radius: 0;
`;

const Background = styled.div`
  width: 80%;
  min-height: calc(100vh - 72px);
  background: #e7f6fc;
  border-bottom-right-radius: 42px;
  pointer-events: none;
`;

const Hero = ({ children }) => (
  <Background>
    <Wrapper>
      <div>{children}</div>
    </Wrapper>
    <Image src={heroBg} />
  </Background>
);
export default Hero;
