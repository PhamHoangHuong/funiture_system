import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../core/contexts/CartContext";
import "../../../public/assets/user/css/miniCartStyles.css";

interface MiniCartProps {
	isOpen: boolean;
	onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ isOpen, onClose }) => {
	const { cartMini } = useCart();

	if (!isOpen) return null;

	return (
		<>
			<div className="backdrop" onClick={onClose}></div>
			<div className="cart-drawer" style={{ right: isOpen ? 0 : "-100%" }}>
				<div className="header">
					<h2 style={{ margin: 0 }}>Your Cart ({cartMini.quantity})</h2>
					<button onClick={onClose} className="close-button">
						&times;
					</button>
				</div>
				<div style={{ flex: 1, overflowY: "auto" }}>
					{cartMini && cartMini.items.length > 0 ? (
						cartMini.items.map((item) => (
							<div key={item.product_id} className="cart-item">
								<img src={item.product.image} alt={item.product.name} className="image" />
								<div style={{ flex: 1 }}>
									<h4 style={{ margin: "0 0 5px" }}>{item.product.name}</h4>
									<p style={{ margin: "0 0 5px", color: "#666" }}>
										${item.product.price}
									</p>
									<div className="quantity-control">
										<button className="quantity-button">-</button>
										<span style={{ margin: "0 10px" }}>{item.quantity}</span>
										<button className="quantity-button">+</button>
									</div>
								</div>
								<button className="close-button" style={{ fontSize: "18px" }}>
									&times;
								</button>
							</div>
						))
					) : (
						<div style={{ padding: "20px", textAlign: "center" }}>
							Không có sản phẩm nào trong giỏ hàng
						</div>
					)}
				</div>
				<div className="total">
					<span>Total:</span>
					<span>${cartMini.subtotal}</span>
				</div>
				<Link
					to="/cart"
					className="button"
					style={{ backgroundColor: "#4a90e2", color: "white" }}
				>
					View Cart
				</Link>
				<Link
					to="/checkout"
					className="button"
					style={{
						backgroundColor: "white",
						color: "#4a90e2",
						border: "2px solid #4a90e2",
					}}
				>
					Checkout
				</Link>
			</div>
		</>
	);
};

export default MiniCart;
