import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import DatePicker from 'react-date-picker';
import { jobFilter, locationFilter, typeFilter, statusFilter } from '../helper/filters';

const SelectWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: max-content;
	width: 100%;
`;

const selectStyles = `
  font-family:'Raleway',sans-serif;
  line-height: normal;
  position: relative;
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
	background: #ffffff;
	border: 1px solid #000000;
	border-radius: 4px;
	overflow: hidden;
  font-size: 13px;
	cursor: pointer;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
	max-width:200px;
`;

const SelectLocation = styled(locationFilter)`
  ${selectStyles}
`;
const SelectCategory = styled(jobFilter)`
  ${selectStyles}
`;
const SelectType = styled(typeFilter)`
  ${selectStyles}
`;
const SelectStatus = styled(statusFilter)`
  ${selectStyles}
`;

const Input = styled.input`
	background: #ffffff;
	border: 1px solid #000000;
	border-radius: 4px;
	overflow: hidden;
	width: 100%;
	margin: 10px 0;
	padding: 10px;
`;

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
    flex-direction: column;
`;

const ButtonHolder = styled.div`
	width: 100%;
	display: flex;
    justify-content: right;
    margin-top: 10px;
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
		content: "Confirm";
	}
`;

const Label = styled.label``;

const Cancel = styled.button`
	${ButtonStyles} background: #fff;
	color: #000;
	box-shadow: inset 0px 0px 0px 1px #999;
    
	&:before {
		content: "Cancel";
	}
`;


const Title = styled.h2``;

const ErrorMessage = styled.h6`
	color: red;
	margin: 0;
	margin-top: 0px;
	margin-top: -12px;
	font-size: 13px;
	font-weight: 600;
`;


const EditProfile = ({ cancelHandler, business_name, name, description, phone_number, location }) => {

    const [updated_name, setName] = useState(name);
    const [updated_business_name, setBusinessName] = useState(business_name);
    const [updated_phone_number, setPhoneNumber] = useState(phone_number);
    const [updated_description, setDescription] = useState(description);
    const [updated_location, setLocation] = useState(location);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const Edit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(!updated_business_name || !updated_location || !updated_name ? 'Fields with * are required fields' : '');

		!updated_business_name || !updated_name || !updated_location ? setLoading(false) :
		axios.post('http://13.238.42.177:3800/user/updateprofile', {
			session_token: localStorage.getItem('session'),
            name: updated_name,
            business_name: updated_business_name,
            description: updated_description,
            phone_number, updated_phone_number,
            location: updated_location
		},
		{
			headers: {"X-CSRFToken": Cookies.get('csrftoken')},
			withCredentials: true
		}).then(function(response) {
			cancelHandler();
		})
		.catch((err) => {
			const errorResponse = err.response.data;
			setError(Array(errorResponse[Object.keys(errorResponse)[0]]).toString());
		})
		.finally(() => {setLoading(false)});
	};

	return (
		<Container>
			<Form onSubmit={Edit}>
				<Title>Edit Profile</Title>
				{loading ? (
					<BounceLoader
						css={`
							display: block;
							margin: 67px 38%;
						`}
						sizeUnit={'px'}
						size={150}
						color={'#123abc'}
						loading={loading}
					/>
				) : (
					<>  
                        <Label>First Name*</Label>
                        <Input
                            defaultValue={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <Label> Business Name*</Label>
                        <Input
							defaultValue={business_name}
							onChange={(e) => {
								setBusinessName(e.target.value);
							}}
						/>
                        <Label> Description</Label>
                        <Input
							defaultValue={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
                        <Label> Phone Number </Label>
						<Input
							defaultValue={phone_number}
							onChange={(e) => {
								setPhoneNumber(e.target.value);
							}}
						/>
                        <Label>Location*</Label>
						<SelectWrapper>	
                            <SelectLocation
                                defaultValue={location} 
								onChange={(e) => {
									setLocation(e.target.value);
								}
							}/>
						</SelectWrapper>
						
						<ErrorMessage>{error}</ErrorMessage>
						<ButtonHolder>
							<Cancel
								onClick={() => {
									cancelHandler();
								}}
							/>
							<CreatePost type='submit' />
						</ButtonHolder>
					</>
				)}
			</Form>
		</Container>
	);
};

export default EditProfile;
