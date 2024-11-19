import React, { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../services/cartServices";
import { ProductService } from "../services/productService";
import type { Cart, CartMini, Discount, Item } from "../hooks/dataTypes";

interface CartContextType {
	cart: Cart[];
	loading: boolean;
	error: string | null;
	fetchCart: () => Promise<void>;
	fetchCartMini: () => Promise<void>;
	cartMini: CartMini;
	addToCart: (product_id: number, quantity: number) => Promise<void>;
	updateCartItem: (product_id: number, quantity: number) => Promise<void>;
	removeCartItem: (product_id: number) => Promise<void>;
	coupon ?: Discount[]
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
	const [coupon, setCoupon] = useState<Discount[]>();
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

	const fetchListCoupon = async () => {	
		try {
			if(!isUserLoggedIn()) return;
			setLoading(true);
			const result = await cartService.getListCoupon();
			console.log("coupon", result);
			setCoupon(result);
			setError(null);
		} catch (error) {
			console.error("Error fetching mini cart:", error);
				setError("Error fetching mini cart");
		} finally{
			setLoading(false);
		}
		
	}

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

	const updateCartItem = async (product_id: number, quantity: number) => {
		if (quantity < 0) return; // Ngăn số lượng âm
		if (isUserLoggedIn()) {
			try {
				setLoading(true);
				if (quantity === 0) {
					await cartService.delete(product_id); // Xóa sản phẩm nếu số lượng là 0
				} else {
					await cartService.update(product_id, { quantity });
				}
				await fetchCartMini();
			} catch (err) {
				console.error("Error updating cart item:", err);
				setError("Error updating cart item");
			} finally {
				setLoading(false);
			}
		} else {
			const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
			const existingItemIndex = localCart.findIndex((item: Item) => item.product_id === product_id);

			if (existingItemIndex >= 0) {
				if (quantity === 0) {
					localCart.splice(existingItemIndex, 1); // Xóa sản phẩm nếu số lượng là 0
				} else {
					localCart[existingItemIndex].quantity = quantity;
				}
				localStorage.setItem("cart", JSON.stringify(localCart));
				await fetchCartMini();
			}
		}
	};

	const removeCartItem = async (product_id: number) => {
		if (isUserLoggedIn()) {
			try {
				setLoading(true);
				await cartService.delete(product_id); // Assuming you have a delete method in cartService
				await fetchCartMini();
			} catch (err) {
				console.error("Error removing cart item:", err);
				setError("Error removing cart item");
			} finally {
				setLoading(false);
			}
		} else {
			const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
			const updatedCart = localCart.filter((item: Item) => item.product_id !== product_id);
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			await fetchCartMini();
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetchCartMini();
			await fetchCart();
			await fetchListCoupon();
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
				updateCartItem,
				removeCartItem,
				coupon,
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
