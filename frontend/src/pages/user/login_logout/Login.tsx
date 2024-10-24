import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="login-area ptb-120 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <form className="theme-form">
              <h3 className="mb-40">Login Account</h3>
              <input type="text" placeholder="User name or email address*" className="theme-input" />
              <input type="password" placeholder="Password*" className="theme-input mt-3" />
              <div className="forgot-password d-flex align-items-center justify-content-between gap-2 mt-32 flex-wrap">
                <label className="mb-0"><input type="checkbox" /> Remember me</label>
                <Link to="#" className="text-main-color">Lost your password?</Link>
              </div>
              <button type="submit" className="template-btn primary-btn w-100 mt-32"><span>Login</span></button>
              <p className="mb-0 mt-32">Not registered yet? <Link to="/signup" className="text-main-color">Create an Account</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

