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
	margin: 10px;
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

const ErrorMessage = styled.h6`
	color: red;
	margin: 0;
	margin-top: 0px;
	margin-top: -12px;
	font-size: 13px;
	font-weight: 600;
`;


const RegisterJob = ({ cancelHandler }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [category, setCategory] = useState('');
	const [type, setType] = useState('');
	const [status, setStatus] = useState('');
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);

	const [photos, setPhotos] = useState([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const register = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(!start || !end ? 'Please select start and end dates' : '');

		!start || !end ? setLoading(false) :
		axios.post('http://13.238.42.177:3800/job/register', {
			session_token: localStorage.getItem('session'),
			project_title: title,
			date_start: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
			date_end: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
			project_description: description,
			project_category: category,
			project_type: type,
			project_premium: status === 'Premium' ? 'T' : 'F',
			project_location: location,
			project_photos: photos
		},
		{
			headers: {"X-CSRFToken": Cookies.get('csrftoken')},
			withCredentials: true
		}).then(function(response) {
			console.log(response.data);
		})
		.catch((err) => {
			const errorResponse = err.response.data;
			setError(Array(errorResponse[Object.keys(errorResponse)[0]]).toString());
		})
		.finally(() => {setLoading(false)});
	};

	const imageChange = e => {
		Promise.all(
			Array.from(e.target.files).map(file => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.addEventListener('load', ev => {
						if (ev.target.result !== undefined) {
							resolve(ev.target.result);
						}
					});
					reader.addEventListener('error', reject);
					reader.readAsDataURL(file);
				});
			})
		).then(
			(images) => {
				const imageTemp = [];
				images.map((image, i) => {imageTemp.push({image, title: `${title}-${i}`})})
				setPhotos(imageTemp);
			},
			(err) => {
				console.error(err);
			}
		);
	};

	return (
		<Container>
			<Form onSubmit={register}>
				<Title>Register Job</Title>
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
						<Input
							value={title}
							placeholder='Job title'
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
						<DatePicker
							onChange={date => {setStart(date)}}
							value={start}
						/><span>&nbsp;&nbsp;→&nbsp;&nbsp;</span>
						<DatePicker
							onChange={date => {setEnd(date)}}
							value={end}
						/>
						<Input
							value={description}
							placeholder='Job description'
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
						<SelectWrapper>
							<SelectCategory 
								onChange={(e) => {
									setCategory(e.target.value);
								}
							}/>
							<SelectLocation 
								onChange={(e) => {
									setLocation(e.target.value);
								}
							}/>
							<SelectType  
								onChange={(e) => {
									setType(e.target.value);
								}
							}/>
							<SelectStatus  
								onChange={(e) => {
									setStatus(e.target.value);
								}
							}/>
						</SelectWrapper>
						<div>
								Add images<br/>
								<input
									type='file'
									multiple
									accept='image/gif,image/jpeg,image/jpg,image/png'
									onChange={imageChange}
								/>
							</div>
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

export default RegisterJob;
