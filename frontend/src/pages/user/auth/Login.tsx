import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../core/contexts/AuthContext';


const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await handleLogin(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-area ptb-120 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <form className="theme-form" onSubmit={handleSubmit}>
              <h3 className="mb-40">Login Account</h3>
              <input
                type="text"
                name="email"
                placeholder="User name or email address*"
                className="theme-input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password*"
                className="theme-input mt-3"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="forgot-password d-flex align-items-center justify-content-between gap-2 mt-32 flex-wrap">
                <label className="mb-0">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  /> Remember me
                </label>
                <Link to="#" className="text-main-color">Lost your password?</Link>
              </div>
              <button
                type="submit"
                className="template-btn primary-btn w-100 mt-32"
                disabled={loading}
              >
                <span>{loading ? 'Logging in...' : 'Login'}</span>
              </button>
              <p className="mb-0 mt-32">
                Not registered yet? <Link to="/signup" className="text-main-color">Create an Account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

