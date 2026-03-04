import { usePaginationStore } from '../../entities/cart/model/store';

export const useCartsStore = () => {
  const limit = usePaginationStore((state) => state.limit);
  const skip = usePaginationStore((state) => state.skip);
  const setLimit = usePaginationStore((state) => state.setLimit);
  const setSkip = usePaginationStore((state) => state.setSkip);

  return { limit, skip, setLimit, setSkip };
};
