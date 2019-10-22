import React, { useState } from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar'

const Heading = styled.h2`
  max-width: max-content;
  width: 100%;
  color: #1f2430;
  margin: 0;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  font-size: 63px;
  line-height: 76px;
  letter-spacing: -1px;
  text-align: left;
  border-bottom: 9px solid #a8f1ed;
  padding-bottom: 0px;
  line-height: 42px;
`;

const Landing = () => {
  return (
    <Hero>
      <Heading>Get things done</Heading>
      <SearchBar/>
    </Hero>
  );
};

export default Landing;
