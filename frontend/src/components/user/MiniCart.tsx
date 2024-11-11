import type React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../core/contexts/CartContext";

interface MiniCartProps {
	isOpen: boolean;
	onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ isOpen, onClose }) => {
	const { cartMini, loading, error } = useCart();

	if (loading) return <div>Đang tải...</div>;
	if (error) return <div>Lỗi: {error}</div>;

	const cartDrawerStyle: React.CSSProperties = {
		position: "fixed",
		top: 0,
		right: isOpen ? 0 : "-100%",
		width: "350px",
		height: "100vh",
		backgroundColor: "#ffffff",
		boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.1)",
		zIndex: 1000,
		overflowY: "auto",
		transition: "right 0.3s ease-in-out",
		padding: "20px",
		display: "flex",
		flexDirection: "column",
	};

	const headerStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "20px",
		paddingBottom: "15px",
		borderBottom: "1px solid #e0e0e0",
	};

	const closeButtonStyle: React.CSSProperties = {
		background: "none",
		border: "none",
		fontSize: "24px",
		cursor: "pointer",
		color: "#333",
	};

	const cartItemStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "center",
		gap: "15px",
		marginBottom: "20px",
		padding: "10px",
		backgroundColor: "#f9f9f9",
		borderRadius: "8px",
	};

	const imageStyle: React.CSSProperties = {
		width: "80px",
		height: "80px",
		objectFit: "cover",
		borderRadius: "4px",
	};

	const quantityControlStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "center",
		gap: "5px",
		marginTop: "5px",
	};

	const quantityButtonStyle: React.CSSProperties = {
		background: "#e0e0e0",
		border: "none",
		width: "24px",
		height: "24px",
		borderRadius: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		fontSize: "14px",
	};

	const totalStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: "20px",
		paddingTop: "15px",
		borderTop: "1px solid #e0e0e0",
		fontSize: "18px",
		fontWeight: "bold",
	};

	const buttonStyle: React.CSSProperties = {
		display: "block",
		width: "100%",
		padding: "12px",
		textAlign: "center",
		textDecoration: "none",
		borderRadius: "4px",
		fontWeight: "bold",
		textTransform: "uppercase",
		marginTop: "15px",
	};

	//get const carr

	if (!isOpen) return null;

	return (
		<>
			<div style={cartDrawerStyle}>
				<div style={headerStyle}>
					<h2 style={{ margin: 0 }}>Your Cart (3)</h2>
					<button onClick={onClose} style={closeButtonStyle}>
						&times;
					</button>
				</div>
				<div style={{ flex: 1, overflowY: "auto" }}>
					{cartMini && cartMini.quantity > 0 ? (
						<div style={{ flex: 1, overflowY: "auto" }}>
							{cartMini.map((item) => (
								<div key={item.id} style={cartItemStyle}>
									<img src={item.image} alt={item.name} style={imageStyle} />
									<div style={{ flex: 1 }}>
										<h4 style={{ margin: "0 0 5px" }}>{item.name}</h4>
										<p style={{ margin: "0 0 5px", color: "#666" }}>
											${item.price}
										</p>
										<div style={quantityControlStyle}>
											<button style={quantityButtonStyle}>-</button>
											<span style={{ margin: "0 10px" }}>{item.quantity}</span>
											<button style={quantityButtonStyle}>+</button>
										</div>
									</div>
									<button style={{ ...closeButtonStyle, fontSize: "18px" }}>
										&times;
									</button>
								</div>
							))}
						</div>
					) : (
						<div style={{ padding: "20px", textAlign: "center" }}>
							Không có sản phẩm nào trong giỏ hàng
						</div>
					)}
					{/* <div style={cartItemStyle}>
						<img
							src="/assets/images/products/pds-sm-1.png"
							alt="Product"
							style={imageStyle}
						/>
						<div style={{ flex: 1 }}>
							<h4 style={{ margin: "0 0 5px" }}>Sunsine Table Chairs</h4>
							<p style={{ margin: "0 0 5px", color: "#666" }}>$250.00</p>
							<div style={quantityControlStyle}>
								<button style={quantityButtonStyle}>-</button>
								<span style={{ margin: "0 10px" }}>1</span>
								<button style={quantityButtonStyle}>+</button>
							</div>
						</div>
						<button style={{ ...closeButtonStyle, fontSize: "18px" }}>
							&times;
						</button>
					</div> */}
				</div>
				<div style={totalStyle}>
					<span>Total:</span>
					<span>$750.00</span>
				</div>
				<Link
					to="/cart"
					style={{ ...buttonStyle, backgroundColor: "#4a90e2", color: "white" }}
				>
					View Cart
				</Link>
				<Link
					to="/checkout"
					style={{
						...buttonStyle,
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
