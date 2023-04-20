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

// getProductsById
app.get('/products/:id', (req: Request, res: Response) => {
    const {id} = req.params
    const result = products.find((product) => product.id === id)
    res.status(200).send(result) 
});

// getUserPurchasesByUserId
app.get('/purchases/:userId', (req: Request, res: Response) => {
    const {userId} = req.params
    const result = purchase.find((purchases) => purchases.userId === userId)
    res.status(200).send(result) 
})

// deleteUserById
app.delete('/users/:id', (req:Request, res:Response) => {
    const {id} = req.params
    const result = users.findIndex((user) => {
        return user.id === id
    })

    result < 0 ? res.status(404).send("Usuário não existe.") :
    (users.splice(result, 1), res.status(202).send("Usuário excluído com sucesso!") )
})

// deleteProductById 
app.delete('/products/:id', (req:Request, res:Response) => {
    const {id} = req.params
    const result = products.findIndex((product) => {
        return product.id === id
    })

    result < 0 ? res.status(404).send("Produto não existe.") :
    (products.splice(result, 1), res.status(202).send("Produto excluído com sucesso!") )
})

// editUserById
app.put('/users/:id', (req:Request, res:Response) => {
    const {id} = req.params
    const newId = req.body.id
    const {email, password} = req.body

    const findUserToEdit = users.find((user) => user.id === id)

    if (findUserToEdit) {
        findUserToEdit.id = newId || findUserToEdit.id
        findUserToEdit.email = email|| findUserToEdit.email
        findUserToEdit.password = password || findUserToEdit.password
        
    }
    res.status(200).send("Usuário atualizado com sucesso!")
}) 

// editProductById
app.put('/products/:id', (req:Request, res:Response) => {
    const {id} = req.params
    const newId = req.body.id
    const {name, price, category} = req.body

    const findProductToEdit = products.find((product) => product.id === id)

    if (findProductToEdit) {
        findProductToEdit.id = newId || findProductToEdit.id
        findProductToEdit.name = name || findProductToEdit.name
        findProductToEdit.price = price || findProductToEdit.price
        findProductToEdit.category = category || findProductToEdit.category
    }
    res.status(200).send("Produto atualizado com sucesso!")
}) 