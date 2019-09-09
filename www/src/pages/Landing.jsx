import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";

const Heading = styled.h2`
  width: 100%;
  text-align: center;
  color: #ffffff;
  margin: 0;
  font-size: 35px;
  font-weight: 800;
  padding-top: 135px;
`;

const Landing = () => (
  <Layout>
    <NavBar />
    <Hero>
      <Heading>GET YOUR THINGS DONE</Heading>
    </Hero>
  </Layout>
);

export default Landing;
