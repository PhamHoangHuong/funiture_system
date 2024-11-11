import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../services/cartServices";
import type { Cart, CartMini } from "../hooks/dataTypes";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

interface CartContextType {
	cart: Cart[];
	loading: boolean;
	error: string | null;
	fetchCart: () => Promise<void>;
	fetchCartMini: () => Promise<void>;
	cartMini: CartMini;
	addToCart: (product_id: number, quantity: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
	undefined,
);

// Get dữ liệu của giỏ hàng
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<Cart[]>([]);
	const [cartMini, setCartMini] = useState<CartMini>({
		items: {},
		quantity: 0,
		subtotal: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch dữ liệu của giỏ hàng
	const fetchCart = async () => {
		try {
			setLoading(true);
			const data = await cartService.getAll();
			console.log("data", data);
			setCart(data);
			setError(null);
		} catch (err) {
			console.error("Error fetching cart:", err);
			setError("Error fetching cart");
		} finally {
			setLoading(false);
		}
	};

	//fetchcartmini
	const fetchCartMini = async () => {
		try {
			setLoading(true);
			const data = await cartService.getCartMini();
			setCartMini(data);
			return data;
		} catch (err) {
			console.error("Error fetching cart:", err);
			setError("Error fetching cart");
		} finally {
			setLoading(false);
		}
	};

	const addToCart = async (product_id: number, quantity: number) => {
		try {
			setLoading(true);
			await cartService.addToCart(product_id, quantity);
			await fetchCartMini();
		} catch (err) {
			console.error("Error adding to cart:", err);
			setError("Error adding to cart");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
	const fetchData = async () => {
		await fetchCartMini();
		await fetchCart();
	};
	fetchData();
}, []);

	return (
		<CartContext.Provider
			value={{
				cart,
				loading,
				error,
				fetchCart,
				cartMini,
				fetchCartMini,
				addToCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
