import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Button, Typography } from '@mui/material';
import { CartItem } from '../features/cartEdit/ui/CartItem';
import {
  LoadingBox,
  ErrorBox,
  CartDetailsContainer,
  ProductTableStyled,
  ProductHeaderStyled,
} from '../shared/ui/styles';
import { useGetCart, useQuantityMutation, useUpdateMutation } from '../entities/cart/api';

export const CartDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cartId = id ? parseInt(id, 10) : 0;

  const { data: cart, isLoading, error } = useGetCart(cartId);

  const updateMutation = useUpdateMutation(cartId, cart);

  const quantityMutation = useQuantityMutation(cartId, cart);

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
