const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR (50)
);

CREATE TABLE IF NOT EXISTS items (
  item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_name VARCHAR (50),
  quantity NUMERIC(3),
  price NUMERIC(3,1),
  category_id INTEGER REFERENCES categories(category_id)
);

INSERT INTO categories (category_name)
VALUES
  ('Football'),
  ('Basketball'),
  ('Tennis'),
  ('Swimming');

INSERT INTO items (item_name, quantity, price, category_id)
VALUES
  ('footBall', 30, 25.0, 1),
  ('Goalkeeper Gloves', 15, 20, 1),
  ('Basketball', 20, 39.9, 2),
  ('Basketball Hoop', 5, 90.9, 2),
  ('Tennis Racket', 12, 89.9, 3),
  ('Tennis Balls (Pack of 3)', 50, 12.5, 3),
  ('Swimming Goggles', 25, 19.9, 4),
  ('Swim Cap', 40, 9.9, 4);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();