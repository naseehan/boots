import styled from "styled-components";

const ContactSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem) 5rem;

  .contact-header {
    text-align: center;
    margin-bottom: clamp(2rem, 5vw, 3.5rem);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.75rem;
    margin-bottom: 3.5rem;
  }

  .contact-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-xl);
    padding: 2.25rem 1.75rem;
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
    transition: transform var(--transition-normal),
                box-shadow var(--transition-normal),
                border-color var(--transition-normal);
  }

  .contact-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-card-hover);
    border-color: var(--brand-amber);
  }

  .contact-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--bg-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: var(--brand-navy);
    margin-bottom: 0.5rem;
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  .contact-card:hover .contact-icon-wrapper {
    background: var(--brand-amber);
    color: var(--brand-navy-dark);
  }

  .contact-card-title {
    font-family: var(--font-heading);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--brand-navy);
    margin: 0;
  }

  .contact-card-info {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--brand-navy);
    margin: 0;
  }

  .contact-card-meta {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin: 0;
  }

  .btn-contact-action {
    margin-top: auto;
    width: 100%;
    padding: 0.65rem 1.25rem;
    border-radius: var(--radius-md);
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all var(--transition-fast);
  }

  .btn-whatsapp-theme {
    background: #25d366;
    color: #ffffff;
    border: none;
  }

  .btn-whatsapp-theme:hover {
    background: #20ba5a;
    color: #ffffff;
  }

  .btn-navy-theme {
    background: var(--brand-navy);
    color: #ffffff;
    border: none;
  }

  .btn-navy-theme:hover {
    background: var(--brand-navy-light);
    color: #ffffff;
  }

  /* Store Location Highlight Card */
  .store-info-banner {
    background: var(--bg-surface);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    padding: clamp(1.5rem, 4vw, 2.5rem);
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2rem;
    align-items: center;
  }

  .store-details-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .store-detail-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .store-detail-icon {
    font-size: 1.25rem;
    color: var(--brand-amber-hover);
    flex-shrink: 0;
    margin-top: 2px;
  }

  @media (max-width: 860px) {
    .store-info-banner {
      grid-template-columns: 1fr;
    }
  }
`;

const Contact = () => {
  return (
    <ContactSection aria-labelledby="contact-heading">
      <div className="contact-header">
        <span className="badge-sports mb-2">Get in Touch</span>
        <h1 id="contact-heading" className="h1-heading">
          Contact Signature Sports
        </h1>
        <p className="section-subtitle mx-auto">
          We’re here to help with product inquiries, bulk gear orders, sizing recommendations, and in-store stock availability.
        </p>
      </div>

      <div className="contact-grid">
        {/* WhatsApp */}
        <article className="contact-card">
          <div className="contact-icon-wrapper" aria-hidden="true">
            <i className="fa-brands fa-whatsapp"></i>
          </div>
          <h2 className="contact-card-title">Chat on WhatsApp</h2>
          <p className="contact-card-info">+91 7034546546</p>
          <p className="contact-card-meta">Instant replies &bull; 7 Days a week</p>
          <a
            href="https://wa.me/917034546546"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact-action btn-whatsapp-theme"
            aria-label="Start WhatsApp conversation with Signature Sports"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
            <span>Chat With Us</span>
          </a>
        </article>

        {/* Phone */}
        <article className="contact-card">
          <div className="contact-icon-wrapper" aria-hidden="true">
            <i className="fa-solid fa-phone"></i>
          </div>
          <h2 className="contact-card-title">Call Us Directly</h2>
          <p className="contact-card-info">+91 7034546546</p>
          <p className="contact-card-meta">9:00 AM - 9:00 PM IST</p>
          <a
            href="tel:+917034546546"
            className="btn-contact-action btn-navy-theme"
            aria-label="Call +91 7034546546"
          >
            <i className="fa-solid fa-phone" aria-hidden="true"></i>
            <span>Call Store</span>
          </a>
        </article>

        {/* Email */}
        <article className="contact-card">
          <div className="contact-icon-wrapper" aria-hidden="true">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <h2 className="contact-card-title">Email Inquiries</h2>
          <p className="contact-card-info">info@signaturesports.com</p>
          <p className="contact-card-meta">Wholesale & tournament orders</p>
          <a
            href="mailto:info@signaturesports.com"
            className="btn-contact-action btn-navy-theme"
            aria-label="Send email to info@signaturesports.com"
          >
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
            <span>Send Email</span>
          </a>
        </article>

        {/* Location */}
        <article className="contact-card">
          <div className="contact-icon-wrapper" aria-hidden="true">
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <h2 className="contact-card-title">Store Location</h2>
          <p className="contact-card-info">Kallambalam, Kerala</p>
          <p className="contact-card-meta">Open Monday through Sunday</p>
          <a
            href="https://www.google.com/maps?q=8.763724781573522,76.79233498368549"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact-action btn-navy-theme"
            aria-label="Open Google Maps for directions to Signature Sports"
          >
            <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i>
            <span>Get Directions</span>
          </a>
        </article>
      </div>

      {/* Store Visit Info Banner */}
      <div className="store-info-banner">
        <div>
          <h2 className="h1-heading" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
            Visit Our Showroom
          </h2>
          <div className="store-details-list">
            <div className="store-detail-item">
              <span className="store-detail-icon">📍</span>
              <div>
                <strong>Physical Address</strong>
                <p>Signature Sports, Main Road, Kallambalam, Kerala 695605, India</p>
              </div>
            </div>
            <div className="store-detail-item">
              <span className="store-detail-icon">⏰</span>
              <div>
                <strong>Operating Hours</strong>
                <p>Monday – Sunday: 9:00 AM – 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            href="https://www.google.com/maps?q=8.763724781573522,76.79233498368549"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-athletic btn-athletic-primary w-100"
          >
            Open in Google Maps &rarr;
          </a>
        </div>
      </div>
    </ContactSection>
  );
};

export default Contact;
