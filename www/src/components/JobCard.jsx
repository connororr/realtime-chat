import React from "react";
import styled from "styled-components";

import { FaMapMarkerAlt, FaBriefcase, FaDollarSign } from "react-icons/fa";

const Card = styled.div`
  width: 250px;
  height: 250px;
  margin: 18px;
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
  top: 47%;
  width: 90%;
  display: block;
  margin: 0 5%;
  border-radius: 8px;
  box-shadow: 3px 4px 6px -3px #6c6c6c;
  height: 133px;
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
  margin-bottom: 11px;
`;

const Detail = styled.div`
  display: block;
  font-size: 14px;
  padding: 0 9px;
  margin: 4px 0;
`;

const Text = styled.p`
  display: inline-block;
  margin: 0;
  color: #666;
  margin-left: 7px;
`;

const Icon = styled.div`
  color: #666;
  display: inline-block;
`;

const JobCard = ({ project, desc, b_id, b_name, image, alt, bid, location }) => {
  return (
    <Card>
      <Info>
        <Name>{project}</Name>
        <Description>{desc}</Description>
        <Detail>
          <Icon>
            <FaMapMarkerAlt />
            <Text>{location}</Text>
          </Icon>
        </Detail>
        <Detail>
          <Icon>
            <FaDollarSign />
            <Text>{bid}</Text>
          </Icon>
        </Detail>
        <Detail>
          <Icon>
            <FaBriefcase /> <Text>{b_name}</Text>
          </Icon>
        </Detail>
      </Info>
      <Image src={image} alt={alt} />
    </Card>
  );
};

export default JobCard;
