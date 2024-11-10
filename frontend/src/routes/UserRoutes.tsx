import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import UserLayout from "../layouts/user/UserLayout"
import Home from "../pages/user/Home/Home"
import UserProductLayout from "../pages/user/product/UserProductLayout"
import CartContent from "../pages/user/Cart/CartContent"
import Checkout from "../pages/user/Checkout/Checkout"
import Payment from "../pages/user/Payment/Payment"
import PaymentSuccess from "../pages/user/Payment/PaymentSuccess"
import PaymentFailure from "../pages/user/Payment/PaymentFailure"
import ErrorPage from "../pages/errors/ErrorPage"
import ProductDetails from "../pages/user/product/ProductDetails"
import BlogList from "../pages/user/blog/BlogList"
import BlogDetails from "../pages/user/blog/BlogDetails"
import Contact from "../pages/user/contact/Contact"
import Signup from "../pages/user/auth/Signup"
import Login from "../pages/user/auth/Login"
import { ProductProvider } from "../core/contexts/ProductContext"
import { CartProvider } from "../core/contexts/CartContext"

// check user đăng nhập hay chưa
import { AuthProvider } from "../core/contexts/AuthContextUser"
import { useAuth } from "../core/contexts/AuthContext"
import { Snackbar, Alert } from "@mui/material";
import Wishlist from "../pages/user/wishlist/Wishlist"

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {

    const { user } = useAuth();

    return user ? element : <Navigate to="/login" />;
};

const UserRoutes: React.FC = () => {
    return (

        <ProductProvider>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route element={<UserLayout />}>
                            <Route index element={<Home />} />
                            <Route path="products" element={<UserProductLayout />} />
                            <Route path="products/:id" element={<ProductDetails />} />
                            <Route path="blog">
                                <Route index element={<BlogList />} />
                                <Route path=":id" element={<BlogDetails />} />
                            </Route>
                            <Route path="contact" element={<Contact />} />
                            <Route path="cart" element={<CartContent />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="login" element={<Login />} />
                            <Route path="wishlist" element={<Wishlist />} />
                        </Route>

                        <Route path="checkout" element={<PrivateRoute element={<Checkout />} />} />
                        <Route path="payment" element={<Payment />} />
                        <Route path="payment/success" element={<PaymentSuccess />} />
                        <Route path="payment/failure" element={<PaymentFailure />} />

                        {/* Error page */}
                        <Route path="error" element={<ErrorPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </ProductProvider>
    )
}

export default UserRoutes
