import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className="login-area ptb-120 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <form className="theme-form">
              <h3 className="mb-40">Create Account</h3>
              <input type="text" placeholder="Your Name" className="theme-input" />
              <input type="text" placeholder="Username" className="theme-input mt-3" />
              <input type="password" placeholder="Password*" className="theme-input mt-3" />
              <div className="forgot-password d-flex align-items-center justify-content-between gap-2 mt-32">
                <label className="mb-0"><input type="checkbox" /> Accept The Terms and Privacy Policy</label>
              </div>
              <button type="submit" className="template-btn primary-btn w-100 mt-32"><span>Signup</span></button>
              <p className="mb-0 mt-32">Already have an account? <Link to="/login" className="secondary-text-color">Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
