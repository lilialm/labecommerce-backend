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

SELECT * FROM users;

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

SELECT * FROM products;

DROP TABLE products;