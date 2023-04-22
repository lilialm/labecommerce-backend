export enum CATEGORY {

  STREAMING = "Serviço de Streaming",
  LIVETV = "Tv ao Vivo",
  OPENTV = "Tv Aberta"
};

export type User = {
    id: string;
    email: string;
    password: string;
  };
  
  export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
  };
  
  export type Purchase = {
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
  };

  export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
  };

  export type TProduct = {
        id: string;
        name: string;
        price: number;
        description: string;
        imageUrl: string; 
  }