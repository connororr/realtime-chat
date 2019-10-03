import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign } from 'react-icons/fa';
import Map from 'pigeon-maps';
import styled from 'styled-components';
import axios from 'axios';
import Bid from '../components/Bid';

const Wrapper = styled.div`
  display: block;
  width: 90%;
  margin: auto;
`;

const Title = styled.h1``;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Image = styled.img`
  margin: 0 20px;
  width: 260px;
  height: max-content;
  overflow: hidden;
  border-radius: 8px;
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

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: null,
    };
  }

  componentDidMount() {
    this.getPageData();
  }

  getPageData = () => {
    const self = this;
    //this.props.bid
    axios.get('http://localhost:3800/job/view').then(response => {
      const projectData = response.data;
      self.setState({ projectData });
    });
  };

  render() {
    const { projectData } = this.state;
    return (
      <>
        {projectData ? (
          <Wrapper>
            <ContentWrapper>
              <Image
                src={projectData['project_photos'][0].image}
                alt="project photo"
              />
              <Info>
                <InfoWrapper>
                  <Title>{projectData['project_name']}</Title>
                  <Description>{projectData.description}</Description>
                  <Detail>
                    <Icon>
                      <FaMapMarkerAlt />
                      <Text>{projectData.location}</Text>
                    </Icon>
                  </Detail>
                  <Detail>
                    <Icon>
                      <FaBriefcase />{' '}
                      <Text>{projectData['business_name']}</Text>
                    </Icon>
                  </Detail>
                  <Bid initialBid={projectData['current_bid']} />
                  <MapWrapper>
                    <Map
                      center={[-33.8875665, 151.1886607]}
                      zoom={15}
                      width={600}
                      height={400}
                    />
                  </MapWrapper>
                </InfoWrapper>
              </Info>
            </ContentWrapper>
          </Wrapper>
        ) : (
          <h4>Loading...</h4>
        )}
      </>
    );
  }
}
export default Project;
