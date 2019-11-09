import React, {useState, useEffect} from 'react';
import FsLightbox from 'fslightbox-react';
import { FaMapMarkerAlt, FaBriefcase, FaComments, FaBuilding, FaStar, FaClock } from 'react-icons/fa';
import { Link } from '@reach/router';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import styled from 'styled-components';
import axios from 'axios';
import Bid from '../components/Bid';
import { navigate } from '@reach/router';
import * as headerBg from '../images/construction.jpg';


const Wrapper = styled.div`
  display: block;
  width: 90%;
  margin: auto;
`;

const Title = styled.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 23px;
  text-transform: capitalize;
  font-weight: 500;
`;

const SubHeading = styled.h5`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 500;
`;

const BusinessDetails = styled.div`
  color: #666666;
  cursor: pointer;
  margin-right: 15px;

  &:hover {
    color: #473fdf;
  }

  & > a:hover {
    color: #473fdf;
  }
`;

 const BusinessName = styled.div`
  display: inline-block;
  padding-left: 5px;

  &>a:visited, {
    color: #666666;
    text-decoration: none;
  }

  &>a:visited, {
    color: #666666;
    text-decoration: none;
  }
 `;

const BusinessHeader = styled.div`
  margin-top: 72px;
  height: 250px;
  width: 100vw;
  margin-left: -5vw;
`;

const HeaderBgWrapper = styled.div`
  width: inherit;
  height: inherit;
  background: url(${headerBg});
  background-position: left;
  background-size: cover;
`;

const HeaderBg = styled.div`
  background: rgba(247,247,247, 0.3);
  background: linear-gradient(90deg, rgba(247,247,247,1) 0%, rgba(247,247,247,1) 50%, rgba(247,247,247,0.4) 100%);
  width: inherit;
  height: inherit;
`;

const HeaderContentHolder = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin-top: 72px;
  height: 250px;
  position: absolute;
  top: 0;
  left: 5%;
`;

const BusinessWrapper = styled.div`
  width: max-content;
  display: flex;
`;

const BusinessIcon = styled.div`
  width: 120px;
  height: 120px;
  background: #ffffff;
  background-position: center;
  background-size: cover;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 2px 12px -6px #00000047;
`;

const HeaderDetails = styled.div`
  width: 420px;
  margin-left: 30px;
`;

const BidWrapper = styled.div`
  height: 120px;
  background: #ffffff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 2px 12px -6px #00000047;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const MediaWrapper = styled.div`
  display: flex;
  justift-content: left;

`;

const Image = styled.img`
  width: 140px;
  height: 140px;
  overflow: hidden;
  border-radius: 8px;
  margin-right: 10px;
  margin-bottom: 17px;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const InfoWrapper = styled.div`
  width: max-content;
  max-width: 600px;
  width: 100%;
  margin: 0 20px;
`;
const BusinessRow = styled.div`
  display: flex;
  align-items: center;
`


const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
  width: max-content;
`;

const RatingValue = styled.div`
  background: #febe42;
  color: #fff;
  display: inline-block;
  padding: 0 7px;
  line-height: 18px;
  padding-bottom: 5px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
`;

const RatingStars = styled.div`
  color: #febe42;
  &>*{
    margin:3px;
  }
`;

const VerifiedWrapper = styled.div`
  background: #38b653;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  padding: 3px 7px;
  line-height: 18px;
  border-radius: 4px;
`

const BidHeading = styled.h4`
  color: #666;
  margin: 0; 
  font-weight: 500;
  padding: 0 24px;
  margin-top: 27px;
`

const BidValue = styled.h5`
  color: #333;
  margin: 0; 
  font-weight: 400;
  font-size: 29px;
  padding: 0 24px;
  margin-top: 4px;
`;

const Description = styled.p`
  color: #555;
  margin: 0;
  margin: 0;
  font-weight: 100;
  font-size: 14px;
  line-height: 20px;
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
  color: #333;
  margin-left: 7px;
  margin-top: 15px;
`;

const Text2 = styled.p`
  font-weight: 600;
  margin: 0;
  font-size: 14px;
  color: #888;
  margin-left: 51px;
  margin-top: 2px;
  margin-bottom: 15px;
`;

const Icon = styled.div`
  color: #473fdf;
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  margin-left: 29px;
`;

const MapWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 1px 6px -5px #000;

  & > div {
    width: 100% !important;
    margin-bottom: -4px;
  }

  & div > span {
    display: none;
  }
`;

const MessageIcon = styled(FaComments)`
  cursor: pointer;
  padding-left: 10px;
  color: #f0932b;

  &:hover {
    opacity: 0.8;
  }
`;


const LeftWrapper = styled.div`

`

const RightWrapper = styled.div`
  margin-left: 40px;
`;

