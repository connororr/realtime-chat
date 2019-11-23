import React, {useState, useEffect} from 'react';
import FsLightbox from 'fslightbox-react';
import { FaMapMarkerAlt, FaBriefcase, FaComments, FaBuilding, FaStar, FaClock } from 'react-icons/fa';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import styled from 'styled-components';
import axios from 'axios';
import Bid from '../components/Bid';
import { Link } from '@reach/router';
import * as headerBg from '../images/construction.jpg';
import JobListItem from '../components/JobListItem';
import RegisterJob from '../components/RegisterJob';
import EditProfile from '../components/EditProfile';
import { FiMapPin, FiPhone } from 'react-icons/fi';


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
`;

 const BusinessName = styled.div`
  display: inline-block;
  padding-left: 5px;
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
  justify-content: left;
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
  margin-left:5px;
  line-height: 18px;
  border-radius: 4px;
`
const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  margin-top:10px;
`

const DetailsWrapper = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  padding: 3px 7px;
  margin-left:5px;
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

const RegisterJobButton = styled.button`
  padding: 10px 20px;
  border: 0;
  cursor: pointer;
  background:#473fdf;
  color:#fff;
  margin-bottom: 20px;
  text-decoration: underline;
`;

const EditProfileButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  border: 0;
  cursor: pointer;
  background:#473fdf;
  color:#fff;
  margin-bottom: 20px;
  text-decoration: underline;
