import React from "react";
import ScrambleText from "../components/ScrambleText";
import styled from "styled-components";

const AboutSection = styled.div`
margin: 2rem;
  p {
    font-size: 13.75rem;
    line-height: .7;
    letter-spacing: -6px;
    font-family: "Kanit", sans-serif;
    font-weight: 800;
    font-style: normal;
    text-transform: uppercase;
  }
`;

const About = () => {
  return (
    <AboutSection>
      <p>WE</p>
      <p>SELL</p>
      <p>
        <ScrambleText />
      </p>
    </AboutSection>
    
  );
};

export default About;