const BidButton = styled.div`
  width: 245px;
  height: 44px;
  margin-bottom: 28px;
  background: #473fdf;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0px 2px 12px -6px #473fdf;
`;

const Heading = styled.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 13px;
`;

const ProjectDetails = styled.div`
  background: #f7f7f7;
  padding-bottom: 10px;
`;

const ProjectHeading = styled.h3`
  color: #333;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  background:#EEE;
  line-height: 45px;
  padding: 0 25px;
`

const getPageData = (setProjectData) => {
  const self = this;
  //this.props.bid
  axios.get('http://13.238.42.177:3800/job/view').then(response => {
    const projectData = response.data;
    setProjectData(projectData)
  });
};

const Project = () => {
  const [projectData, setProjectData] = useState(null);
  const [toggler, setToggler] = useState(false);
  const [productIndex, setProductIndex] = useState(0); 

  useEffect(() => {
    getPageData(setProjectData);
  }) 

  const stars = [];
  for(let i = 0; i < 4.9; i++){
    stars.push(<FaStar/>);
  }
    return (
      <>
        {projectData ? (
          <Wrapper>
            <HeaderContentHolder>
              <BusinessWrapper>
                <BusinessIcon style={{background: `url('https://cdn.dribbble.com/users/2078668/screenshots/4543867/maple_contruction.png')`, backgroundSize: 'cover'}}/>
                <HeaderDetails>
                  <Title>{projectData['project_name']}</Title>
                  <SubHeading>About the Supplier</SubHeading>
                  <BusinessRow>
                    <BusinessDetails>
                      <FaBuilding/>
                      <BusinessName><Link to={`/profile`} className=''>{projectData['business_name']}</Link></BusinessName>
                    </BusinessDetails>
                    <RatingWrapper>
                      <RatingValue>4.9</RatingValue>
                      <RatingStars>{stars}</RatingStars>
                    </RatingWrapper>
                  </BusinessRow>
                  <BusinessRow>
                    <VerifiedWrapper>Verified</VerifiedWrapper>
                  </BusinessRow>
                </HeaderDetails>
              </BusinessWrapper>
              <BidWrapper>
                <BidHeading>Current Bid</BidHeading>
                <BidValue>$4,000</BidValue>
              </BidWrapper>
            </HeaderContentHolder>
            <BusinessHeader>
              <HeaderBgWrapper>
                <HeaderBg/>
              </HeaderBgWrapper>
            </BusinessHeader>
            <ContentWrapper>
              <LeftWrapper>
                <Heading>Description</Heading>
                <Description>
                  This is a really long description that describes the job that will 
                  be done by the Supplier, it indicates what they will do in their 
                  service and compelling reasons as to why someonw would want to bid on 
                  their project. This is a really long description that describes the job that will 
                  be done by the Supplier, it indicates what they will do in their 
                  service and compelling reasons as to why someonw would want to bid on 
                  their project.<br/><br/>
                  This is a really long description that describes the job that will 
                  be done by the Supplier, it indicates what they will do in their 
                  service and compelling reasons as to why someonw would want to bid on 
                  their project. This is a really long description that describes the job that will 
                  be done by the Supplier, it indicates what they will do in their 
                  service and compelling reasons as to why someonw would want to bid on 
                  their project.
                </Description>
                <Heading>Media</Heading>
                <MediaWrapper>
                  {projectData['project_photos'].map((image, i) => <Image 
                    onClick={() => {setProductIndex(i); setToggler(!toggler);}}
                    src={image.image}
                    alt="project photo"
                  />)}
                
                </MediaWrapper>
                <FsLightbox
                  toggler={ toggler }
                  sources={ [projectData['project_photos'][productIndex].image] }
                /> 
                <Heading>Location</Heading>
                <MapWrapper>
                    <Map
                      center={[-33.8875665, 151.1886607]}
                      zoom={15}
                      width={800}
                      height={375}
                    >
                      <Marker anchor={[-33.8875665, 151.1886607]} />
                    </Map>
                  </MapWrapper>
              </LeftWrapper>
              <RightWrapper>
                <BidButton>Bid Now</BidButton>
                <ProjectDetails>
                  <ProjectHeading>Summary</ProjectHeading>
                  <Icon>
                    <FaMapMarkerAlt />
                    <Text>Location</Text>
                  </Icon>
                  <Text2>{projectData.location}</Text2>
                  <Icon>
                    <FaBriefcase/>
                    <Text>Job Type</Text>
                  </Icon>
                  <Text2>Skirting board intsallation</Text2>
                  <Icon>
                    <FaClock/>
                    <Text>Date Posted</Text>
                  </Icon>
                  <Text2>3 days ago</Text2>
                </ProjectDetails>
              </RightWrapper>
            </ContentWrapper>
          </Wrapper>
        ) : (
          <h4>Loading...</h4>
        )}
      </>
    );
}
export default Project;
