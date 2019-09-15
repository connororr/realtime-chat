import React from "react";
//import { Link } from "@reach/router";
import Layout from "../components/Layout";
//import styled from "styled-components";
import NavBar from "../components/NavBar";

const Project = props => (
  <Layout>
    <NavBar />
    {props.bid}
  </Layout>
);

export default Project;