`;

const ContactButton = styled.a`
  padding: 10px 20px;
  border: 0;
  cursor: pointer;
  background:#473fdf;
  color:#fff;
  width:30px;
  margin-bottom: 20px;
  display:flex;
  font-size: 12px;
  text-align: center;
  margin-left: 10px;
  text-decoration: none !important;
  &:link {
    text-decoration: none !important;
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
  width: 59vw;
  margin-bottom: 20px;
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

const Brief = styled(FaBriefcase)`
  color: #473fdf !important;
  padding-right: 10px;
`;


const getPageData = (setBusinessData,business_id,stars) => {
  const self = this;
  //this.props.bid
  if(business_id=="user"){
    axios.post('http://13.238.42.177:3800/user/ownprofile', {
      "session_token": localStorage.getItem('session'),
    })
    .then(response => {
      console.log(response.data)
      const businessData = response.data;
      for(let i = 0; i < parseInt(businessData['rating']); i++){
        stars.push(<FaStar/>);
      }
      setBusinessData(businessData)
    });
  }else{
    axios.post('http://13.238.42.177:3800/user/othersprofile', {
      "session_token": localStorage.getItem('session'),
      "user_id": business_id,
    })
    .then(response => {
      const businessData = response.data;
      for(let i = 0; i < parseInt(businessData['rating']); i++){
        stars.push(<FaStar/>);
      }
      setBusinessData(businessData)
    });
  }
};

const Business = (props) => {
  const [stars,setStars] = useState([]);
  const [businessData, setBusinessData] = useState(null);
  const [toggler, setToggler] = useState(false);
  const [productIndex, setProductIndex] = useState(0); 
  const [openEditor, setOpenEditor] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  useEffect(() => {
    getPageData(setBusinessData,props.id,stars);
  },[]) 


    return (
      <>
        {businessData ? (
          <Wrapper>
            {openRegister && <RegisterJob cancelHandler={() => {setOpenRegister(false)}}/>}
            {openEditor && 
              <EditProfile 
                cancelHandler={() => {setOpenEditor(false)}}
                business_name={businessData['business_name']}
                name={businessData['user_name']}
                description={businessData['description']}
                phone_number={businessData['phone']}
                location={businessData['location']}
              />}
            <HeaderContentHolder>
              <BusinessWrapper>
                <BusinessIcon style={{background: `url('${businessData['profile_picture']}')`, backgroundSize: 'cover'}}/>
                <HeaderDetails>
                  <Title>{businessData['business_name']}</Title>
                  {/* <SubHeading>{businessData['business_name']}</SubHeading> */}
                  <BusinessRow>
                    <RatingWrapper>
                      <RatingValue>{businessData['rating']}</RatingValue>
                      <RatingStars>{stars}</RatingStars>
                    </RatingWrapper>
                    <VerifiedWrapper>{businessData['premium']=='T' ? ("Premium"):("Standard")}</VerifiedWrapper>
                  </BusinessRow>
                  <DetailsRow>
                  <DetailsWrapper><FiMapPin style={{ margin: '0 5px 0 0' }} />{businessData['location']}</DetailsWrapper>
                    <DetailsWrapper><FiPhone style={{ margin: '0 5px 0 0' }} />{businessData['phone']}</DetailsWrapper>
                  </DetailsRow>
                </HeaderDetails>
              </BusinessWrapper>
            </HeaderContentHolder>
            <BusinessHeader>
              <HeaderBgWrapper>
                <HeaderBg/>
              </HeaderBgWrapper>
            </BusinessHeader>
            <ContentWrapper>
              <LeftWrapper>
                <Heading>About</Heading>
                <Description>
                  {businessData['description']}
                </Description>
                <ProjectDetails>
                  <ProjectHeading>
                    <Brief/>Open Projects
                  </ProjectHeading>
                  {businessData.user_projects.map((user_projects) => (
                  <Link to={`/project/${user_projects['id']}`} passParams ={user_projects['id']} style={{ textDecoration: 'none' }}>
                      <JobListItem
                        project={user_projects['project_name']}
                        status={user_projects.premium==='T' ? ("Premium"):("Standard")}
                        key={user_projects['id']}
                        b_id={user_projects['business_id']}
                        bid={user_projects['current_bid']}
                        b_name={user_projects['business_name']}
                        location={user_projects['location']}
                        image={user_projects.project_photos[0].image}
                        alt={user_projects.project_photos[0].title}
                      />
                  </Link>
                  
                ))}
                </ProjectDetails>
                {props.id=="user" ? (
                <>
                  <RegisterJobButton onClick={() => {setOpenRegister(true)}}>Register Job</RegisterJobButton>
                  <EditProfileButton onClick={() => {setOpenEditor(true)}}>Edit Profile</EditProfileButton>
                </>
                ):(
                <Link to={`/conversations/`}> 
                  <ContactButton
                    onClick={() => {
                      console.log("Test")
                      localStorage.setItem('business_name', businessData.business_name);
                      localStorage.setItem('profile_picture', businessData.profile_picture);
                      localStorage.setItem('other_user_id', props.id);
                      localStorage.setItem('user_name', businessData.user_name);
                    }}

                  >Chat
                  </ContactButton>
                </Link>
                )}
                
                <Heading>Media</Heading>
                <MediaWrapper>
                  {businessData['user_projects'].map((project, i) => <Image 
                    onClick={() => {setProductIndex(i); setToggler(!toggler);}}
                    src={project['project_photos'][0].image}
                    alt="business photo"
                  />)}
                
                </MediaWrapper>
                {businessData['user_projects'].length > 0 && <FsLightbox
                  toggler={ toggler }
                  sources={ [businessData['user_projects'][productIndex]['project_photos'][0].image] }
                />}
                
              </LeftWrapper>
              {/*<RightWrapper>
              <Heading>Location</Heading>
                <MapWrapper style={{width: 266, height: 336}}>
                    <Map
                      center={[-33.8875665, 151.1886607]}
                      zoom={15}
                      width={266}
                      height={336}
                    >
                      <Marker anchor={[-33.8875665, 151.1886607]} />
                    </Map>
                  </MapWrapper>
              </RightWrapper>*/}
            </ContentWrapper>
          </Wrapper>
        ) : (
          <h4 style={{margin: 72}}>Loading...</h4>
        )}
      </>
    );
}
export default Business;
