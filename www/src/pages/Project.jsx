import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign } from 'react-icons/fa';
import Layout from '../components/Layout';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import axios from 'axios';

const Wrapper = styled.div`
  display: block;
  width: 90%;
  margin: auto;
`;

const Title = styled.h1``;

const ContentWrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  margin: 0 20px;
  width: 400px;
  height: auto;
  overflow: hidden;
  border-radius: 8px;
`;

const Info = styled.div`
  width: 100%;
  height: max-content;
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
      <Layout>
        <NavBar />
        {projectData ? (
          <Wrapper>
            <ContentWrapper>
              <Image
                src={projectData['project_photos'][0].image}
                alt="project photo"
              />
              <Info>
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
                    <FaDollarSign />
                    <Text>{projectData['current_bid']}</Text>
                  </Icon>
                </Detail>
                <Detail>
                  <Icon>
                    <FaBriefcase /> <Text>{projectData['business_name']}</Text>
                  </Icon>
                </Detail>
              </Info>
            </ContentWrapper>
          </Wrapper>
        ) : (
          <h4>Loading...</h4>
        )}
      </Layout>
    );
  }
}
export default Project;
