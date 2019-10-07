import React from 'react';
import { Link, navigate } from '@reach/router';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import Logo from './Logo';

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  background: #317ee3;
  color: #333333;
  height: 72px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  padding: 0 60px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Buttons = styled.div`
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  align-items: center;

  @media screen and (max-width: 665px) {
    display: none;
  }
`;

const buttonStyles = `
  background: inherit;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 8px;
  margin: 0 17.5px;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  color: #ffffff;
  font-family: 'Raleway', sans-serif;

  &:hover {
    border-bottom: 3px solid #f0932b;
  }
`;

const Button = styled(Link)`
  ${buttonStyles}
`;

const ButtonBasic = styled.button`
  ${buttonStyles}
`;

const SpecialButton = styled(Link)`
  background-color: #f0932b;
  border-bottom-color: rgba(0, 0, 0, 0);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgba(0, 0, 0, 0);
  border-left-style: solid;
  border-left-width: 2px;
  border-right-color: rgba(0, 0, 0, 0);
  border-right-style: solid;
  border-right-width: 2px;
  border-top-color: rgba(0, 0, 0, 0);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top-style: solid;
  border-top-width: 2px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  font-size: 14.4px;
  font-weight: 400;
  letter-spacing: 1.5px;
  line-height: 21.6px;
  max-width: 100%;
  outline-color: rgb(255, 255, 255);
  outline-style: none;
  outline-width: 0px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-decoration-color: rgb(255, 255, 255);
  text-decoration-line: none;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoWrapper = styled(Logo)`
  cursor: pointer;
`;

const logout = () => {
  localStorage.clear();
  navigate('/');
};

const isLoggedIn = () => localStorage.getItem('session') !== null;

const loggedOutPages = [{ name: 'Log In', special: true, location: '/login' }];

const loggedInPages = [
  { name: 'Search', special: false, location: '/search' },
  { name: 'Messages', special: false, location: '/conversations' },
  { name: 'Profile', special: false, location: '/profile' },
  { name: 'Bids', special: false, location: '/profile/bids' },
];

const NavBar = ({ active, style }) => (
  <Wrapper style={style}>
    <Content>
      <Link to="/">
        <LogoWrapper />
      </Link>
      <Buttons>
        {(isLoggedIn() ? loggedInPages : loggedOutPages).map(page =>
          page.special ? (
            <SpecialButton to={page.location}>{page.name}</SpecialButton>
          ) : (
            <Button to={page.location}>{page.name}</Button>
          )
        )}
        {isLoggedIn() ? (
          <ButtonBasic
            onClick={() => {
              logout();
            }}
            style={{
              width: 'max-content',
              padding: '0 4px',
              marginTop: -2,
              whiteSpace: 'nowrap',
              maxWidth: 150,
              pointerEvents: 'none',
            }}
          >
            <Avatar name={localStorage.getItem('u_name')} size={40} round />
            <span style={{ marginLeft: 10 }}>
              {localStorage.getItem('b_name')}
            </span>
          </ButtonBasic>
        ) : null}
      </Buttons>
    </Content>
  </Wrapper>
);

export default NavBar;
