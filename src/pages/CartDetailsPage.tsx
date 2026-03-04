import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, CircularProgress, Button, Typography } from '@mui/material';
import { cartsApi } from '../shared/api/cartsApi';
import { CartItem } from '../features/cartEdit/ui/CartItem';
import {
  LoadingBox,
  ErrorBox,
  CartDetailsContainer,
  ProductTableStyled,
  ProductHeaderStyled,
} from '../shared/ui/styles';

export const CartDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const cartId = id ? parseInt(id, 10) : 0;

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => cartsApi.getCartById(cartId),
  });

  const updateMutation = useMutation({
    mutationFn: (productId: number) => {
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
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  const quantityMutation = useMutation({
    mutationFn: (data: { productId: number; quantity: number }) => {
      const updateProducts = cart!.products.map((p) =>
        p.id === data.productId
          ? { ...p, quantity: data.quantity }
          : p
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
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  if (isLoading) {
    return (
      <LoadingBox>
        <CircularProgress />
      </LoadingBox>
    );
  }

  if (error) {
    return <ErrorBox>Ошибка загрузки корзины</ErrorBox>;
  }

  const isUpdating = updateMutation.isPending || quantityMutation.isPending;

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        sx={{ marginBottom: 2 }}
      >
        Назад к списку
      </Button>

      <CartDetailsContainer>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Корзина ID: {cart?.id}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Пользователь ID: {cart?.userId}
        </Typography>
        <Typography variant="h6" sx={{ color: '#1976d2' }}>
          Общая сумма: ${cart?.total.toFixed(2)}
        </Typography>
      </CartDetailsContainer>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Товары ({cart?.products.length})
      </Typography>

      {cart?.products && cart.products.length > 0 ? (
        <ProductTableStyled>
          <ProductHeaderStyled>
            <Typography sx={{ fontWeight: 'bold' }}>Название</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Цена</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Количество</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Итого</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Действие</Typography>
          </ProductHeaderStyled>
          {cart.products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onUpdateQuantity={(id, quantity) =>
                quantityMutation.mutate({ productId: id, quantity })
              }
              onRemove={(id) => updateMutation.mutate(id)}
              isLoading={isUpdating}
            />
          ))}
        </ProductTableStyled>
      ) : (
        <Typography>Товары отсутствуют</Typography>
      )}
    </Box>
  );
};
