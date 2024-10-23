import React from 'react';
import { Link } from 'react-router-dom';

const BlogDetails: React.FC = () => {
  return (
    <section className="blog-single-section ptb-120 bg-white">
      <div className="container">
        <div className="row g-5 g-xl-4">    
          <div className="col-xl-8">
            <div className="blog-single-content">
              <img src="/assets/user/images/blog/blog-lg-1.jpg" alt="not found" className="img-fluid mb-5" />
              <p className="fs-sm fw-light text-color mb-3">September 25, 2022 - By David Smith - In Jewelry</p>
              <h3 className="mb-40 fw-normal">Praesent sapien massa convallis a pellentesque</h3>
              <p className="fw-light text-color">Donec rutrum congue leo eget malesuada. Curabitur aliquet quam posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpa estibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
              <p className="mb-60 fw-light text-color">Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada urabitur non nulla sit amet nisl tempus</p>
            
              <div className="tags-social d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="tags-list">
                  <span className="title fw-medium me-2">Tags:</span>
                  <Link to="#">Car Dealership</Link>
                  <Link to="#">Breaks Discs</Link>
                  <Link to="#">Car Shop</Link>
                </div>
                <div className="social-share">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-behance"></i></a>
                </div>
              </div>

              <div className="spacer mt-60 mb-60"></div>
              
              <div className="blog-author">
                <h3 className="mb-40">Author</h3>
                <div className="blog-author-box d-flex align-items-center gap-4 flex-wrap flex-md-nowrap">
                  <div className="author-thumb">
                    <img src="/assets/user/images/clients/author-1.jpg" alt="author" className="img-fluid" />
                  </div>
                  <div>
                    <h4 className="mb-4 fw-normal">David Walton</h4>
                    <p className="mb-4 fw-light text-color">Donec sollicitudin molestie malesuada. Pellentesque in ipsum id orci porta dapibus ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo orem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="author-socials">
                      <a href="#"><i className="fab fa-facebook-f"></i></a>
                      <a href="#"><i className="fab fa-twitter"></i></a>
                      <a href="#"><i className="fab fa-dribbble"></i></a>
                    </div>
                  </div>
                </div>
              </div>  
            
              <div className="spacer mt-60 mb-60"></div>

              <div className="blog-comments">
                <h3 className="mb-2 fw-normal">Comments</h3>
                <ul className="blog-comment-list">
                  <li className="d-flex align-items-center gap-4 flex-wrap flex-md-nowrap">
                    <div className="client-thumb">
                      <img src="/assets/user/images/clients/client-1.jpg" alt="not found" className="img-fluid" />
                    </div>
                    <div className="position-relative">
                      <span className="fw-light fs-sm text-color">Sep 25, 2022</span>
                      <h4 className="mb-3 mt-1">Amalia Genner</h4>
                      <p className="fw-light text-color mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed convallis at tellus ivamus suscipit tortor eget felis porttitor volutpat.</p>
                      <button type="button" className="reply-btn">Reply</button>
                    </div>
                  </li>
                  {/* Add more comment list items here */}
                </ul>
              </div>

              <div className="blog-review-form mt-5">
                <h3 className="mb-3 fw-normal">Add a Review</h3>
                <p className="mb-4">Your email address will not be published. Required fields are marked*</p>

                <form>
                  <div className="row align-items-center g-4">
                    <div className="col-sm-6">
                      <div className="input-field">
                        <input type="text" placeholder="Your Name*" className="theme-input fw-light" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-field">
                        <input type="text" placeholder="Your Email*" className="theme-input fw-light" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="input-field">
                        <textarea placeholder="Your Reviews*" className="theme-input fw-light" rows={6}></textarea>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="template-btn primary-btn mt-4"><span>Submit Now</span></button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="blog-sidebar">
              <div className="sidebar-widget search-widget">
                <h4 className="widget-title position-relative fw-normal mb-5">Search Here</h4>
                <form>
                  <input type="text" placeholder="Search Here..." className="theme-input fw-light" />
                </form>
              </div>
              <div className="sidebar-widget categories-widget mt-60">
                <h4 className="widget-title position-relative fw-normal mb-5">Categories</h4>
                <ul className="sidebar-check-fields">
                  <li><label><input type="checkbox" /> <span>Latest News</span></label></li>
                  <li><label><input type="checkbox" /> <span>Today Best Posts</span></label></li>
                  <li><label><input type="checkbox" /> <span>Design Trend</span></label></li>
                  <li><label><input type="checkbox" /> <span>UI/UX Trend</span></label></li>
                  <li><label><input type="checkbox" /> <span>Brand Design</span></label></li>
                </ul>
              </div>
              <div className="sidebar-widget latest-post-widget mt-60">
                <h4 className="widget-title position-relative fw-normal mb-5">Latest Posts</h4>
                <ul className="latest-posts">
                  <li className="d-flex align-items-center gap-3">
                    <div className="feature-image pe-1">
                      <Link to="/product-details"><img src="/assets/user/images/blog/sidebar-1.jpg" alt="not found" className="img-fluid" /></Link>
                    </div>
                    <div>
                      <span className="fs-sm fw-light text-color date">Sep 25, 2022</span>
                      <Link to="/product-details"><h6 className="mb-0 mt-3 fw-regular">Deal Going Get The Offer For All Products Today</h6></Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <div className="feature-image pe-1">
                      <Link to="/product-details"><img src="/assets/user/images/blog/sidebar-2.jpg" alt="not found" className="img-fluid" /></Link>
                    </div>
                    <div>
                      <span className="fs-sm fw-light text-color date">Sep 25, 2022</span>
                      <Link to="/product-details"><h6 className="mb-0 mt-3 fw-regular">Deal Going Get The Offer For All Products Today</h6></Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <div className="feature-image pe-1">
                      <Link to="/product-details"><img src="/assets/user/images/blog/sidebar-3.jpg" alt="not found" className="img-fluid" /></Link>
                    </div>
                    <div>
                      <span className="fs-sm fw-light text-color date">Sep 25, 2022</span>
                      <Link to="/product-details"><h6 className="mb-0 mt-3 fw-regular">Deal Going Get The Offer For All Products Today</h6></Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <div className="feature-image pe-1">
                      <Link to="/product-details"><img src="/assets/user/images/blog/sidebar-4.jpg" alt="not found" className="img-fluid" /></Link>
                    </div>
                    <div>
                      <span className="fs-sm fw-light text-color date">Sep 25, 2022</span>
                      <Link to="/product-details"><h6 className="mb-0 mt-3 fw-regular">Deal Going Get The Offer For All Products Today</h6></Link>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="sidebar-widget tags-widget mt-60">
                <h4 className="widget-title position-relative fw-normal mb-5">Latest Posts</h4>
                <div className="tags">
                  <Link to="#">Dream</Link>
                  <Link to="#">Rings</Link>
                  <Link to="#">Birthday</Link>
                  <Link to="#">Gifts</Link>
                  <Link to="#">Neaklace</Link>
                  <Link to="#">Chain</Link>
                  <Link to="#">Braclet</Link>
                </div>
              </div>
              <div className="sidebar-widget instagram-widget mt-60">
                <h4 className="widget-title position-relative fw-normal mb-5">Instagram Posts</h4>
                <ul className="insta-posts">
                  <li><Link to="#"><img src="/assets/user/images/blog/insta-1.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/insta-2.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/insta-3.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/insta-4.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/insta-5.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/insta-6.jpg" alt="insta post" className="img-fluid" /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
