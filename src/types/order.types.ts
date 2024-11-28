//..

import { TProducts } from './product';

export type TOrderItem = {
  id: string;
  userId?: number;
  items: TProducts[];
  subtotal: number;
};
