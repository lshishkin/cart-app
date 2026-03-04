import { Routes, Route } from 'react-router-dom';
import { CartsListPage } from '../pages/CartsListPage';
import { CartDetailsPage } from '../pages/CartDetailsPage';

export const Router = () => (
  <Routes>
    <Route path="/" element={<CartsListPage />} />
    <Route path="/carts/:id" element={<CartDetailsPage />} />
  </Routes>
);
