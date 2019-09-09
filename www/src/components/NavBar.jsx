import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  background: #ffffff;
  color: #333333;
  height: 66px;
  display: flex;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  flex: 1;
  width: 118px;
  background: #fff;
  border: 0;
  cursor: pointer;
  font-size: 13px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SpecialButton = styled.button`
  flex: 1;
  width: 179px;
  background: #fff;
  border: 1px solid #02c68d;
  border-radius: 30px;
  cursor: pointer;
  font-size: 13px;
  margin: 13px 0;
  padding: 0 10px;
  color: #02c68d;
  font-weight: 500;
  margin-right: 13px;
  background: #54dbb417;
  
   &:hover {
    color: black;
  }
`;

const pages = [
  { name: "How it works" },
  { name: "Our services" },
  { name: "Sign up" },
  { name: "login" }
];

const NavBar = ({ active }) => (
  <Wrapper>
    <Logo />
    <Buttons>
      {pages.map(page => (
        <Button>{page.name}</Button>
      ))}
      <SpecialButton>List your business</SpecialButton>
    </Buttons>
  </Wrapper>
);

export default NavBar;
