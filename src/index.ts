import { products, purchase, users } from './database';
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Product, Purchase, User } from './types';

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// getAllUsers
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
  });

// getAllProducts
app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products);
  });

// getProductByName
app.get("/product/search", (req: Request, res: Response) => {
    const q = req.query.q as string;
  
    const result = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))

    res.status(200).send(result);
  });

//createUser
app.post("/users", (req: Request, res: Response) => {
    const { id, email, password }: User = req.body;
  
    const newUser = {
      id,
      email,
      password,
    };
  
    users.push(newUser);
  
    res.status(201).send("Usuário criado com sucesso");
  });

// createProduct
  app.post("/products", (req: Request, res: Response) => {
    const { id, name, price, category }: Product = req.body;
  
    const newProduct = {
      id,
      name,
      price,
      category,
    };
  
    products.push(newProduct);
  
    res.status(201).send("Produto inserido com sucesso!");
  });

// createPurchase
  app.post("/purchase", (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice }: Purchase = req.body;
  
    const newPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };
  
    purchase.push(newPurchase);
  
    res.status(201).send("Compra feita com sucesso!");
  });
