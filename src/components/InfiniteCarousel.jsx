import '../stylePages/carousel/App.css';

const brands = [
  { name: "Nike", src: "/companyLogo/nike-logo.png" },
  { name: "Adidas", src: "/companyLogo/adidas-logo.png" },
  { name: "Puma", src: "/companyLogo/puma-logo.png" },
  { name: "Nivia", src: "/companyLogo/nivia-logo.svg" },
  { name: "Under Armour", src: "/companyLogo/ua-logo.png" },
  { name: "Asics", src: "/companyLogo/asics-logo.png" },
  { name: "Reebok", src: "/companyLogo/reebok-logo.png" },
  { name: "Cosco", src: "/companyLogo/cosco-logo.png" },
  { name: "Tyka", src: "/companyLogo/tyka-logo.png" },
  { name: "Anza", src: "/companyLogo/anza-logo.webp" },
];

const InfiniteCarousel = () => {
  // Double the brand array per group to ensure continuous track width on ultra-wide & high-res screens
  const brandList = [...brands, ...brands];

  return (
    <section className="brands-carousel-section" aria-label="Brands we carry">
      <div className="common-container text-center">
        <p className="brands-marquee-title">Trusted Brands & Authorized Retail Partners</p>
      </div>

      <div className="logos-marquee-wrapper">
        <div className="marquee-track">
          <div className="marquee-group">
            {brandList.map((brand, i) => (
              <div className="brand-logo-item" key={`b1-${i}`}>
                <img
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width="120"
                  height="50"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
          <div className="marquee-group" aria-hidden="true">
            {brandList.map((brand, i) => (
              <div className="brand-logo-item" key={`b2-${i}`}>
                <img
                  src={brand.src}
                  alt=""
                  width="120"
                  height="50"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteCarousel;

