import React, { useState } from "react";
import { navigate } from "@reach/router";
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

const FormHolder = styled.div`
  width: max-content;
  display: block;
  margin: auto;
  overflow: hidden;
  border-radius: 24px;
  margin-top: 81px;
`;

const Select = styled.select`
  appearance: none;
  line-height: normal;
  position: relative;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDA1LjQ1NiA0MDUuNDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MDUuNDU2IDQwNS40NTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4NCjxnPg0KCTxwYXRoIGQ9Ik03NC4xMzQsNjQuMTQ3Yy00Ljk4NSwwLjA3OC05LjkxMSwyLjE2My0xMy40MzgsNS42ODhsLTU1LDU1QzIuMDk2LDEyOC40MzIsMCwxMzMuNDkyLDAsMTM4LjU4MyAgIHMyLjA5NiwxMC4xNTEsNS42OTcsMTMuNzVsMTgzLjI4MSwxODMuMjgxYzMuNTk5LDMuNjAxLDguNjU5LDUuNjk3LDEzLjc1LDUuNjk3czEwLjE1MS0yLjA5NiwxMy43NS01LjY5N2wxODMuMjgxLTE4My4yODEgICBjMy42MDEtMy41OTksNS42OTctOC42NTksNS42OTctMTMuNzVzLTIuMDk2LTEwLjE1MS01LjY5Ny0xMy43NWwtNTUtNTVjLTMuNTk4LTMuNTkxLTguNjUxLTUuNjgxLTEzLjczNC01LjY4MSAgIGMtNS4wODMsMC0xMC4xMzYsMi4wOS0xMy43MzQsNS42ODFMMjAyLjcyOCwxODQuMzk3TDg4LjE2Niw2OS44MzNDODQuNDk5LDY2LjE2OSw3OS4zMTgsNjQuMDcsNzQuMTM0LDY0LjE0N0w3NC4xMzQsNjQuMTQ3eiIgZmlsbD0iIzk2OTY5NiIvPg0KPC9nPg0KPC9zdmc+DQo=);
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  width: 170px;
  height: 40px;
  border: 1px solid #e6e6e6;
  font-size: 13px;
  text-align: center;
  padding-right: 15px;
  padding-left: 10px;
  border-radius: 0;
`;

const FindBtn = styled.button`
  border: 0;
  background: #02c68d;
  height: 40px;
  color: #fff;
  width: 124px;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
`;

const search = (category, location) => {
  if (category !== "" && location !== "") {
    navigate(`/search?type=${category}&state=${location}`);
  }
};

