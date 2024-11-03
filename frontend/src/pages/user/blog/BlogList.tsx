import React from 'react';
import { Link } from 'react-router-dom';
import BlogBreadcrumb from './blogbreadcrumb';

const BlogList: React.FC = () => {
  return (
    <>
    <BlogBreadcrumb/>
    <div className="bp-blog-section ptb-140">
      <div className="container">
        <div className="row g-5 g-xl-4">
          <div className="col-xl-8">
            <div className="blog-list-items">
              <div className="blog-list-single-item">
                <div className="feature-thumbnail overflow-hidden mb-40">
                  <Link to="/blog/1"><img src="/assets/user/images/blog/bd-1.jpg" alt="thumbnail" className="img-fluid" /></Link>
                </div>
                <div className="blog-meta d-flex align-items-center gap-3">
                  <span>15 Jan, 2023</span>
                  <span>By Hariss Jay</span>
                  <span>Furniture, Design, Inspiration</span>
                </div>
                <Link to="/blog/1"><h3 className="mt-30 fw-medium mb-40">Special edition race boots campaign</h3></Link>
                <p className="mb-40">Potenti feugiat aenean class risus aptent tempus nunc, facilisi facilisis lacus non at nibh conubia, inceptos malesuada curae leo felis ante. Facilisis lobortis suscipit vel cras integer cursus tortor volutpat non, torquent cubilia sagittislacus molestie nec feugiat sociis purus, mollis rhoncus tristique eu velit ac pellentesque mauris</p>
                <Link to="/blog/1" className="explore-btn">Read Details</Link>
              </div>
              {/* Add more blog-list-single-item divs here for other blog posts */}
              
              <div className="blog-list-single-item blog-formate-quote mt-60">
                <span className="quote-icon">
                  <svg width="77" height="59" viewBox="0 0 77 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.7837 0.628841L29.1201 5.41941C22.2038 9.26188 17.949 13.6217 15.3111 17.8494C12.6124 22.1743 11.6229 26.3338 11.1842 29.604L11.0466 30.6304L11.9359 30.0999C13.9743 28.8842 16.8788 28.4566 19.8286 28.8755L19.8363 28.8766L19.844 28.8775C27.401 29.7121 33.2416 35.5388 33.2416 43.4308C33.2416 47.1499 31.5778 50.9019 29.0496 53.8399C26.1275 56.7382 22.8016 57.981 18.6011 57.981C13.9904 57.981 9.79275 55.8956 7.28226 53.4047C3.03958 48.7627 0.5 43.7219 0.5 35.2606C0.5 20.5874 10.9639 7.50241 25.7837 0.628841ZM69.0421 0.628843L72.3785 5.41941C65.4622 9.26188 61.2074 13.6217 58.5695 17.8494C55.8708 22.1743 54.8813 26.3338 54.4426 29.604L54.305 30.6304L55.1943 30.0999C57.2327 28.8842 60.1373 28.4566 63.087 28.8755L63.0947 28.8766L63.1024 28.8775C70.6594 29.7121 76.5 35.5388 76.5 43.4308C76.5 47.156 74.8307 50.9143 72.2955 53.8544C69.8244 56.7201 66.0921 57.981 61.8596 57.981C57.2488 57.981 53.0512 55.8956 50.5407 53.4047C46.298 48.7627 43.7584 43.7219 43.7584 35.2606C43.7584 20.5874 54.2223 7.50241 69.0421 0.628843Z" stroke="#121111"/>
                  </svg>
                </span>
                <div>
                  <h4 className="mb-0 fw-medium mb-4">Platea commodo vivera cum inceptos congue susciapit justo quisque fames.</h4>
                  <span className="text-main-color">David Martina</span>
                </div>
              </div>
              
              <ul className="template-pagination mt-60">
                <li><Link to="#">01</Link></li>
                <li><Link to="#">02</Link></li>
                <li><Link to="#">03</Link></li>
                <li><Link to="#">04</Link></li>
                <li><Link to="#"><i className="fa-solid fa-angles-right"></i></Link></li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="blog-sidebar">
              <div className="sidebar-widget search-widget">
                <form>
                  <input type="text" placeholder="Search Here..." className="theme-input" />
                </form>
              </div>
              <div className="sidebar-widget categories-widget mt-60">
                <h5 className="widget-title position-relative fw-semibold mb-5">Categories</h5>
                <ul className="sidebar-check-fields">
                  <li><label><input type="checkbox" /> <span>Latest News</span></label></li>
                  <li><label><input type="checkbox" /> <span>Today Best Posts</span></label></li>
                  <li><label><input type="checkbox" /> <span>Design Trend</span></label></li>
                  <li><label><input type="checkbox" /> <span>UI/UX Trend</span></label></li>
                  <li><label><input type="checkbox" /> <span>Brand Design</span></label></li>
                </ul>
              </div>
              <div className="sidebar-widget latest-post-widget mt-60">
                <h5 className="widget-title position-relative fw-semibold mb-5">Latest Posts</h5>
                <ul className="latest-posts">
                  {/* Add latest post items here */}
                </ul>
              </div>
              <div className="sidebar-widget tags-widget mt-60">
                <h5 className="widget-title position-relative fw-normal mb-5">Latest Posts</h5>
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
                <h5 className="widget-title position-relative fw-normal mb-5">Instagram Posts</h5>
                <ul className="insta-posts">
                  <li><Link to="#"><img src="/assets/user/images/blog/blog-1.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/blog-2.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/blog-3.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/blog-2.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/blog-1.jpg" alt="insta post" className="img-fluid" /></Link></li>
                  <li><Link to="#"><img src="/assets/user/images/blog/blog-3.jpg" alt="insta post" className="img-fluid" /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogList;
