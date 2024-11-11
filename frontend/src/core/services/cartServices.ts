import axios from "axios";
import type { Cart, CartMini } from "../hooks/dataTypes";

const API_URL = "http://localhost:8000/api/cart";

export const cartService = {
	getAll: async () => {
		const response = await axios.get<Cart[]>(API_URL);
		return response.data;
	},

	// get cart/mimi
	getCartMini: async () => {
		const response = await axios.get<CartMini>(`${API_URL}/mini`);
		return response.data;
	},

	addToCart: async (product_id: number, quantity: number) => {
		const response = await axios.post<{ data: Cart }>(`${API_URL}`, {
			product_id,
			quantity,
		});
		return response.data.data;
	},

	getById: async (id: number) => {
		const response = await axios.get<{ data: Cart }>(`${API_URL}/${id}`);
		return response.data.data;
	},

	create: async (cart: Omit<Cart, "id">) => {
		const response = await axios.post<{ data: Cart }>(API_URL, cart);
		return response.data.data;
	},

	update: async (id: number, cart: Partial<Cart>) => {
		const response = await axios.put<{ data: Cart }>(`${API_URL}/${id}`, cart);
		return response.data.data;
	},

	delete: async (id: number) => {
		await axios.delete(`${API_URL}/${id}`);
	},
};
