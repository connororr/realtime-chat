import React from "react";
import styled from "styled-components";

// import * as heroBg from "../images/hero.jpg";

import frame from "../images/construction.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 550px;
  position: relative;
  z-index: 1;
`;

const Image = styled.img`
  position: absolute;
  bottom: 10vh;
  height: 60vh;
  z-index: 0;
  right: 0;
`

const Background = styled.div`
  background-color: #317ee3;
  width: inherit;
  min-height: 100vh;
`;

const Hero = ({ children }) => (
  <Background>
    <Wrapper>{children}</Wrapper>
    <Image src={frame} alt={''}/>
  </Background>
);
export default Hero;
