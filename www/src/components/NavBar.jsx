import React from 'react';
import { Link, navigate } from '@reach/router';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import Logo from './Logo';

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
  position: absolute;
  top: 0;
  right: 0;

  @media screen and (max-width: 810px) {
    display: none;
  }
`;

const buttonStyles = `
  background: #fff;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 8px;
  margin: 17.5px;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled(Link)`
  ${buttonStyles}
`;

const ButtonBasic = styled.button`
  ${buttonStyles}
`;

const SpecialButton = styled(Link)`
  background: #fff;
  border: 1px solid #ff7c4e;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  color: #ff7c4e;
  font-weight: 500;
  margin-right: 13px;
  background: #ff7c4e1a;
  padding: 6px 26px;
  margin: 17.5px;
  display: inline-block;
  text-decoration: none;
  width: 49px;
  text-align: center;

  &:hover {
    color: #99bdb2;
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
          }}
        >
          <Avatar name={localStorage.getItem('u_name')} size={40} round />
          <span style={{ marginLeft: 10 }}>
            {localStorage.getItem('b_name')}
          </span>
        </ButtonBasic>
      ) : null}
    </Buttons>
  </Wrapper>
);

export default NavBar;
