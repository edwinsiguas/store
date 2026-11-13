export interface OrderItem {
  id?: number;
  productId: number;
  name?: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface OrderRequest {
  items: {
    productId: number;
    quantity: number;
  }[];
}

export interface Order {
  id?: number;
  userId?: number;
  total: number;
  status: string;
  createdAt?: string;
  items?: OrderItem[];
}
