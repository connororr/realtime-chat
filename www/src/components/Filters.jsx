import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 204px;
  height: calc(100vh - 66px);
  background: #86b5a7;
  float: left;
`;

const Title = styled.h3`
  color: #fff;
  width: 100%;
  text-align: center;
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
  display: block;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 14px;
`;

const SearchInput = styled.input`
  width: 170px;
  height: 40px;
  border: 1px solid #e6e6e6;
  font-size: 13px;
  text-align: center;
  display: block;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 14px;
`;

const Button = styled.button`
  background-color: #02c68d;
  width: 170px;
  height: 40px;
  font-size: 13px;
  text-align: center;
  display: block;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 14px;
  color: #ffffff;
  border: 0;
  font-weight: 500;
  box-shadow: 1px 2px 5px -4px #0000005c;
  cursor: pointer;
`;

const Filters = () => {
  return (
    <Wrapper>
      <Title>Filters</Title>
      <SearchInput placeholder="Search.." value=""/>
      <Select>
        <option value="" disabled selected>
          Job Type
        </option>
        <option value="48|Air Conditioning">Air Conditioning</option>
        <option value="145|Antenna Services">Antenna Services</option>
        <option value="1424|Appliance Installation">
          Appliance Installation
        </option>
        <option value="99|Appliance Repairs">Appliance Repairs</option>
        <option value="47|Arborists">Arborists</option>
        <option value="1|Architects">Architects</option>
        <option value="89|Asbestos Removal">Asbestos Removal</option>
        <option value="355|Asphalt Concreting">Asphalt Concreting</option>
        <option value="225|Awning Suppliers">Awning Suppliers</option>
        <option value="124|Awnings">Awnings</option>
        <option value="86|Balustrades">Balustrades</option>
        <option value="1148|Bamboo Flooring">Bamboo Flooring</option>
        <option value="18|Bath Resurfacing">Bath Resurfacing</option>
        <option value="100|Bathroom Accessories">Bathroom Accessories</option>
        <option value="3|Bathroom Renovations">Bathroom Renovations</option>
        <option value="451|Blind Suppliers">Blind Suppliers</option>
        <option value="122|Blinds">Blinds</option>
        <option value="51|Bricklayers">Bricklayers</option>
        <option value="5|Builders">Builders</option>
        <option value="148|Building Certifiers">Building Certifiers</option>
        <option value="56|Building Consultants">Building Consultants</option>
        <option value="43|Building Designers">Building Designers</option>
        <option value="72|Building Inspections">Building Inspections</option>
        <option value="50|Building Suppliers">Building Suppliers</option>
        <option value="149|Building Surveyors">Building Surveyors</option>
        <option value="4|Cabinet Makers">Cabinet Makers</option>
        <option value="19|Carpenters">Carpenters</option>
        <option value="23|Carpet Cleaning">Carpet Cleaning</option>
        <option value="6|Carpet Layers">Carpet Layers</option>
        <option value="769|Carpet Suppliers">Carpet Suppliers</option>
        <option value="125|Carpets">Carpets</option>
        <option value="98|Carports">Carports</option>
        <option value="1437|Ceilings">Ceilings</option>
        <option value="82|Cladding">Cladding</option>
        <option value="93|Commercial Cleaning">Commercial Cleaning</option>
        <option value="102|Concrete Kerbs">Concrete Kerbs</option>
        <option value="143|Concrete Resurfacing">Concrete Resurfacing</option>
        <option value="22|Concreting">Concreting</option>
        <option value="123|Curtains">Curtains</option>
        <option value="137|Custom Furniture">Custom Furniture</option>
        <option value="103|Damp Proofing">Damp Proofing</option>
        <option value="58|Decking">Decking</option>
        <option value="42|Demolition">Demolition</option>
        <option value="328|Door Suppliers">Door Suppliers</option>
        <option value="66|Doors">Doors</option>
        <option value="41|Drafting">Drafting</option>
        <option value="1367|Drains">Drains</option>
        <option value="8|Electricians">Electricians</option>
        <option value="24|Equipment Hire">Equipment Hire</option>
        <option value="76|Excavation">Excavation</option>
        <option value="25|Fencing">Fencing</option>
        <option value="459|Fireplaces">Fireplaces</option>
        <option value="139|Floor Coatings">Floor Coatings</option>
        <option value="88|Floor Sanding">Floor Sanding</option>
        <option value="68|Fly Screens">Fly Screens</option>
        <option value="96|Garages">Garages</option>
        <option value="49|Garden Designers">Garden Designers</option>
        <option value="70|Garden Supplies">Garden Supplies</option>
        <option value="78|Gardeners">Gardeners</option>
        <option value="1142|Gas Fitters">Gas Fitters</option>
        <option value="128|Gates">Gates</option>
        <option value="106|Gazebo">Gazebo</option>
        <option value="1183|Glass Balustrades">Glass Balustrades</option>
        <option value="874|Glass Suppliers">Glass Suppliers</option>
        <option value="27|Glazier">Glazier</option>
        <option value="142|Gutter Cleaning">Gutter Cleaning</option>
        <option value="1185|Gutter Protection">Gutter Protection</option>
        <option value="71|Guttering">Guttering</option>
        <option value="132|Handrails">Handrails</option>
        <option value="55|Handyman">Handyman</option>
        <option value="1189|Heaters">Heaters</option>
        <option value="87|Heating Systems">Heating Systems</option>
        <option value="54|Home Renovations">Home Renovations</option>
        <option value="44|Home Security">Home Security</option>
        <option value="62|Home Theatre">Home Theatre</option>
        <option value="108|Hot Water Systems">Hot Water Systems</option>
        <option value="65|House Cleaning">House Cleaning</option>
        <option value="1443|IKEA Bathrooms">IKEA Bathrooms</option>
        <option value="1428|IKEA Kitchen Installers">
          IKEA Kitchen Installers
        </option>
        <option value="59|Insulation">Insulation</option>
        <option value="7|Interior Decorators">Interior Decorators</option>
        <option value="39|Interior Designers">Interior Designers</option>
        <option value="109|Irrigation Systems">Irrigation Systems</option>
        <option value="134|Joiners">Joiners</option>
        <option value="1128|Kitchen Designers">Kitchen Designers</option>
        <option value="10|Kitchens">Kitchens</option>
        <option value="28|Landscape Architecture">
          Landscape Architecture
        </option>
        <option value="2|Landscapers">Landscapers</option>
        <option value="84|Lawn &amp; Turf">Lawn &amp; Turf</option>
        <option value="95|Lawn Mowing">Lawn Mowing</option>
        <option value="110|Lighting">Lighting</option>
        <option value="1386|Limestone">Limestone</option>
        <option value="29|Locksmiths">Locksmiths</option>
        <option value="111|Mirrors">Mirrors</option>
        <option value="12|Painters">Painters</option>
        <option value="81|Patios">Patios</option>
        <option value="26|Pavers">Pavers</option>
        <option value="57|Pergolas">Pergolas</option>
        <option value="30|Pest Control">Pest Control</option>
        <option value="92|Pest Inspections">Pest Inspections</option>
        <option value="31|Plastering">Plastering</option>
        <option value="11|Plumbers">Plumbers</option>
        <option value="144|Pool Fencing">Pool Fencing</option>
        <option value="1209|Pool Heating">Pool Heating</option>
        <option value="94|Pool Maintenance">Pool Maintenance</option>
        <option value="64|Pressure Cleaner">Pressure Cleaner</option>
        <option value="1212|Privacy Screens">Privacy Screens</option>
        <option value="75|Rain Water Tanks">Rain Water Tanks</option>
        <option value="91|Removalists">Removalists</option>
        <option value="1214|Render">Render</option>
        <option value="46|Rendering">Rendering</option>
        <option value="74|Retaining Walls">Retaining Walls</option>
        <option value="1307|Roller Doors">Roller Doors</option>
        <option value="1216|Roller Shutters">Roller Shutters</option>
        <option value="90|Roof Repairs">Roof Repairs</option>
        <option value="13|Roofing">Roofing</option>
        <option value="34|Rubbish Removal">Rubbish Removal</option>
        <option value="32|Scaffolding">Scaffolding</option>
        <option value="67|Security Screen Doors">Security Screen Doors</option>
        <option value="52|Shade Sails">Shade Sails</option>
        <option value="97|Sheds">Sheds</option>
        <option value="146|Shopfitters">Shopfitters</option>
        <option value="1423|Shower Repairs">Shower Repairs</option>
        <option value="113|Shower Screens">Shower Screens</option>
        <option value="21|Shutters">Shutters</option>
        <option value="40|Skip &amp; Truck Hire">Skip &amp; Truck Hire</option>
        <option value="33|Skylights">Skylights</option>
        <option value="1147|Solar Power">Solar Power</option>
        <option value="121|Splashbacks">Splashbacks</option>
        <option value="61|Staircases">Staircases</option>
        <option value="77|Stonemasons">Stonemasons</option>
        <option value="138|Storage">Storage</option>
        <option value="104|Structural Engineer">Structural Engineer</option>
        <option value="115|Surveyor">Surveyor</option>
        <option value="129|Swimming Pool Builders">
          Swimming Pool Builders
        </option>
        <option value="35|Tilers">Tilers</option>
        <option value="15|Timber Flooring">Timber Flooring</option>
        <option value="218|Town Planning Services">
          Town Planning Services
        </option>
        <option value="37|Tree Fellers">Tree Fellers</option>
        <option value="105|Trusses">Trusses</option>
        <option value="458|Underfloor Heating Systems">
          Underfloor Heating Systems
        </option>
        <option value="1438|Underpinning">Underpinning</option>
        <option value="117|Upholstery Repair">Upholstery Repair</option>
        <option value="118|Ventilation">Ventilation</option>
        <option value="1364|Verandahs">Verandahs</option>
        <option value="45|Vinyl &amp; Laminate">Vinyl &amp; Laminate</option>
        <option value="80|Wallpapering">Wallpapering</option>
        <option value="79|Wardrobes">Wardrobes</option>
        <option value="119|Water Features">Water Features</option>
        <option value="53|Waterproofing">Waterproofing</option>
        <option value="85|Window Cleaning">Window Cleaning</option>
        <option value="36|Window Repair">Window Repair</option>
        <option value="83|Window Tinting">Window Tinting</option>
        <option value="16|Windows">Windows</option>
      </Select>
      <Select>
        <option value="" disabled selected>
          Location
        </option>
        <option value="ACT">ACT</option>
        <option value="NSW">NSW</option>
        <option value="SA">SA</option>
        <option value="VIC">VIC</option>
        <option value="js">WA</option>
      </Select>
      <Button>Apply</Button>
    </Wrapper>
  );
};

export default Filters;
