"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.purchase = exports.queryProductsByName = exports.getProductById = exports.createProduct = exports.getAllProducts = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
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
function createUser(id, email, password) {
    const newUser = {
        id,
        email,
        password
    };
    exports.users.push(newUser);
    console.log("Novo usuário cadastrado com sucesso!");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
exports.products = [
    {
        id: "P1",
        name: "HBO Max",
        price: 27,
        category: types_1.CATEGORY.STREAMING,
    },
    {
        id: "P2",
        name: "Prime Video",
        price: 15,
        category: types_1.CATEGORY.STREAMING,
    }
];
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function createProduct(id, name, price, category) {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    exports.products.push(newProduct);
    console.log("Produto cadastrado com sucesso!");
}
exports.createProduct = createProduct;
function getProductById(id) {
    return exports.products.filter((item) => {
        return item.id === id;
    });
}
exports.getProductById = getProductById;
function queryProductsByName(name) {
    return exports.products.find((item) => { return item.name.toLowerCase().includes(name.toLowerCase()); });
}
exports.queryProductsByName = queryProductsByName;
exports.purchase = [
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
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    exports.purchase.push(newPurchase);
    console.log("Compra realizada com sucesso!");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(id) {
    return exports.purchase.filter((item) => { return item.userId === id; });
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
const result = exports.purchase.reduce((acc, current) => acc + (current.quantity * current.totalPrice), 0);
//# sourceMappingURL=database.js.map