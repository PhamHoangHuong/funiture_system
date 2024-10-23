import React from "react"
import { Route, Routes } from "react-router-dom"
import UserLayout from "../layouts/user/UserLayout"
import Home from "../pages/user/Home/Home"
import UserProductLayout from "../pages/user/product/UserProductLayout"
<<<<<<< HEAD
import ProductDetails from "../pages/user/product/ProductDetails"
=======
import UserCartLayout from "../pages/user/Cart/UserCartLayout"
import CartContent from "../pages/user/Cart/CartContent"
import Checkout from "../pages/user/Checkout/Checkout"
import Payment from "../pages/user/Payment/Payment"
import PaymentSuccess from "../pages/user/Payment/PaymentSuccess"
import PaymentFailure from "../pages/user/Payment/PaymentFailure"
import ErrorPage from "../pages/errors/ErrorPage"
>>>>>>> develop-fe-huong

const UserRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index element={<Home />} />
<<<<<<< HEAD
                <Route path="products" element={<UserProductLayout />} />
                <Route path="products/:id" element={<ProductDetails />} />
=======
                <Route path="products" element={<UserProductLayout />}>
                </Route>
                <Route path="cart" element={<UserCartLayout />}>
                    <Route index element={<CartContent />} />
                </Route>
                <Route path="checkout" element={<Checkout />} />
                <Route path="payment" element={<Payment />} />
                <Route path="payment/success" element={<PaymentSuccess />} />
                <Route path="payment/failure" element={<PaymentFailure />} />

                {/* Error page */}
                <Route path="error" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
>>>>>>> develop-fe-huong
            </Route>
        </Routes>
    )
}

export default UserRoutes
