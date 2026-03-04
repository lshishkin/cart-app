import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartsApi } from "../../../shared/api/cartsApi";
import type { Cart } from "../../../shared/types/carts";

export const useGetCart = (cartId: number) =>
  useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => cartsApi.getCartById(cartId),
  });

export const useUpdateMutation = (cartId: number, cart?: Cart) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => {
      if (!cart) {
        return Promise.reject(new Error("Корзина не загружена"));
      }
      const updatedProducts = cart!.products
        .filter((p) => p.id !== productId)
        .map((p) => ({
          id: p.id,
          quantity: p.quantity,
        }));

      return cartsApi.updateCart(cartId, {
        merge: true,
        products: updatedProducts,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
};

export const useQuantityMutation = (cartId: number, cart?: Cart) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { productId: number; quantity: number }) => {
      if (!cart) {
        return Promise.reject(new Error("Корзина не загружена"));
      }
      const updateProducts = cart!.products.map((p) =>
        p.id === data.productId ? { ...p, quantity: data.quantity } : p,
      );

      return cartsApi.updateCart(cartId, {
        merge: true,
        products: updateProducts.map((p) => ({
          id: p.id,
          quantity: p.quantity,
        })),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
};