const Landing = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  return (
    <Layout>
      <NavBar />
      <Hero>
        <Heading>GET YOUR THINGS DONE</Heading>
        <FormHolder>
          <Select
            onChange={e => {
              setCategory(e.target.value);
            }}
            id="select1"
          >
            <option value="" disabled selected>
              Job Type
            </option>
            <option value="Air Conditioning">Air Conditioning</option>
            <option value="Antenna Services">Antenna Services</option>
            <option value="Appliance Installation">
              Appliance Installation
            </option>
            <option value="Appliance Repairs">Appliance Repairs</option>
            <option value="Arborists">Arborists</option>
            <option value="Architects">Architects</option>
            <option value="Asbestos Removal">Asbestos Removal</option>
            <option value="Asphalt Concreting">Asphalt Concreting</option>
            <option value="Awning Suppliers">Awning Suppliers</option>
            <option value="Awnings">Awnings</option>
            <option value="Balustrades">Balustrades</option>
            <option value="Bamboo Flooring">Bamboo Flooring</option>
            <option value="Bath Resurfacing">Bath Resurfacing</option>
            <option value="Bathroom Accessories">
              Bathroom Accessories
            </option>
            <option value="Bathroom Renovations">Bathroom Renovations</option>
            <option value="Blind Suppliers">Blind Suppliers</option>
            <option value="Blinds">Blinds</option>
            <option value="Bricklayers">Bricklayers</option>
            <option value="Builders">Builders</option>
            <option value="Building Certifiers">Building Certifiers</option>
            <option value="Building Consultants">
              Building Consultants
            </option>
            <option value="Building Designers">Building Designers</option>
            <option value="Building Inspections">
              Building Inspections
            </option>
            <option value="Building Suppliers">Building Suppliers</option>
            <option value="Building Surveyors">Building Surveyors</option>
            <option value="Cabinet Makers">Cabinet Makers</option>
            <option value="Carpenters">Carpenters</option>
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Carpet Layers">Carpet Layers</option>
            <option value="Carpet Suppliers">Carpet Suppliers</option>
            <option value="Carpets">Carpets</option>
            <option value="Carports">Carports</option>
            <option value="Ceilings">Ceilings</option>
            <option value="Cladding">Cladding</option>
            <option value="Commercial Cleaning">Commercial Cleaning</option>
            <option value="Concrete Kerbs">Concrete Kerbs</option>
            <option value="Concrete Resurfacing">
              Concrete Resurfacing
            </option>
            <option value="Concreting">Concreting</option>
            <option value="Curtains">Curtains</option>
            <option value="Custom Furniture">Custom Furniture</option>
            <option value="Damp Proofing">Damp Proofing</option>
            <option value="Decking">Decking</option>
            <option value="Demolition">Demolition</option>
            <option value="Door Suppliers">Door Suppliers</option>
            <option value="Doors">Doors</option>
            <option value="Drafting">Drafting</option>
            <option value="Drains">Drains</option>
            <option value="Electricians">Electricians</option>
            <option value="Equipment Hire">Equipment Hire</option>
            <option value="Excavation">Excavation</option>
            <option value="Fencing">Fencing</option>
            <option value="Fireplaces">Fireplaces</option>
            <option value="Floor Coatings">Floor Coatings</option>
            <option value="Floor Sanding">Floor Sanding</option>
            <option value="Fly Screens">Fly Screens</option>
            <option value="Garages">Garages</option>
            <option value="Garden Designers">Garden Designers</option>
            <option value="Garden Supplies">Garden Supplies</option>
            <option value="Gardeners">Gardeners</option>
            <option value="Gas Fitters">Gas Fitters</option>
            <option value="Gates">Gates</option>
            <option value="Gazebo">Gazebo</option>
            <option value="Glass Balustrades">Glass Balustrades</option>
            <option value="Glass Suppliers">Glass Suppliers</option>
            <option value="Glazier">Glazier</option>
            <option value="Gutter Cleaning">Gutter Cleaning</option>
            <option value="Gutter Protection">Gutter Protection</option>
            <option value="Guttering">Guttering</option>
            <option value="Handrails">Handrails</option>
            <option value="Handyman">Handyman</option>
            <option value="Heaters">Heaters</option>
            <option value="Heating Systems">Heating Systems</option>
            <option value="Home Renovations">Home Renovations</option>
            <option value="Home Security">Home Security</option>
            <option value="Home Theatre">Home Theatre</option>
            <option value="Hot Water Systems">Hot Water Systems</option>
            <option value="House Cleaning">House Cleaning</option>
            <option value="IKEA Bathrooms">IKEA Bathrooms</option>
            <option value="IKEA Kitchen Installers">
              IKEA Kitchen Installers
            </option>
            <option value="Insulation">Insulation</option>
            <option value="Interior Decorators">Interior Decorators</option>
            <option value="Interior Designers">Interior Designers</option>
            <option value="Irrigation Systems">Irrigation Systems</option>
            <option value="Joiners">Joiners</option>
            <option value="Kitchen Designers">Kitchen Designers</option>
            <option value="Kitchens">Kitchens</option>
            <option value="Landscape Architecture">
              Landscape Architecture
            </option>
            <option value="Landscapers">Landscapers</option>
            <option value="Lawn &amp; Turf">Lawn &amp; Turf</option>
            <option value="Lawn Mowing">Lawn Mowing</option>
            <option value="Lighting">Lighting</option>
            <option value="Limestone">Limestone</option>
            <option value="Locksmiths">Locksmiths</option>
            <option value="Mirrors">Mirrors</option>
            <option value="Painters">Painters</option>
            <option value="Patios">Patios</option>
            <option value="Pavers">Pavers</option>
            <option value="Pergolas">Pergolas</option>
            <option value="Pest Control">Pest Control</option>
            <option value="Pest Inspections">Pest Inspections</option>
            <option value="Plastering">Plastering</option>
            <option value="Plumbers">Plumbers</option>
            <option value="Pool Fencing">Pool Fencing</option>
            <option value="Pool Heating">Pool Heating</option>
            <option value="Pool Maintenance">Pool Maintenance</option>
            <option value="Pressure Cleaner">Pressure Cleaner</option>
            <option value="Privacy Screens">Privacy Screens</option>
            <option value="Rain Water Tanks">Rain Water Tanks</option>
            <option value="Removalists">Removalists</option>
            <option value="Render">Render</option>
            <option value="Rendering">Rendering</option>
            <option value="Retaining Walls">Retaining Walls</option>
            <option value="Roller Doors">Roller Doors</option>
            <option value="Roller Shutters">Roller Shutters</option>
            <option value="Roof Repairs">Roof Repairs</option>
            <option value="Roofing">Roofing</option>
            <option value="Rubbish Removal">Rubbish Removal</option>
            <option value="Scaffolding">Scaffolding</option>
            <option value="Security Screen Doors">
              Security Screen Doors
            </option>
            <option value="Shade Sails">Shade Sails</option>
            <option value="Sheds">Sheds</option>
            <option value="Shopfitters">Shopfitters</option>
            <option value="Shower Repairs">Shower Repairs</option>
            <option value="Shower Screens">Shower Screens</option>
            <option value="Shutters">Shutters</option>
            <option value="Skip &amp; Truck Hire">
              Skip &amp; Truck Hire
            </option>
            <option value="Skylights">Skylights</option>
            <option value="Solar Power">Solar Power</option>
            <option value="Splashbacks">Splashbacks</option>
            <option value="Staircases">Staircases</option>
            <option value="Stonemasons">Stonemasons</option>
            <option value="Storage">Storage</option>
            <option value="Structural Engineer">Structural Engineer</option>
            <option value="Surveyor">Surveyor</option>
            <option value="Swimming Pool Builders">
              Swimming Pool Builders
            </option>
            <option value="Tilers">Tilers</option>
            <option value="Timber Flooring">Timber Flooring</option>
            <option value="Town Planning Services">
              Town Planning Services
            </option>
            <option value="Tree Fellers">Tree Fellers</option>
            <option value="Trusses">Trusses</option>
            <option value="Underfloor Heating Systems">
              Underfloor Heating Systems
            </option>
            <option value="Underpinning">Underpinning</option>
            <option value="Upholstery Repair">Upholstery Repair</option>
            <option value="Ventilation">Ventilation</option>
            <option value="Verandahs">Verandahs</option>
            <option value="Vinyl &amp; Laminate">
              Vinyl &amp; Laminate
            </option>
            <option value="Wallpapering">Wallpapering</option>
            <option value="Wardrobes">Wardrobes</option>
            <option value="Water Features">Water Features</option>
            <option value="Waterproofing">Waterproofing</option>
            <option value="Window Cleaning">Window Cleaning</option>
            <option value="Window Repair">Window Repair</option>
            <option value="Window Tinting">Window Tinting</option>
            <option value="Windows">Windows</option>
          </Select>
          <Select
            onChange={e => {
              setLocation(e.target.value);
            }}
            id="select2"
          >
            <option value="" disabled selected>
              Location
            </option>
            <option value="ACT">ACT</option>
            <option value="NSW">NSW</option>
            <option value="SA">SA</option>
            <option value="VIC">VIC</option>
            <option value="js">WA</option>
          </Select>
          <FindBtn
            onClick={() => {
              search(category, location);
            }}
          >
            FIND
          </FindBtn>
        </FormHolder>
      </Hero>
    </Layout>
  );
};

export default Landing;
