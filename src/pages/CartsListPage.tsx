import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { cartsApi } from '../shared/api/cartsApi';
import { useCartsStore } from '../shared/hooks/useCartsStore';
import { CartCard } from '../entities/cart/ui/CartCard';
import {
  LoadingBox,
  ErrorBox,
  PaginationBox,
} from '../shared/ui/styles';

export const CartsListPage = () => {
  const { limit, skip, setLimit, setSkip } = useCartsStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['carts', limit, skip],
    queryFn: () => cartsApi.getCartsList(limit, skip),
  });

  const handleNextPage = () => {
    setSkip(skip + limit);
  };

  const handlePrevPage = () => {
    if (skip > 0) {
      setSkip(Math.max(0, skip - limit));
    }
  };

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
    setSkip(0);
  };

  if (isLoading) {
    return (
      <LoadingBox>
        <CircularProgress />
      </LoadingBox>
    );
  }

  if (error) {
    return <ErrorBox>Ошибка загрузки корзин</ErrorBox>;
  }

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <Box>
      <Box sx={{ marginBottom: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Товаров на странице</InputLabel>
          <Select value={limit} onChange={handleLimitChange} label="Товаров на странице">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        {data?.carts.map((cart) => (
          <CartCard key={cart.id} cart={cart} />
        ))}
      </Box>

      <PaginationBox>
        <Box>
          Страница {currentPage} из {totalPages}
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handlePrevPage}
            disabled={skip === 0}
          >
            Назад
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextPage}
            disabled={skip + limit >= (data?.total || 0)}
          >
            Вперед
          </Button>
        </Box>
      </PaginationBox>
    </Box>
  );
};
