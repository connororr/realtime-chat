import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LoginImg from '../images/login2.jpg';

const FormWrapper = styled.div`display: flex;`;

const Form = styled.div`
	height: calc(100vh - 50px);
	position: relative;
	background-color: #fefefe;
	flex: flex-grow;
	flex-grow: 1;
	width: 50vw;
	padding-top: 50px;
`;

const FormElements = styled.div`
	display: block;
	margin: auto;
	display: block;
	margin: auto;
	width: 200px;
`;

const H1 = styled.h1`
	margin-bottom: 2rem;
	font-size: 2.5rem;
	font-weight: 100;
	text-align: center;
	text-transform: capitalize;
	margin-top: 61px;
	font-weight: 500;
`;

const Label = styled.label`
	margin-bottom: 0.5rem;
	font-size: 0.9rem;
	color: rgb(117, 117, 117);
	cursor: pointer;
	display: block;
	width: 200px;
`;

const Input = styled.input`
	padding: 1rem;

	border: 2px solid hsla(0, 0%, 62%, 1);
	display: block;
	margin-bottom: 29px;
	width: 164px;

	/* removes chrome's yellow background */
	&,
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-text-fill-color: var(--color-txt-dark);
		box-shadow: 0 0 0px 1000px var(--color-background) inset;
		-webkit-box-shadow: 0 0 0px 1000px var(--color-background) inset;
	}

	& :focus {
		outline: none;
	}

	& :disabled {
		opacity: var(--opacity-disabled);
	}

	& ::placeholder {
		opacity: var(--opacity-placeholder);
	}
`;

const Button = styled.button`
	padding: 1rem;
	margin-top: 6px;
	border: 2px solid hsla(0, 0%, 62%, 1);

	text-transform: uppercase;
	width: 200px;

	cursor: pointer;
	background: transparent;
	border: 2px solid var(--color-border);
	box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
		rgba(0, 0, 0, 0.12) 0 1px 8px 0;

	:hover,
	:focus,
	:active {
		outline: none;
		color: var(--color-focus);
		border-color: var(--color-focus);
	}
`;

const Recede = styled('span')`
  opacity: 0.5;
`;

const Image = styled.div`
	flex: flex-grow;
	flex-grow: 1;
	width: 50vw;
	height: 100vh;
	background-image: url(${LoginImg});
	background-position: center;
	background-size: cover;

	@media screen and (max-width: 992px) {
		display: none;
	}
`;

const RegisterPrompt = styled.p`
	width: 100%;
	text-align: center;
	font-size: 12px;
	opacity: 0.7;
	margin-top: 30px;

	& span {
		color: #0000ff;
		cursor: pointer;
	}
`;

const ErrorMessage = styled.h6`
	color: red;
	margin: 0;
	margin-top: 0px;
	margin-top: -12px;
	font-size: 13px;
	font-weight: 600;
`;

const login = (email, password, errorDisplay) => {
	axios('http://13.238.42.177:3800/user/login', {
		method: 'post',
		data: {
			email,
			password,
		},
		withCredentials: true,
	})
		.then(function(response) {
			localStorage.setItem('session', response.data['key']);
			window.location.href = '/';
		})
		.catch((err) => {
			errorDisplay(err);
		});
};

const register = (name, business, email, password, errorDisplay) => {
	localStorage.setItem('u_name', name);
	localStorage.setItem('b_name', business);

	axios('http://13.238.42.177:3800/user/register', {
		method: 'post',
		data: {
			name: name,
			business_name: business,
			email,
			password1: password,
			password2: password,
		},
		withCredentials: true,
	})
		.then(function(response) {
			localStorage.setItem('session', response.data['key']);
			window.location.href = '/';
		})
		.catch((err) => {
			errorDisplay(err);
		});
};

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [business, setBusiness] = useState('');

	const [error, setError] = useState('');

	const [registering, setRegistering] = useState(false);

	const errorDisplay = (err) => {
		const errorResponse = err.response.data;
		setError(Array(errorResponse[Object.keys(errorResponse)[0]]).toString());
	};

	const clearError = () => setError('');

	return (
		<FormWrapper>
			{registering ? (
				<Form>
					<H1>Join UA Consultants</H1>
					<FormElements>
						<Label htmlFor='name'>name</Label>
						<Input
							id='name'
							type='text'
							placeholder='Charlie'
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>

						<Label htmlFor='business'>business name</Label>
						<Input
							id='business'
							type='text'
							placeholder='Charlie&#39;s Carpentry'
							value={business}
							onChange={(e) => {
								setBusiness(e.target.value);
							}}
						/>

						<Label htmlFor='email'>email</Label>
						<Input
							id='email'
							type='email'
							placeholder='charlie@gmail.com'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<Label htmlFor='password'>
							password <Recede>(min. 6 characters)</Recede>
						</Label>

						<Input
							id='password'
							type='password'
							placeholder='Passw0rd!'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<ErrorMessage>{error}</ErrorMessage>
						<Button
							onClick={() => {
								clearError();
								register(name, business, email, password, errorDisplay);
							}}
						>
							Register
						</Button>
					</FormElements>
					<RegisterPrompt>
						Already have an account?{' '}
						<span
							onClick={() => {
								setRegistering(false);
							}}
						>
							Click Here
						</span>
					</RegisterPrompt>
				</Form>
			) : (
				<Form>
					<H1>Welcome Back</H1>
					<FormElements>
						<Label htmlFor='email'>email</Label>
						<Input
							id='email'
							type='email'
							placeholder='charlie@gmail.com'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<Label htmlFor='password'>
							password <Recede>(min. 6 characters)</Recede>
						</Label>

						<Input
							id='password'
							type='password'
							placeholder='Passw0rd!'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<ErrorMessage>{error}</ErrorMessage>
						<RegisterPrompt>
							<span
								onClick={() => {
									clearError();
									setRegistering(true);
								}}
							>
								Forgot your password?
							</span>
						</RegisterPrompt>
						<Button
							onClick={() => {
								clearError();
								login(email, password, errorDisplay);
							}}
						>
							Log In
						</Button>
					</FormElements>
					<RegisterPrompt>
						Don't have an account yet?{' '}
						<span
							onClick={() => {
								clearError();
								setRegistering(true);
							}}
						>
							Click Here
						</span>
					</RegisterPrompt>
				</Form>
			)}
			<Image />
		</FormWrapper>
	);
};

export default Login;
