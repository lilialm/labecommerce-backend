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

SELECT * FROM users AS getAllUsers;

SELECT * FROM products AS getAllProducts;

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