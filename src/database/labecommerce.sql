-- Active: 1682102166602@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME())
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u1",
        "Lilian Almeida",
        "lili.l2002@hotmail.com",
        "123456"
    ), (
        "u2",
        "Uriel Bochi",
        "urielbochi@gmail.com",
        "785467"
    ), (
        "u3",
        "Matheus Pepe",
        "matheuspepe@gmail.com",
        "678923"
    );

CREATE TABLE
    products (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "p1",
        "Camêra Cybershot",
        200,
        "Eletrônicos",
        "https://s2.glbimg.com/SbFvjrunYZV7zDTbsq9XTVFjkdI=/0x0:600x450/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/6/G/AaEvGATm6rjo6ShUBsJA/2011-07-05-sony-cyber-shot-dsc-w180.jpg"
    ), (
        "p2",
        "Playstation 5",
        3500,
        "Eletrônicos",
        "https://images.kabum.com.br/produtos/fotos/238670/console-sony-playstation-5-edicao-digital_1634132113_original.jpg"
    ), (
        "p3",
        "Horizon Forbidden West",
        199,
        "Jogos",
        "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/ki0STHGAkIF06Q4AU8Ow4OkV.png"
    ), (
        "p4",
        "God of War Ragnarok",
        199,
        "Jogos",
        "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png"
    ), (
        "p5",
        "FIFA 23",
        89,
        "Jogos",
        "https://image.api.playstation.com/vulcan/ap/rnd/202301/0312/GU1vXFJpbzGYNV6UN3U0Cnnb.png"
    );

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer_id TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        paid INTEGER DEFAULT(0) NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

INSERT INTO
    purchases (id, buyer_id, total_price, paid)
VALUES ("pch1", "u1", 600, 0), ("pch2", "u2", 1999, 1), ("pch3", "u2", 398, 1), ("pch5", "u1", 3500, 0);

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
    INNER JOIN purchases ON purchase_id = purchases.id
WHERE users.id = "u1"