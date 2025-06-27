import React from "react";
import ScrambleText from "../components/ScrambleText";
import styled from "styled-components";

const AboutSection = styled.div`
margin: 2rem;
  @media (max-width: 500px){
    margin: 1rem;
    }
 .scramble p {
    font-size: 13.75rem;
    line-height: .7;
    letter-spacing: -6px;
    font-family: "Kanit", sans-serif;
    font-weight: 800;
    font-style: normal;
    text-transform: uppercase;
  }

    @media (max-width: 1260px){
   .scramble p{
        font-size: 10rem;
    }

    @media (max-width: 920px){
   .scramble p{
        font-size: 4rem;
        letter-spacing: -2px;
        line-height: .8;
    }
    }
  
`;

const About = () => {
  return (
    <AboutSection>
      <div className="scramble">
        <p>WE</p>
        <p>SELL</p>
        <p>
          <ScrambleText />
        </p>
      </div>
      <div style={{ marginTop: "6rem" }}>
        <h1>Who We Are</h1>
        <div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(329px, 1fr))",
            backgroundColor: "#ebebeb",
            padding: "clamp(1rem, 3vw, 3rem)",
          }}
        >
          <p style={{ lineHeight: 2, letterSpacing: ".7px" }}>
            Signature Sports is your trusted sports shop for premium sports gear
            and accessories in{" "}
            <span
              style={{ color: "#FF2E63", fontWeight: 600, fontSize: "22px" }}
            >
              Kallambalam
            </span>
            . We offer a wide range of high-quality football boots, basketball
            shoes, cricket gear, tennis rackets, and fitness accessories to
            support athletes of all levels. <br />
            At Signature Sports, we believe in providing excellent customer
            service, competitive pricing, and expert guidance to help you choose
            the right sports equipment for your goals. Whether you’re training
            for a tournament, playing for fun, or starting your fitness journey,
            we have the gear to enhance your performance and comfort. <br /> Our
            mission is to promote an active lifestyle by making top sports
            brands accessible to everyone. With a commitment to quality and
            reliability, Signature Sports ensures you get the best value for
            your investment in your health and performance. <br /> Visit
            Signature Sports today and experience the difference in your game.
          </p>
          <img
            src="/about/about.jpg"
            alt="about shop"
            loading="lazy"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </AboutSection>
  );
};

export default About;
