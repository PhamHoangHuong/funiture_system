import type React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../core/contexts/CartContext";
import { formatCurrency } from "../../../core/hooks/format";

const CartContent: React.FC = () => {
	const { cart, updateCartItem, removeCartItem, fetchCart } = useCart();
	const totalPrice = cart
		.reduce((total, item) => total + item.product.price * item.quantity, 0)
		.toFixed(2);
	useEffect(() => {
		fetchCart();
	}, []);

	const handleUpdateCartItem = async (productId: number, quantity: number) => {
		await updateCartItem(productId, quantity);
		fetchCart();
	};

	const handleRemoveCartItem = async (productId: number) => {
		await removeCartItem(productId);
		fetchCart();
	};

	return (
		<>
			<div className="ptb-120 bg-white">
				<div className="container">
					<div className="cart-table-wrapper table-responsive">
						<table className="cart-table table">
							<thead>
								<tr>
									<th className="text-center py-3" style={{ width: "40%" }}>
										Products
									</th>
									<th className="text-center py-3" style={{ width: "15%" }}>
										Price
									</th>
									<th className="text-center py-3" style={{ width: "15%" }}>
										Quantity
									</th>
									<th className="text-end py-3" style={{ width: "30%" }}>
										Subtotal
									</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item) => (
									<tr key={item.product_id} style={{ verticalAlign: "middle" }}>
										<td className="p-3">
											<div className="d-flex align-items-center gap-3 product-box">
												<button
													type="button"
													className="delete-button"
													onClick={() => handleRemoveCartItem(item.product_id)}
													style={{
														fontSize: "18px",
														cursor: "pointer",
														marginRight: "10px",
													}}
												>
													&times;
												</button>
												<div
													className="feature-image light-bg"
													style={{ maxWidth: "80px" }}
												>
													<img
														src={
															item.product.image ||
															"/assets/user/images/products/chair-md-2.png"
														}
														className="img-fluid rounded"
														alt={item.product.name}
														style={{ width: "100%" }}
													/>
												</div>
												<div>
													<span className="fs-sm text-uppercase secondary-text-color d-block">
														{item.product.category}
													</span>
													<a href="#" className="product-title h6 mt-2 d-block">
														{item.product.name}
													</a>
												</div>
											</div>
										</td>
										<td className="text-center p-3">
											<span className="fw-medium text-main-color">
												{formatCurrency(item.product.price)}
											</span>
										</td>
										<td className="text-center p-3">
											<div className="quantity d-flex align-items-center justify-content-center">
												<div className="quantity-control d-flex align-items-center gap-2">
													<button
														className="quantity-button"
														onClick={() => {
															if (item.quantity > 0) {
																handleUpdateCartItem(
																	item.product_id,
																	item.quantity - 1,
																);
															}
														}}
														style={{
															padding: "0 10px",
															borderRadius: "4px",
															border: "1px solid #ddd",
															cursor: "pointer",
														}}
													>
														-
													</button>
													<span style={{ margin: "0 10px" }}>
														{item.quantity}
													</span>
													<button
														className="quantity-button"
														onClick={() =>
															handleUpdateCartItem(
																item.product_id,
																item.quantity + 1,
															)
														}
														style={{
															padding: "0 10px",
															borderRadius: "4px",
															border: "1px solid #ddd",
															cursor: "pointer",
														}}
													>
														+
													</button>
												</div>
											</div>
										</td>
										<td className="text-end p-3">
											<span className="text-main-color fw-medium d-block">
												{formatCurrency(
													(item.product.price * item.quantity).toFixed(2),
												)}
											</span>
										</td>
									</tr>
								))}
								<tr>
									<td colSpan={4} className="pt-4">
										<div className="d-flex align-items-center justify-content-between gap-4 flex-wrap">
											<form
												className="cart-coupon-form d-flex align-items-center"
												style={{ width: "100%" }}
											>
												<input
													type="text"
													placeholder="Coupon Code"
													className="theme-input"
													style={{
														padding: "10px",
														borderRadius: "4px",
														border: "1px solid #ddd",
														flex: "1",
													}}
												/>
												<button
													type="submit"
													className="submit-btn template-btn primary-btn"
													style={{
														marginLeft: "10px",
														padding: "10px 20px",
														borderRadius: "4px",
														cursor: "pointer",
													}}
												>
													Apply Coupon
												</button>
											</form>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<section className="pb-140 bg-white">
				<div className="container">
					<div className="row">
						<div className="col-xl-6">
							<div className="cart-calculator">
								<h3 className="mb-40">Cart Totals</h3>
								<form className="cart-calculator-form overflow-hidden overflow-x-scroll">
									<table className="table">
										<tbody>
											<tr>
												<td>Subtotal</td>
												<td>
													{cart
														.reduce(
															(total, item) =>
																total + item.product.price * item.quantity,
															0,
														)
														.toFixed(2)}
												</td>
											</tr>
											<tr>
												<td>Shipping</td>
												<td>
													<div className="shipping-method">
														<label>
															<input type="radio" name="shipping" />
															<span>Free Shipping</span>
														</label>
														<label>
															<input type="radio" name="shipping" />
															<span>Flat Rate</span>
														</label>
														<label>
															<input type="radio" name="shipping" />
															<span>Local Pickup</span>
														</label>
														<p className="my-4 fs-sm fw-light">
															Shipping options will be updated during checkout
														</p>
														<a href="#" className="text-main-color">
															Calculate Shipping
														</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>Total</td>
												<td>{formatCurrency(totalPrice)}</td>
											</tr>
										</tbody>
									</table>
									<Link
										className="template-btn primary-btn text-uppercase mt-5"
										to="/checkout"
									>
										Checkout
									</Link>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default CartContent;
