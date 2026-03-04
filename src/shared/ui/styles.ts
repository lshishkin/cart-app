import styled from '@emotion/styled';
import { Card, Button, Box } from '@mui/material';

export const CartCardStyled = styled(Card)`
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CartHeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const CartStatsBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ViewButton = styled(Button)`
  &:hover {
    background-color: #1976d2;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const LoadingBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const ErrorBox = styled(Box)`
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin: 16px 0;
`;

export const PaginationBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 16px 0;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const CartDetailsContainer = styled(Box)`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ProductTableStyled = styled(Box)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProductRowStyled = styled(Box)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 80px;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const ProductHeaderStyled = styled(ProductRowStyled)`
  background-color: #f5f5f5;
  font-weight: bold;
  border-bottom: 2px solid #e0e0e0;

  &:hover {
    background-color: #f5f5f5;
  }
`;
