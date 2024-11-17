import React from "react"

import { Route, Routes, Navigate } from "react-router-dom"
import AdminLayout from "../layouts/admin/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import ProductList from "../pages/admin/Products/ProductList"
import ProductCreate from "../pages/admin/Products/ProductCreate"
import ProductEdit from "../pages/admin/Products/ProductEdit"
import Logout from "../pages/admin/auth/Logout"
import Warehouse from "../pages/admin/Inventory/Warehouse"
import ReceivedOrders from "../pages/admin/Inventory/ReceivedOrders"
import CategoryList from "../pages/admin/Categories/CategoryList"
import CategoryCreate from "../pages/admin/Categories/CategoryCreate"
import OrdersList from "../pages/admin/Orders/OrdersList"
import OrdersDetails from "../pages/admin/Orders/OrdersDetails"
import OrdersCart from "../pages/admin/Orders/OrdersCart"
import OrdersCheckOut from "../pages/admin/Orders/OrdersCheckOut"
import Settings from "../pages/admin/Settings"
import { ProductProvider, CategoryProvider, AttributeProvider, AdvancedPriceProvider, SourceProvider } from "../core/hooks/contexts"
import AttributesList from "../pages/admin/Attributes/AttributesList"
import AttributeValuesList from "../pages/admin/Attributes/AttributeValuesList"
import ProductFullScreen from "../pages/admin/FullScreen/ProductFullScreen"
import CategoryEdit from "../pages/admin/Categories/CategoryEdit"

const AdminRoutes: React.FC = () => {
    return (
        <ProductProvider>
            <CategoryProvider>
                <AttributeProvider>
                    <AdvancedPriceProvider>
                        <SourceProvider>
                            <AdminLayout>
                                <Routes>
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="products">
                                        <Route index element={<ProductList />} />
                                        <Route path="create" element={<ProductCreate />} />
                                        <Route path="edit/:id" element={<ProductEdit productId={0} onClose={() => {}} />} />
                                        <Route path="full-screen" element={<ProductFullScreen open={false} onClose={() => {}} onSelect={() => {}} />} />
                                    </Route>
                                    <Route path="categories">
                                        <Route index element={<CategoryList />} />
                                        <Route path="create" element={<CategoryCreate />} />
                                        <Route path="edit/:id" element={<CategoryEdit />} />
                                    </Route>
                                    <Route path="attributes">
                                        <Route index element={<AttributesList />} />
                                        <Route path="values" element={<AttributeValuesList />} />
                                    </Route>
                                    <Route path="inventory">
                                        <Route path="warehouse" element={<Warehouse />} />
                                        <Route path="received-orders" element={<ReceivedOrders />} />
                                    </Route>
                                    <Route path="orders">
                                        <Route index element={<OrdersList />} />
                                        <Route path="details" element={<OrdersDetails />} />
                                        <Route path="cart" element={<OrdersCart />} />
                                        <Route path="checkout" element={<OrdersCheckOut />} />
                                    </Route>
                                    <Route path="settings" element={<Settings />} />
                                    <Route path="logout" element={<Logout />} />
                                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                                </Routes>
                            </AdminLayout>
                        </SourceProvider>
                    </AdvancedPriceProvider>
                </AttributeProvider>
            </CategoryProvider>
        </ProductProvider>
    )
}

export default AdminRoutes
