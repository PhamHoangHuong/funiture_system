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

      {/* Address section */}
      <section className="address-section pt-140 overflow-hidden">
        <div className="container-1700">
          <div className="row g-5">
            {['Berlin', 'Tokyo', 'Paris', 'Dieburg'].map((city) => (
              <div key={city} className="col-xl-3 col-lg-4 col-sm-6">
                <div className="address-single">
                  <h5 className="mb-50 fw-normal hm2-font-family">{city}</h5>
                  <div className="footer-address">
                    <a href="tel:256-31556.2369">+256-31556.2369</a><br />
                    <a href="mailto:hello@Venturifur.com" className="mail">hello@Venturifur.com</a>
                    <p className="mt-32">219 Geom Street. UYS Office 215 Frankfurt-Germany</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form section */}
      <section className="contact-form-section pt-120 pb-140 overflow-hidden">
        <div className="container-1700">
          <div className="row align-items-center g-5">
            <div className="col-xl-7 col-md-6">
              <div className="google-map-wrapper">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.4184267668!2d106.36555353480477!3d10.755292873944828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1729682090729!5m2!1svi!2s" width="100%"
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

