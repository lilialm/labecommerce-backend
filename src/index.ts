import { CATEGORY } from './types';
import { getAllUsers, createUser, createProduct, getProductById, getAllProducts, createPurchase, getAllPurchasesFromUserId, queryProductsByName } from './database';

createUser("U3", "matheuspepe@gmail.com", "987123")
console.table(getAllUsers())
createProduct("P3", "Canal ESPN", 39.90, CATEGORY.LIVETV)
console.table(getProductById("P2"))
console.table(getAllProducts())
createPurchase("U3", "P3", 2, 79.8)
console.table(getAllPurchasesFromUserId("U3")) 
console.table(queryProductsByName("hbo max"))
