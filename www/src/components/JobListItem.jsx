import React from 'react';
import styled from 'styled-components';
import { FiBookmark } from 'react-icons/fi';

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
  width: 45px;
  height: 45px;
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
`;

const JobListItem = () => (
  <Wrapper>
    <Icon src="https://cdn.dribbble.com/users/2078668/screenshots/4543867/maple_contruction.png" />
    <ProjectDetailHolder>
      <Title>
        Marketing &amp; Communications Manager (Internship/Co-founder)
      </Title>
      <SubTitle>
        MailBoys, <span>4 days ago</span>
      </SubTitle>
    </ProjectDetailHolder>
    <p>Newtown, NSW</p>
    <p>Apprentice</p>
    <FiBookmark />
  </Wrapper>
);

export default JobListItem;
