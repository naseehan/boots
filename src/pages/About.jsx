import ScrambleText from "../components/ScrambleText";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AboutWrapper = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem) 5rem;

  .scramble-hero {
    margin-bottom: clamp(3rem, 6vw, 5rem);
  }

  .scramble p {
    font-size: clamp(3.25rem, 11vw, 9.5rem);
    line-height: 0.85;
    letter-spacing: -0.04em;
    font-family: var(--font-heading);
    font-weight: 800;
    text-transform: uppercase;
    color: var(--brand-navy);
    margin: 0;
  }

  .scramble-dynamic {
    color: var(--brand-amber-hover) !important;
  }

  .about-story-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    padding: clamp(1.5rem, 4vw, 3rem);
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: clamp(2rem, 4vw, 3.5rem);
    align-items: center;
  }

  .about-text-content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .about-highlight-city {
    color: var(--brand-amber-hover);
    font-weight: 700;
  }

  .about-img-box {
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-light);
    height: 100%;
    min-height: 320px;
  }

  .about-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-smooth);
  }

  .about-img-box:hover img {
    transform: scale(1.04);
  }

  .about-values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-top: 3.5rem;
  }

  .value-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    box-shadow: var(--shadow-xs);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  }

  .value-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card-hover);
    border-color: var(--brand-amber);
  }

  .value-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    display: inline-block;
  }

  .value-title {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--brand-navy);
    margin-bottom: 0.5rem;
  }

  .value-desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 991px) {
    .about-story-card {
      grid-template-columns: 1fr;
    }
    .about-img-box {
      max-height: 350px;
    }
  }
`;

const About = () => {
  return (
    <AboutWrapper aria-label="About Signature Sports">
      {/* Dynamic Animated Header */}
      <div className="scramble-hero">
        <span className="badge-sports mb-3">Our Core Promise</span>
        <div className="scramble" aria-label="We sell premium athletic gear">
          <p>WE</p>
          <p>SELL</p>
          <p className="scramble-dynamic">
            <ScrambleText />
          </p>
        </div>
      </div>

      {/* Main Story Card */}
      <div className="about-story-section">
        <h2 className="h1-heading mb-4">Who We Are</h2>
        <div className="about-story-card">
          <div className="about-text-content">
            <p>
              <strong>Signature Sports</strong> is Kallambalam’s trusted destination
              for genuine sports gear, footwear, and accessories. Located in the
              heart of{" "}
              <span className="about-highlight-city">Kallambalam, Kerala</span>, we
              cater to athletes of all ages and disciplines — from aspiring footballers
              and cricket players to badminton enthusiasts and fitness lovers.
            </p>
            <p>
              We believe quality equipment is the catalyst for peak athletic performance.
              That’s why every product on our shelves is hand-selected from top global
              and national sports brands to deliver unmatched comfort, durability, and agility.
            </p>
            <p>
              Whether you need expert boot fitting, racket stringing guidance, match-ready
              balls, or team sportswear, our experienced in-store team is here to support
              your sports journey every step of the way.
            </p>
            <div>
              <Link to="/contact" className="btn-athletic btn-athletic-dark">
                Visit Our Store &rarr;
              </Link>
            </div>
          </div>

          <div className="about-img-box">
            <img
              src="/about/about.jpg"
              alt="Inside Signature Sports Store in Kallambalam"
              loading="lazy"
              width="500"
              height="400"
            />
          </div>
        </div>
      </div>

      {/* Brand Value Pillars */}
      <div className="about-values-grid">
        <div className="value-card">
          <span className="value-icon" aria-hidden="true">🏆</span>
          <h3 className="value-title">100% Genuine Gear</h3>
          <p className="value-desc">
            Direct partnerships with official manufacturers ensure you always receive authentic, certified gear.
          </p>
        </div>

        <div className="value-card">
          <span className="value-icon" aria-hidden="true">🎯</span>
          <h3 className="value-title">Expert Sport Guidance</h3>
          <p className="value-desc">
            Our knowledgeable staff helps you select the right footwear sole, racquet tension, and ball weight for your game.
          </p>
        </div>

        <div className="value-card">
          <span className="value-icon" aria-hidden="true">🤝</span>
          <h3 className="value-title">Community First</h3>
          <p className="value-desc">
            Proudly supporting local clubs, tournaments, schools, and young athletes across Kallambalam and Trivandrum.
          </p>
        </div>
      </div>
    </AboutWrapper>
  );
};

export default About;

