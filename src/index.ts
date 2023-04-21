import { products, purchase, users } from './database';
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Product, Purchase, User, CATEGORY } from './types';

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
  try {
    res.status(200).send(users)
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
app.get("/products", (req: Request, res: Response) => {
  try{
    res.status(200).send(products)
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
app.get("/product/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q
    if (!q) {
        throw new Error("Parâmetro de busca vazio.")
    }
    if (typeof q !== "string") {
        throw new Error("O parâmetro de busca deve ser uma string.")
    }
    const result = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
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
app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body
    if (!id) {
        throw new Error("ID inexistente, por favor digite um ID válido.")
    }
    if (typeof id !== "string") {
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
    const verificaId = users.find(user => user.id === id)
    if (verificaId) {
        throw new Error("ID do usuário já existe, por favor digite outra ID.")
    }
    const verificaEmail = users.find(user => user.email === email)
    if (verificaEmail) {
        throw new Error("Email do usuário já existe, por favor digite outro Email.")
    }
    if (!verificaEmail && !verificaEmail) {
        const newUser = { id, email, password }
        users.push(newUser)
        res.status(201).send("Usuário cadastrado com sucesso.")
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

  });

// createProduct
  app.post("/products", (req: Request, res: Response) => {
    try {
      const {id, name, price, category} : Product = req.body
      if(!id){
          throw new Error("ID inexistente, por favor digite um ID válido.")
      }
      if(typeof id !== "string"){
          throw new Error("A ID tem que ser uma string.")
      }
      if(!name){
          throw new Error("Nome inexistente, por favor digite um nome válido.")
      }
      if(typeof name !== "string"){
          throw new Error("O nome tem que ser uma string.")
      }
      if(!price){
          throw new Error("Preço inexistente, por favor digite um preço válido.")
      }
      if(typeof price !== "number"){
          throw new Error("O preço tem que ser do tipo número.")
      }
      if(!category){
          throw new Error("Categoria inexistente, por favor digite uma categoria válida.")
      }
      const verificaId = products.find(product => product.id === id)
      if (verificaId) {
          throw new Error("ID do produto já existe, por favor digite outra ID.")
      }
      if(!verificaId){
          const newProducts : Product = {id, name, price, category} 
          products.push(newProducts)
          res.status(201).send("Produto cadastrado com sucesso.")
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
  });

// createPurchase
  app.post("/purchase", (req: Request, res: Response) => {
    try {
      const { userId, productId, quantity, totalPrice }: Purchase = req.body;
  
      const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
      };
  
      purchase.push(newPurchase);
  
      res.status(201).send("Compra realizada com sucesso!");
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send("Erro ao fazer a compra.");
    }
  });

// getProductsById
app.get('/products/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = products.find((product) => product.id === id);

    if (!result) {
      throw new Error('Produto não existe.')
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("Erro ao encontrar produto.");
  }
});

// getUserPurchasesByUserId
app.get('/purchases/:userId', (req: Request, res: Response) => {
  try {
    const {userId} = req.params
    if (!userId){
        throw new Error("Digite a ID de um usuário existente.")
    }
    if(typeof userId !== "string"){
        throw new Error("ID do usuário precisa ser do tipo string.")
    }
    const result = purchase.filter((purchases) => purchases.userId.toLowerCase().includes(userId.toLowerCase()))
    
    if(result){
        res.status(200).send(result)
    } else {
        throw new Error("ID do usuário não encontrado.")
    }
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