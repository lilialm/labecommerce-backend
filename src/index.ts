import { products, purchase, users } from './database';
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Product, Purchase, User, CATEGORY, TUser, TProduct } from './types';
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
    const result: TUser[] = await db('users')
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
    const result: TProduct[] = await db('products')
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
    const productIdExists = await db('products').select('*').where('id', id).first();
    if (!productIdExists) {
      throw new Error('id do produto não encontrado.');
    }
    res.status(200).send([productIdExists]);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send('Erro ao encontrar produto.');
  }
});

// getUserPurchasesByUserId
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const purchasesResult = await db.raw(`SELECT * FROM purchases WHERE buyer_id = "${userId}"
    
    `);
    res.status(200).json([purchasesResult]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar compras");
  }
});

// deleteUserById
app.delete('/users/:id', async (req:Request, res:Response) => {
  try {
    const userToDelete: string = req.params.id
    const userIdExists: TUser[] = await db.select('*').from('users').where({id: userToDelete})
    if (userIdExists.length === 0) {
        throw new Error("ID do usuário não encontrado.")
    }
    await db.delete().from('users').where({id: userIdExists})
    res.send('Usuário deletado com sucesso da base de dados.')

   } catch (error: any) {
     res.status(400).send(error.message)
   }
})

// deleteProductById 
app.delete('/products/:id', async (req:Request, res:Response) => {
  try {
    const productToDelete: string = req.params.id
    const productExists: TUser[] = await db.select('*').from('products').where({id: productToDelete})
    if (productExists.length === 0) {
        throw new Error("Produto não encontrado.")
    }
    await db.delete().from('products').where({id: productExists})
    res.send('Produto deletado com sucesso da base de dados.')

   
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

// getPurchaseById 
app.get('/purchases/:id', async (req: Request, res: Response) => {
  try {
  const purchaseId = req.params.id;
  const purchase = await db('purchases')
  .select('*')
  .where({ id: purchaseId })
  .first();
  const output = {
    purchaseId: purchase.id,
    totalPrice: purchase.total_price,
    createdAt: purchase.created_at,
    isPaid: purchase.is_paid,
    buyerId: purchase.buyer_id,
    email: purchase.email,
    name: purchase.name,
  };
  res.status(200).json(output);
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