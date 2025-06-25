import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 4rem 1rem;
  gap: 2rem;
`;
const ErrorText = styled.p`
  color: rgb(158 158 158 / 1);
  font-size: 18px;
  font-weight: 400;
  margin: 1rem auto 2rem;
  line-height: 1.625;
  font-family: Inter, sans-serif;
  letter-spacing: 0.2px;
  max-width: 25rem;
`;
const ErrorIcon = styled.i`
  font-size: 76px !important;
  margin: 2rem auto;
`;
const ErrorButton = styled.button`
  background-color: #000;
  color: #fff;
  font-size: 0.75rem;
  margin: 0 auto;
  max-width: 8rem;
  font-weight: 700;
  border-radius: 6px;
  padding: 16px 25px;
`;

const Error = () => {

const navigate = useNavigate()

  return (
    <ErrorContainer>
      <ErrorIcon className="fa-solid fa-flag fa-2xl"></ErrorIcon>
      <div>
        <h1>Error 404</h1>
        <h1>It looks like something went wrong.</h1>
      </div>

      <ErrorText>
        Don't worry, our team is already on it. Please  try refreshing the
        page or come back later.
      </ErrorText>
      <ErrorButton onClick={() => navigate('/')}>BACK HOME</ErrorButton>
    </ErrorContainer>
  );
};

export default Error;
