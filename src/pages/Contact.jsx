import React from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  margin-top: 4rem;
  justify-content: center;
  text-align: center;
  gap: 3rem;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  @media (max-width: 810px){
  border-bottom: 1px solid #9DB2BF;
  padding-bottom: 1rem;
  }
`;

const ContactIcon = styled.i`
margin-bottom: 0.6rem;
`

const Contact = () => {
  return (
    <section className="contact-section" style={{ margin: "7rem" }}>
      <h1
        className="border-bottom pb-2"
        style={{ borderBottomColor: "#9DB2BF" }}
      >
        Contact Us
      </h1>
      <ContactContainer>

        <ContactItem onClick={() => ( window.open(
      `https://wa.me/917034546546`,
      "_blank"
    ))} style={{cursor: "pointer"}}>
          <ContactIcon className="fa-brands fa-whatsapp fa-2xl"></ContactIcon>
          <p>Chat with us</p>
          <p>+91 7034546546</p>
          <p>7 days a week</p>
        </ContactItem>

        <ContactItem>
          <ContactIcon className="fa-solid fa-mobile fa-2xl"></ContactIcon>
          <p>Call us</p>
          <p>+91 7034546546</p>
          <p>7 days a week</p>
        </ContactItem>

        <ContactItem>
          <ContactIcon className="fa-solid fa-envelope fa-2xl"></ContactIcon>
          <p>Email us</p>
          <p>We'll reply within five business day</p>
        </ContactItem>

        <ContactItem>
          <ContactIcon className="fa-solid fa-location-dot fa-2xl"></ContactIcon>
          <button onClick={() =>
    window.open(
      "https://www.google.com/maps?q=8.7637775,76.7927009", "_blank"
    )
  }>Find Our Store</button>
        </ContactItem>

      </ContactContainer>
    </section>
  );
};

export default Contact;
