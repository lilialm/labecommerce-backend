import { products, purchase, users } from './database';
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Product, Purchase, User, CATEGORY } from './types';
import { db } from "./database/knex"


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
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM users;
    `)
    res.status(200).send(result)
} catch (error){
    console.log(error)

    if(res.statusCode === 200){
        res.status(500)
    }

    if(error instanceof Error){
        res.send(error.message)
    } else {
        res.send("Erro inesperado.")
    }

}
  });

// getAllProducts
app.get("/products", async (req: Request, res: Response) => {
  try{
    const result = await db.raw(`
        SELECT * FROM products
    `)
    res.status(200).send(result)
} catch(error){
    console.log(error)

    if (res.statusCode === 200){
        res.status(500)
    }

    if (error instanceof Error){
        res.send(error.message) 
    } else {
        res.send("Erro inesperado.")
    }
}
  });

// getProductByName
app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q

    if (!q) {
        throw new Error("Parâmetro de busca vazio.")
    }

    if (typeof q !== "string") {
        throw new Error("O parâmetro de busca deve ser uma string.")
    }

    const result = await db.raw(`
    SELECT * FROM products AS searchProductByName
    WHERE name LIKE "%${q}%" ;
    `)

    res.status(200).send(result)

} catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado.")
    }

}
  });

//createUser
app.post("/users", async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    await db.raw(`
        INSERT INTO users (id, name, email, password )
        VALUES ("${id}","${name}", "${email}", "${password}");
    `);

    res.status(201).send("Usuário criado com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("Erro: Usuário não criado.");
  }


  });

// createProduct
  app.post("/products", async (req: Request, res: Response) => {
    try {
    const id: string = req.body.id;
    const name: string = req.body.name;
    const price: number = req.body.price;
    const description: string = req.body.description;
    const imageUrl: string = req.body.imageUrl;

    await db.raw(`
    INSERT INTO products (id, name, price, description, imageUrl)
    VALUES ("${id}","${name}", "${price}", "${description}", "${imageUrl}");
    `);

    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro ao criar produto!!");
  }
  });

// createPurchase
  app.post("/purchase", async (req: Request, res: Response) => {
    try {
      const buyer = req.body.buyer;
      const totalPrice = req.body.totalPrice;
      const paid = req.body.paid;
      const product_id = req.body.product_id;
      const quantity = req.body.quantity;
  
      const purchase_id = Math.floor(Date.now() * Math.random()).toString(36);
      console.log(buyer, totalPrice, paid, product_id, quantity);
      await db.raw(`
          INSERT INTO purchase (id, buyer, total_price, paid )
          VALUES ('${purchase_id}','${buyer}', ${totalPrice}, ${paid});
      `);
  
      await db.raw(`
          INSERT INTO purchases_products (purchase_id, product_id, quantity )
          VALUES ('${purchase_id}', '${product_id}', ${quantity});
      `);
  
      res.status(201).send("Compra cadastrada com sucesso!");
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send("Erro ao realizar compra.");
    }
  });

// getProductsById
app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [productIdExists]: {}[] = await db.raw(`SELECT * FROM products WHERE id = '${id}'`)
      if (!productIdExists) {
        throw new Error('id do produto não encontrado.')
      }

    res.status(200).send([productIdExists]);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("Erro ao encontrar produto.");
  }
});

// getUserPurchasesByUserId
app.get('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const result = await db.raw(`
    SELECT purchase.id as purchaseId, purchase.total_price as totalPrice, purchase.paid, 
      users.id as buyerId, users.name as buyerName, users.email as buyerEmail,
      products.id as productId, products.name as productName, products.price as productPrice, 
      products.description as productDescription, products.imageUrl as productImageUrl, 
      purchases_products.quantity as productQuantity
    FROM purchase
    INNER JOIN users ON purchase.buyer = users.id
    INNER JOIN purchases_products ON purchase.id = purchases_products.purchase_id
    INNER JOIN products ON purchases_products.product_id = products.id
    WHERE purchase.id = "${id}"
  `);
  if (result.length === 0) {
    res.status(404).send("Compra não encontrada.");
  }
  res.status(200).send([result]);
} catch (error) {
  console.log(error);

  if (res.statusCode === 200) {
    res.status(500);
  }
  res.send("Erro ao encontrar compra desse usuário.");
}
})

// deleteUserById
app.delete('/users/:id', (req:Request, res:Response) => {
  try {
    const {id} = req.params
    if(typeof id !== "string"){
        throw new Error("A ID do usuário tem que ser uma string.")
    }
    const userResult = users.findIndex((user) => {
        return user.id === id
    })
    userResult < 0 ? res.status(404).send("Usuário não existe.") :
        (users.splice(userResult, 1), res.status(202).send("Usuário excluído com sucesso!"))
} catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
    }
    if(error instanceof Error){
        res.send(error.message)
    } else {
        res.send("Erro inesperado.")
    }
}
})

// deleteProductById 
app.delete('/products/:id', (req:Request, res:Response) => {
  try {
    const { id } = req.params
    if (typeof id !== "string") {
        throw new Error("A ID tem que ser uma string.")
    }
    const productResult = products.findIndex((product) => {
        return product.id === id
    })
    productResult < 0 ? res.status(404).send("Produto não existe.") :
        (products.splice(productResult, 1), res.status(202).send("Produto excluído com sucesso!"))
} catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado.")
    }
}
})

// editUserById
app.put('/users/:id', (req:Request, res:Response) => {
  try {
    const { id } = req.params
    const newId = req.body.id
    const { email, password } = req.body
    if (!newId) {
        throw new Error("ID inexistente, por favor digite um ID válido.")
    }
    if (typeof newId !== "string") {
        throw new Error("A ID tem que ser uma string.")
    }
    if (!email) {
        throw new Error("Email inexistente, por favor digite um Email válido.")
    }
    if (typeof email !== "string") {
        throw new Error("O Email tem que ser uma string.")
    }
    if (!password) {
        throw new Error("Senha inexistente, por favor digite uma senha válida.")
    }
    if (typeof password !== "string") {
        throw new Error("A senha tem que ser uma string.")
    }
    const findUserToEdit = users.find((user) => user.id === id)
    if (findUserToEdit) {
        findUserToEdit.id = newId || findUserToEdit.id
        findUserToEdit.email = email || findUserToEdit.email
        findUserToEdit.password = password || findUserToEdit.password
        res.status(200).send("Cadastro atualizado com sucesso.")
    } else {
        throw new Error("ID inexistente, por favor digite um ID válido.")
    }
} catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado.")
    }
}
}) 

// editProductById
app.put('/products/:id', (req:Request, res:Response) => {

  try {
    const { id } = req.params
    const newId = req.body.id
    const { name, price, category } : Product = req.body
    if (!newId) {
        throw new Error("ID inexistente, por favor digite um ID válido.")
    }
    if (typeof newId !== "string") {
        throw new Error("A ID tem que ser uma string.")
    }
    if (!name) {
        throw new Error("Nome inexistente, por favor digite um nome válido.")
    }
    if (typeof name !== "string") {
        throw new Error("O nome tem que ser uma string.")
    }
    if (!price) {
        throw new Error("Preço inexistente, por favor digite um preço válido.")
    }
    if (typeof price !== "number") {
        throw new Error("O preço tem que ser do tipo número.")
    }
    if (!category) {
        throw new Error("Categoria inexistente, por favor digite uma categoria válida.")
    }
    const findProductToEdit = products.find((product) => product.id === id)
    if (findProductToEdit) {
        findProductToEdit.id = newId || findProductToEdit.id
        findProductToEdit.name = name || findProductToEdit.name
        findProductToEdit.price = price || findProductToEdit.price
        findProductToEdit.category = category || findProductToEdit.category
        res.status(200).send("Produto atualizado com sucesso.")
    } else {
        throw new Error("ID do produto inexiste, por favor digite uma ID válida.")
    }
} catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado.")
    }
}

}) 