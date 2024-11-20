import React from 'react';

const Contact: React.FC = () => {
  return (
    <>
      {/* Breadcrumb section */}
      <div className="breadcrumb-section pt-40 pb-40">
        <div className="container-1700">
          <p className="breadcrumb-text mb-0">
            <a href="/">Home</a> / <span className="text-main-color">Contact</span>
          </p>
        </div>
      </div>
      {/* Contact form section */}
      <section className="contact-form-section pt-20 pb-20 overflow-hidden">
        <div className="container-1700">
          <div className="row align-items-center g-5">
            <div className="col-xl-7 col-md-6">
              <div className="google-map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5414698974473!2d106.63467557430442!3d10.846359457901357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752922c4467389%3A0x2a2d40bf0b428a91!2zMTM5MiDEkC4gUXVhbmcgVHJ1bmcsIFBoxrDhu51uZyAxNCwgR8OyIFbhuqVwLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1730904670843!5m2!1svi!2s" width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="ct-form--wrapper">
                <h2 className="fs-40 fw-regular hm2-font-family mb-30">Get a Quote</h2>
                <p className="mb-50">Don't worry, we don't spam your email</p>
                <form className="ct-contact-form" action="#">
                  <input type="text" className="theme-input" placeholder="Your Name*" />
                  <input type="email" className="theme-input" placeholder="Your Email*" />
                  <textarea className="theme-input" placeholder="Your Message Here*" rows={6}></textarea>
                  <button type="submit" className="template-btn primary-btn">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

