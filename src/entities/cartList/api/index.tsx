import { useQuery } from "@tanstack/react-query";
import { cartsApi } from "../../../shared/api/cartsApi";

export const useGetCartList = (limit: number, skip: number) =>
  useQuery({
    queryKey: ["carts", limit, skip],
    queryFn: () => cartsApi.getCartsList(limit, skip),
  });
