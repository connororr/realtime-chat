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
  min-width:100px;

`;
const ProjectSpecHolder = styled.div`
  padding: 0px 19px;
  justify-content: space-between;
  width:100%;
`;
const Spec = styled.h2`
  font-weight: 600;
  font-size: 16px;
  width:30%;
  float: left;
  text-align:center;
  overflow:contain;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const JobListItem = ({ project, status, b_id, b_name, image, alt, bid, location })=> (
  <Wrapper>
    <Icon src={image} />
    <ProjectDetailHolder>
      <Title>
        {project}
      </Title>
      <SubTitle>
       {b_name}
      </SubTitle>
    </ProjectDetailHolder>
    <ProjectSpecHolder>
      <Spec>
        <FiMapPin style={{ margin: '0 5px 0 0' }} />{location}
      </Spec>
      <Spec>
        {status}
      </Spec>
      <Spec>
        ${bid}
      </Spec>
    </ProjectSpecHolder>
    <FiBookmark />
  </Wrapper>
);

export default JobListItem;
