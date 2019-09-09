import React from "react";
import styled from "styled-components";

import * as heroBg from "../images/hero.jpg";

const Wrapper = styled.div`
  width: 100%;
  height: 450px;
  background: rgba(0, 0, 0, 0.49);
`;

const Background = styled.div`
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center;
  width: inherit;
  height: inherit;
`;

const Hero = ({ children }) => (
  <Background>
    <Wrapper>{children}</Wrapper>
  </Background>
);
export default Hero;
