import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { useTranslation } from '../../../core/hooks/translation';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { handleLogin } = useAuth();
    const { t } = useTranslation();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowError(false);
        try {
            const result = await handleLogin(email, password);
            if (!result.success) {
                setShowError(true);
                setErrorMessage(result.error || 'Unknown error occurred');
            }
        } catch (error) {
            setShowError(true);
            setErrorMessage('An error occurred during login. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="d-flex flex-column h-100 p-3">
            <div className="d-flex flex-column flex-grow-1">
                <div className="row h-100">
                    <div className="col-xxl-7">
                        <div className="row justify-content-center h-100">
                            <div className="col-lg-6 py-lg-5">
                                <div className="d-flex flex-column h-100 justify-content-center">
                                    <div className="auth-logo mb-4">
                                        <a href="#" className="logo-dark">
                                            <img src="/assets/admin/images/logo-dark.png" height={24} alt="logo dark" />
                                        </a>
                                        <a href="#" className="logo-light">
                                            <img src="/assets/admin/images/logo-light.png" height={24} alt="logo light" />
                                        </a>
                                    </div>
                                    <h2 className="fw-bold fs-24">{t('login')}</h2>
                                    <p className="text-muted mt-1 mb-4">{t('admin')}</p>
                                    {showError && (
                                        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                                            {errorMessage}
                                        </Alert>
                                    )}
                                    <div className="mb-5">
                                        <form onSubmit={onSubmit} className="authentication-form">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="email">{t('email')}</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="password">{t('password')}</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                                                    <label className="form-check-label" htmlFor="checkbox-signin">{t('rememberMe')}</label>
                                                </div>
                                            </div>
                                            <div className="mb-1 text-center d-grid">
                                                <button className="btn btn-soft-primary" type="submit">{t('login')}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-5 d-none d-xxl-flex">
                        <div className="card h-100 mb-0 overflow-hidden">
                            <div className="d-flex flex-column h-100">
                                <img src="/assets/admin/images/small/img-10.jpg" className="w-100 h-100" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;