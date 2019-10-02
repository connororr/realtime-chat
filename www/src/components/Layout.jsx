import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'Raleway', sans-serif;
`;

const Layout = ({ children }) => <Wrapper>{children}</Wrapper>;
export default Layout;
