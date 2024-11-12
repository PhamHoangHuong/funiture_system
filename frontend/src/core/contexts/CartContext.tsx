import React, { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../services/cartServices";
import { ProductService } from "../services/productService";
import type { Cart, CartMini, Item } from "../hooks/dataTypes";

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

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<Cart[]>([]);
	const [cartMini, setCartMini] = useState<CartMini>({
		items: [],
		quantity: 0,
		subtotal: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const isUserLoggedIn = () => {
		return !!localStorage.getItem("authToken");
	};

	const fetchCart = async () => {
		if (isUserLoggedIn()) {
			try {
				setLoading(true);
				const data = await cartService.getAll();
				setCart(data);
				setError(null);
			} catch (err) {
				console.error("Error fetching cart:", err);
				setError("Error fetching cart");
			} finally {
				setLoading(false);
			}
		} else {
			const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
			setCart(localCart);
		}
	};

	const fetchCartMini = async () => {
		if (isUserLoggedIn()) {
			try {
				setLoading(true);
				const data = await cartService.getCartMini();
				setCartMini(data);
				setError(null);
			} catch (err) {
				console.error("Error fetching mini cart:", err);
				setError("Error fetching mini cart");
			} finally {
				setLoading(false);
			}
		} else {
			const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
			const quantity = localCart.reduce((acc: number, item: Item) => acc + item.quantity, 0);
			const subtotal = localCart.reduce((acc: number, item: Item) => acc + (Number(item.product.price) * item.quantity), 0);
			setCartMini({ items: localCart, quantity, subtotal });
		}
	};

	const addToCart = async (product_id: number, quantity: number) => {
		if (isUserLoggedIn()) {
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
		} else {
			const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
			const existingItemIndex = localCart.findIndex((item: Item) => item.product_id === product_id);

			if (existingItemIndex >= 0) {
				localCart[existingItemIndex].quantity += quantity;
			} else {
				const product = await ProductService.getById(product_id);
				localCart.push({ product_id, quantity, product });
			}

			localStorage.setItem("cart", JSON.stringify(localCart));
			await fetchCartMini();
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
