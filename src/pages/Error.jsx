import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const ErrorWrapper = styled.section`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  max-width: 600px;
  margin: 0 auto;

  .error-code-badge {
    font-family: var(--font-heading);
    font-size: clamp(5rem, 12vw, 8rem);
    font-weight: 800;
    color: var(--brand-amber-hover);
    line-height: 1;
    margin: 0 0 1rem;
    letter-spacing: -0.04em;
  }

  .error-heading {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 700;
    color: var(--brand-navy);
    margin: 0 0 1rem;
  }

  .error-desc {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .error-btn-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Error = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper aria-labelledby="error-404-title">
      <div className="error-code-badge" aria-hidden="true">404</div>
      <h1 id="error-404-title" className="error-heading">
        Page Off Target
      </h1>
      <p className="error-desc">
        The page you are looking for might have been moved, removed, or doesn&apos;t exist.
        Head back to explore our sports collections or visit our store.
      </p>

      <div className="error-btn-group">
        <button
          className="btn-athletic btn-athletic-primary"
          onClick={() => navigate("/")}
        >
          &larr; Back to Home
        </button>
        <Link to="/products" className="btn-athletic btn-athletic-dark">
          Browse Products
        </Link>
      </div>
    </ErrorWrapper>
  );
};

export default Error;

