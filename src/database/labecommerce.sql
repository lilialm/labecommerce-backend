-- Active: 1682102166602@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, email, password)
VALUES (
        "u1",
        "lili.l2002@hotmail.com",
        "123456"
    ), (
        "u2",
        "urielbochi@gmail.com",
        "785467"
    ), (
        "u3",
        "matheuspepe@gmail.com",
        "678923"
    );

CREATE TABLE
    products (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "p1",
        "Camêra Cybershot",
        200,
        "Eletrônicos"
    ), (
        "p2",
        "Playstation 5",
        3500,
        "Eletrônicos"
    ), (
        "p3",
        "Horizon Forbidden West",
        199,
        "Jogos"
    ), (
        "p4",
        "God of War Ragnarok",
        199,
        "Jogos"
    ), ("p5", "FIFA 23", 89, "Jogos");

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER DEFAULT(0) NOT NULL,
        delivered_at TEXT DEFAULT (DATETIME()) NOT NULL,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

DROP TABLE purchases;

INSERT INTO
    purchases (id, total_price, paid, buyer_id)
VALUES ("pch1", 600, 0, "u1"), ("pch2", 1999, 1, "u2"), ("pch3", 398, 1, "u2");

INSERT INTO purchases VALUES ("pch5", 3500, 0, "25/03/2023", "u1");

SELECT * FROM users AS getAllUsers;

SELECT * FROM products AS getAllProducts;

SELECT * FROM purchases AS getAllPurchases;

SELECT *
FROM
    products AS searchProductByName
WHERE name LIKE "%FIFA%";

INSERT INTO users VALUES ("u4", "lucasorsi@hotmail.com", "456109");

INSERT INTO products
VALUES (
        "p6",
        "Xbox Series S",
        2000,
        "Eletrônicos"
    );

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER DEFAULT(1) NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

INSERT INTO purchases_products
VALUES ("pch1", "p1", 3), ("pch2", "p6", 1), ("pch3", "p4", 2), ("pch4", "p2", 1);

SELECT * FROM products AS getProductsById WHERE id = "p6";

DELETE FROM users WHERE id = "u3";

DELETE FROM products WHERE id = "p2";

UPDATE users SET email = "lilianalmeida@gmail.com" WHERE id = "u1";

UPDATE products SET price = 1999 WHERE id = "p6";

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

SELECT *
FROM products
WHERE price >= 150 AND price < 300
ORDER BY "price" ASC;

SELECT
    purchases.id AS idDaCompra,
    users.id AS idDoUsuario,
    users.email AS emailDoUsuario,
    purchases.total_price AS precoTotal,
    purchases.paid AS pago,
    purchases.delivered_at AS entregueEm
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id;

SELECT
    purchase_id AS idPurchases,
    purchases.buyer_id AS idUsers,
    product_id AS idProducts,
    products.name AS productsName,
    products.price,
    quantity,
    purchases.total_price
FROM purchases_products
    INNER JOIN products ON product_id = products.id
    INNER JOIN purchases ON purchase_id = purchases.id;