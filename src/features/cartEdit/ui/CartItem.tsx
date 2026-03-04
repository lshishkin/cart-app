import { Box, Button, TextField, Typography } from '@mui/material';
import type { Product } from '../../../shared/types/carts';
import styled from '@emotion/styled';
import { ProductRowStyled } from '../../../shared/ui/styles';

interface CartItemProps {
  product: Product;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  isLoading?: boolean;
}

const InputBox = styled(Box)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CartItem = ({
  product,
  onUpdateQuantity,
  onRemove,
  isLoading,
}: CartItemProps) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      onUpdateQuantity(product.id, quantity);
    }
  };

  return (
    <ProductRowStyled>
      <Typography>{product.title}</Typography>
      <Typography>${product.price.toFixed(2)}</Typography>
      <InputBox>
        <TextField
          type="number"
          size="small"
          value={product.quantity}
          onChange={handleQuantityChange}
          disabled={isLoading}
          inputProps={{ min: 1 }}
          sx={{ width: '60px' }}
        />
      </InputBox>
      <Typography>${product.total.toFixed(2)}</Typography>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={() => onRemove(product.id)}
        disabled={isLoading}
      >
        Удалить
      </Button>
    </ProductRowStyled>
  );
};
