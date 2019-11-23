import React from 'react';
import styled from 'styled-components';
import { FiMapPin, FiBookmark } from 'react-icons/fi';

const Wrapper = styled.div`
	height: 100px;
	width: 100%;
	border-bottom: 2px solid #f0f1f3;
	display: flex;
	align-items: center;
	justify-content: space-between;

	color: #2f2f37;
	text-decoration: none !important;

	& > p {
		color: #2f2f37;
		font-size: 13px;
		font-weight: 400;
		max-width: 140px;
		width: 100%;
		text-align: center;
	}

	& > svg {
		color: #a6a6a6;
		font-size: 24px;
		margin: 0 12px;
	}
`;

const Icon = styled.img`
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 17px;
	box-shadow: 0px 2px 12px -6px #000;
`;

const Title = styled.h3`
	max-width: 339px;
	font-weight: 600;
	font-size: 16px;
	line-height: 22px;
	margin: 0;
`;

const SubTitle = styled.h4`
	font-weight: 600;
	font-size: 14px;
	line-height: 27px;
	margin: 0;

	& > span {
		color: #93969f;
		font-weight: 400;
	}
`;

const ProjectDetailHolder = styled.div`
	padding: 0px 19px;
	min-width: 100px;
`;
const ProjectSpecHolder = styled.div`
	padding: 0px 19px;
	width: 100%;
	justify-content: space-between;
	display: flex;
`;
const Spec = styled.div`
	display: flex;
	float: left;
	font-weight: 500;
	font-size: 16px;
	text-align: center;
`;
const Loc = styled.div`
	display: flex;

	float: left;
	font-weight: 500;
	font-size: 16px;
	text-align: center;
`;


const JobListItem = ({business_name,  location, profile_picture, description }) => (
	<Wrapper>
		<Icon src={profile_picture} />
		<ProjectDetailHolder>
			<Title>{business_name}</Title>
		</ProjectDetailHolder>
		<ProjectSpecHolder>
			<Loc>
				<FiMapPin style={{ margin: '0 5px 0 0' }} />
				{location}
			</Loc>
			<Spec>{description}</Spec>
		</ProjectSpecHolder>
		<FiBookmark />
	</Wrapper>
);

export default JobListItem;
