import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import type { Cart } from '../../../shared/types/carts';
import { CartCardStyled, CartHeaderBox, CartStatsBox, ViewButton } from '../../../shared/ui/styles';

interface CartCardProps {
  cart: Cart;
}

export const CartCard = ({ cart }: CartCardProps) => (
  <CartCardStyled>
    <CartHeaderBox>
      <Box>
        <Typography variant="h6">Корзина ID: {cart.id}</Typography>
        <Typography variant="body2" color="textSecondary">
          Пользователь ID: {cart.userId}
        </Typography>
      </Box>
      <Link to={`/carts/${cart.id}`} style={{ textDecoration: 'none' }}>
        <ViewButton variant="contained" color="primary">
          Подробнее
        </ViewButton>
      </Link>
    </CartHeaderBox>
    <CartStatsBox>
      <Box>
        <Typography variant="caption" color="textSecondary">
          Товаров
        </Typography>
        <Typography variant="h6">{cart.totalProducts}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" color="textSecondary">
          Сумма
        </Typography>
        <Typography variant="h6">${cart.total.toFixed(2)}</Typography>
      </Box>
    </CartStatsBox>
  </CartCardStyled>
);
