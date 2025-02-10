import Decimal from 'decimal.js';
import { TokenItem } from './components/SelectToken'

export const calculateAmountOut = (
  amountIn: number,
  tokenIn?: TokenItem,
  tokenOut?: TokenItem
) => {
  if (!tokenIn || !tokenOut) return;
  const rate = new Decimal(tokenIn.price).div(tokenOut.price)
  return rate.mul(amountIn || 0);
};

export const calculateAmountIn = (
  amountOut: number,
  tokenIn?: TokenItem,
  tokenOut?: TokenItem
) => {
  if (!tokenIn || !tokenOut) return;
  const rate = new Decimal(tokenOut.price).div(tokenIn.price)
  return rate.mul(amountOut || 0);
};
