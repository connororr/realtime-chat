import React from "react";
import styled from "styled-components";

import * as heroBg from "../images/hero.jpg";

const Wrapper = styled.div`
  width: 100%;
  height: 550px;
  /* background: rgba(0, 0, 0, 0.49); */
  position: relative;
`;

const Background = styled.div`
  background-image: url(https://images.unsplash.com/photo-1483694583352-6af4091a9498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);
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
