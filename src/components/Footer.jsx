import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer
        className="text-center text-lg-start text-dark pt-2"
        style={{ backgroundColor: "#ECEFF1" }}
      >
        {/* Section: Links */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold">Signature Sports</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                 Gear up for greatness with top-quality sportswear, footwear, and equipment for every athlete. Shop the brands you love — all in one place!
                </p>
              </div>

              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-dark">
                    MDBootstrap
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    MDWordPress
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    BrandFlow
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    Bootstrap Angular
                  </a>
                </p>
              </div>

              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-dark">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    Become an Affiliate
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    Shipping Rates
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    Help
                  </a>
                </p>
              </div>

              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home mr-3"></i> Kallambalam, Kerala , India
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> info@example.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i><a href="https://wa.me/919745885553">+ 01 234 567 88</a> 
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>

        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          © 2024 Copyright: 
          <a className="text-dark" href="jr sports">
             signaturesports.com
          </a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
};

export default Footer;
