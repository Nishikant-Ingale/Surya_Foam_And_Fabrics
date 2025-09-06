import React, { useEffect } from 'react';
import '../styles/About.css';

const About = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.about-para');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('visible');
      }, index * 300);
    });
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Surya Foam & Fabrics</h1>
        <p className="about-tagline">
          Crafting Comfort & Elegance for Your Home Since 1995
        </p>
      </section>

      {/* Sleek Paragraph Section */}
      <section className="about-text-section">
        <p className="about-para">
          Surya Foam and Fabrics has proudly shaped homes and hearts since 1995,
          building a reputation as a benchmark in curated, sustainable home
          furnishings throughout India. For more than three decades, this
          company has specialized in crafting luxurious curtains, sofas,
          mattresses, carpets, and a broad range of home decor pieces—each
          design merging modern innovation with the graceful traditions of
          Indian artistry.
        </p>
        <p className="about-para">
          Staying ahead of trends, Surya Foam and Fabrics partners with renowned
          brands to offer an extensive selection tailored to every unique taste
          and requirement. The team's commitment does not stop at workmanship; it
          extends into every stage of the journey, from careful sourcing to
          efficient delivery, guaranteeing premium quality, sophistication, and
          long-lasting comfort.
        </p>
        <p className="about-para">
          Customer happiness remains at the heart of Surya Foam and Fabrics'
          ethos. The company is dedicated to positive, transparent experiences
          and attentive service, honoring its promises and adapting to the
          discerning needs of the Indian market. Its mission is to create homes
          that foster emotional connections, where every product brings joy,
          comfort, and satisfaction.
        </p>
      </section>
    </div>
  );
};

export default About;
