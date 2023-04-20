import { Product, Purchase, User } from "./types";

export const users: User[] = [
    {
      id: "U1",
      email: "lili.l2002@hotmail.com",
      password: "123456",
    },
    {
      id: "U2",
      email: "urielbochi@gmail.com",
      password: "456789",
    }
    
  ];
  
  export const products: Product[] = [
    {
      id: "P1",
      name: "HBO Max",
      price: 27,
      category: "Serviço de Streaming",
    },
    {
      id: "P2",
      name: "Prime Video",
      price: 15,
      category: "Serviço de Streaming",
    }

  ];
  
  export const purchase: Purchase[] = [
    {
      userId: "U1",
      productId: "P1",
      quantity: 1,
      totalPrice: 27,
    },
    {
      userId: "U2",
      productId: "P2",
      quantity: 1,
      totalPrice: 15,
    },
  ];