import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Input = styled.input`
	background: #ffffff;
	border: 1px solid #000000;
	border-radius: 4px;
	overflow: hidden;
	width: 100%;
	margin: 10px 0;
	padding: 10px;
`;

const JobTitle = () => {
	const [title, setTitle] = useState('');
	return (
		<Input
			value={title}
			placeholder='Job title'
			onChange={(e) => {
				setTitle(e.target.value);
			}}
		/>
	);
};

const JobDescription = () => {
	const [description, setDescription] = useState('');
	return (
		<Input
			value={description}
			placeholder='Job description'
			onChange={(e) => {
				setDescription(e.target.value);
			}}
		/>
	);
};

const JobLocation = () => {
	const [location, setLocation] = useState('');
	return (
		<Input
			value={location}
			placeholder='Job location'
			onChange={(e) => {
				setLocation(e.target.value);
			}}
		/>
	);
};

const JobStartingBet = () => {
	const [minBet, setMinBet] = useState(0);
	return (
		<Input
			value={minBet}
			type='number'
			placeholder='Minimum bet'
			onChange={(e) => {
				setMinBet(e.target.value);
			}}
		/>
	);
};

const Container = styled.div`
	position: absolute;
	z-index: 90;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
`;

const Form = styled.form`
	min-width: 700px;
	display: flex;
	flex-wrap: wrap;
	background: #ffffff;
	padding: 10px 30px;
	border-radius: 10px;
`;

const ButtonHolder = styled.div`
	width: 100%;
	display: flex;
	justify-content: right;
`;

const ButtonStyles = css`
	padding: 10px 20px;
	border: 0;
	cursor: pointer;
`;

const CreatePost = styled.button`
	${ButtonStyles} background: #473fdf;
	color: #fff;

	&:before {
		content: "Create Post";
	}
`;

const Cancel = styled.button`
	${ButtonStyles} background: #fff;
	color: #000;
	box-shadow: inset 0px 0px 0px 1px #999;

	&:before {
		content: "Cancel";
	}
`;

const Title = styled.h2``;

const RegisterJob = ({ submitHandler, cancelHandler }) => (
	<Container>
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				submitHandler();
			}}
		>
			<Title>Register Job</Title>
			<JobTitle id='job' />
			<JobDescription id='description' />
			<JobLocation id='location' />
			<JobStartingBet id='starting-bet' />
			<ButtonHolder>
				<Cancel
					onClick={() => {
						cancelHandler();
					}}
				/>
				<CreatePost type='submit' />
			</ButtonHolder>
		</Form>
	</Container>
);

export default RegisterJob;
