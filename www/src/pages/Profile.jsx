import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from '@reach/router';
import { FaRegTrashAlt, FaPlusCircle } from 'react-icons/fa';
import JobCard from '../components/JobCard';

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Info = styled.div``;

const InfoWrapper = styled.div`
  width: max-content;
  max-width: 600px;
  width: 100%;
  margin: 0 20px;
`;

const Title = styled.h1``;

const NameInput = styled.input`
  display: block;
  font-size: 24px;
  font-weight: bolder;
  margin-bottom: 10px;
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

const AvatarWrapper = styled.div`
  display: grid;
`;

const Avatar = styled.img`
  border-radius: 12px;
  width: 100px;
  height: 100px;
`;

const ProjectTitle = styled.h2`
  max-width: 100%;
  margin: auto;
  padding-left: 20px;
  margin-top: 25px;
`;

const ProjectsHolder = styled.div`
  display: flex;
  overflow-x: auto;

  & > div:first-child {
    margin-left: auto;
  }

  & > div:last-child {
    margin-right: auto;
  }

  & > div {
    position: relative;
  }
`;

const ProjectWrapper = styled.div`
  width: 286px;
  height: 321px;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 8px;
  right: 6px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #ff0000;
  color: #fff;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 8px -5px #000;
  line-height: 16px;
  cursor: pointer;
  align-items: center;
`;

const AddProject = styled.div`
  width: 250px;
  height: 285px;
  margin: 18px;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 0px 8px -5px #000;
  border-radius: 8px;

  & > div {
    background: #dee9ff;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin: 10px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
`;

const AddIcon = styled(FaPlusCircle)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  font-size: 61px;
  transform: translate3d(-50%, -50%, 0);
`;

const ChangeButton = styled.button`
  background-color: #f0932b;
  width: 100%;
  height: 32px;
  font-size: 13px;
  text-align: center;
  display: block;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 0;
  color: #ffffff;
  border: 0;
  font-weight: 500;
  box-shadow: 1px 2px 5px -4px #0000005c;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [admin] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3800/user/profile').then(response => {
      setProfileInfo(response.data);
      setBusinessName(response.data['business_name']);
      setDescription(response.data.description);
    });
  }, []);

  return (
    <>
      {profileInfo !== null ? (
        <>
          <Wrapper>
            <AvatarWrapper>
              <Avatar alt="profile" src={profileInfo['profile_picture']} />
              {admin ? <ChangeButton>Change</ChangeButton> : null}
              {admin ? (
                <ChangeButton onClick={logout}>Logout</ChangeButton>
              ) : null}
            </AvatarWrapper>
            <Info>
              <InfoWrapper>
                {admin ? (
                  <NameInput
                    value={businessName}
                    onChange={e => {
                      setBusinessName(e.target.value);
                    }}
                  />
                ) : (
                  <Title>{profileInfo['business_name']}</Title>
                )}
                {admin ? (
                  <textarea
                    onChange={e => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                  />
                ) : (
                  <Description>{profileInfo.description}</Description>
                )}
              </InfoWrapper>
            </Info>
          </Wrapper>
          {admin ? (
            <>
              <ProjectTitle
                style={{
                  width: 250 * profileInfo['open_bids'].length,
                }}
              >
                Open Bids
              </ProjectTitle>
              <ProjectsHolder>
                {profileInfo['open_bids'].map(result => (
                  <ProjectWrapper>
                    <Link to={`/project/${result['business_id']}`}>
                      <JobCard
                        project={result['project_name']}
                        desc={result.description}
                        key={result['business_id']}
                        b_id={result['business_id']}
                        bid={result['current_bid']}
                        b_name={result['business_name']}
                        location={result['location']}
                        image={result['project_photos'][0].image}
                        alt={result['project_photos'][0].title}
                      />
                    </Link>
                  </ProjectWrapper>
                ))}
              </ProjectsHolder>
            </>
          ) : null}
          <ProjectTitle
            style={{
              width:
                250 * profileInfo['user_projects'].length + (admin ? 250 : 0),
            }}
          >
            {admin ? 'Your Jobs' : 'Available Jobs'}
          </ProjectTitle>
          <ProjectsHolder>
            {profileInfo['user_projects'].map(result => (
              <ProjectWrapper>
                {admin ? (
                  <DeleteButton>
                    <FaRegTrashAlt />
                  </DeleteButton>
                ) : null}
                <Link to={`/project/${result['business_id']}`}>
                  <JobCard
                    project={result['project_name']}
                    desc={result.description}
                    key={result['business_id']}
                    b_id={result['business_id']}
                    bid={result['current_bid']}
                    b_name={result['business_name']}
                    location={result['location']}
                    image={result['project_photos'][0].image}
                    alt={result['project_photos'][0].title}
                  />
                </Link>
              </ProjectWrapper>
            ))}
            {admin ? (
              <AddProject>
                <div>
                  <AddIcon />
                </div>
              </AddProject>
            ) : null}
          </ProjectsHolder>
        </>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default Profile;
