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

    @media (max-width: 1260px){
    p{
        font-size: 10rem;
    }

    @media (max-width: 920px){
    p{
        font-size: 4rem;
        letter-spacing: -2px;
        line-height: .8;
    }
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
