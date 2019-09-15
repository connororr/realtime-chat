import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 250px;
  height: 250px;
  margin: 10px;
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  width: 250px;
  height: 187px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 3px 4px 6px -3px #6c6c6c;
`;

const Info = styled.div`
  background: #fff;
  position: absolute;
  top: 50%;
  width: 90%;
  display: block;
  margin: 0 5%;
  height: 143px;
  border-radius: 8px;
  box-shadow: 3px 4px 6px -3px #6c6c6c;
  height: 119px;
`;

const Name = styled.h3`
  color: #333;
  margin: 10px 0;
  font-size: 16px;
  padding: 0 10px;
  text-align: left;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  color: #666;
  margin: 0;
  padding: 0 10px;
  margin: 0;
  font-weight: 100;
  font-size: 15px;
`;

const JobCard = ({ project, desc, b_id, image, alt }) => {
  return (
    <Card>
      <Info>
        <Name>{project}</Name>
        <Description>{desc}</Description>
      </Info>
      <Image src={image} alt={alt} />
    </Card>
  );
};

export default JobCard;
