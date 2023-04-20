import { Product, Purchase, User, CATEGORY } from "./types";

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

  export function createUser(id: string, email: string, password: string): void {

    const newUser: User = {
        id,
        email,
        password
    }
    users.push(newUser)
    console.log("Novo usuário cadastrado com sucesso!")

}

export function getAllUsers(): User[] {

  return users
}
  
  export const products: Product[] = [
    {
      id: "P1",
      name: "HBO Max",
      price: 27,
      category: CATEGORY.STREAMING,
    },
    {
      id: "P2",
      name: "Prime Video",
      price: 15,
      category: CATEGORY.STREAMING,
    }

  ];

  export function getAllProducts(): Product[] {

    return products
}

export function createProduct(id: string, name: string, price: number, category: CATEGORY): void {

    const newProduct: Product = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    console.log("Produto cadastrado com sucesso!")

}



export function getProductById(id: string): Product[] {
    return products.filter((item) => {
        return item.id === id
    })

}

export function queryProductsByName(name: string): Product | undefined {
    return products.find((item) => { return item.name.toLowerCase().includes(name.toLowerCase()) })

}
  
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

  export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): void {

    const newPurchase: Purchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchase.push(newPurchase)
    console.log("Compra realizada com sucesso!")

}

export function getAllPurchasesFromUserId(id: string): Purchase[] {
    return purchase.filter((item) => { return item.userId === id })
}
