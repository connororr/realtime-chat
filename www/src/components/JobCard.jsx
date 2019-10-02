import React from "react";
import styled from "styled-components";

import { FaMapMarkerAlt, FaBriefcase, FaDollarSign } from "react-icons/fa";

const Card = styled.div`
  width: 250px;
  height: 275px;
  margin: 18px;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 0px 8px -5px #000;
  padding-top: 10px;
  border-radius: 8px;
`;

const Image = styled.div`
  width: 230px;
  height: 131px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: 0 10px;
`;

const Info = styled.div`
  background: #fff;
  width: 90%;
  display: block;
  position: absolute;
  margin: 0 5%;
  border-radius: 8px;
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
      <Image style={{backgroundImage: `url(${image}`}} />
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
    </Card>
  );
};

export default JobCard;
