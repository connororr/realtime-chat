import React from 'react';
import { Link, navigate } from '@reach/router';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import Logo from './Logo';

const Wrapper = styled.div`
	height: 50px;
	width: 100%;
	color: #333333;
	position: absolute;
	top: 0;
	left: 0;
	height: 72px;
	display: flex;
	justify-content: space-between;
	z-index: 99;
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
  color: #1f2430;
  font-family: 'Raleway', sans-serif;

  &:hover {
    border-bottom: 3px solid #f0932b;
  }
`;

const ButtonBasic = styled.button`${buttonStyles};`;

const buttonStyle = `
  color: #1f2430;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 0 15px;
  cursor: pointer;
`;

const Button = styled(Link)`
  ${buttonStyle}
`;

const SpecialButton = styled(Link)`
  ${buttonStyle}
`;

const LogoWrapper = styled(Logo)`
  cursor: pointer;
`;

const RightButton = styled.div`
	right: 22px;
	position: absolute;
`;

const LeftButton = styled.div`
	left: 129px;
	position: absolute;
`;

const isLoggedIn = () => localStorage.getItem('session') !== null;

const pages = [{ name: 'Find projects', location: '/search' }, { name: 'Browse businesses', location: '/search' }];

const pagesLocked = [
	{ name: 'Messages', location: '/conversations' },
	{ name: 'Profile', location: '/profile' },
	{ name: 'Bids', location: '/profile/bids' },
];

const NavBar = ({ active, style }) => (
	<Wrapper style={style}>
		<Content>
			<Link to='/'>
				<LogoWrapper />
			</Link>
			<Buttons>
				<LeftButton>
					{pages.map((page) => <Button to={page.location}>{page.name}</Button>)}
					{isLoggedIn() && pagesLocked.map((page) => <Button to={page.location}>{page.name}</Button>)}
				</LeftButton>
				{!isLoggedIn() && (
					<RightButton>
						<SpecialButton to='/login'>For supplier</SpecialButton>{' '}
						<SpecialButton to='/login' style={{ borderLeft: '1px solid #1f24303b' }}>
							Sign in
						</SpecialButton>
					</RightButton>
				)}

				{isLoggedIn() && (
					<ButtonBasic
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
						<span style={{ marginLeft: 10 }}>{localStorage.getItem('b_name')}</span>
					</ButtonBasic>
				)}
			</Buttons>
		</Content>
	</Wrapper>
);

export default NavBar;
