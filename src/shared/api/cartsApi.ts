import type { Cart, CartsResponse, UpdateCartPayload } from '../types/carts';

const API_BASE_URL = 'https://dummyjson.com';

export const cartsApi = {
  getCartsList: async (limit: number, skip: number): Promise<CartsResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/carts?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) throw new Error('Ошибка загрузки корзин');
    return response.json();
  },

  getCartById: async (id: number): Promise<Cart> => {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`);
    if (!response.ok) throw new Error(`Ошибка загрузки корзины ${id}`);
    return response.json();
  },

  updateCart: async (id: number, payload: UpdateCartPayload): Promise<Cart> => {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Ошибка обновления корзины');
    return response.json();
  },
};
