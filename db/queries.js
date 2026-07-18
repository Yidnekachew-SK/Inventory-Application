const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
}

async function AddCategory(name) {
  await pool.query("INSERT INTO categories (categoryName) VALUES ($1)", [name]);
}

async function updateCategory(id, name) {
  await pool.query("UPDATE categories set categoryName = ($1) WHERE categoryId = ($2)", [name, id]);
}

async function deleteCategory(id) {
    await pool.query("DELETE FROM categories WHERE categoryId = ($1)", [id]);
}

async function getItemsByCategory(id) {
    const { rows } = await pool.query("SELECT * FROM items WHERE categoryId = ($1)", [id]);
    return rows;
}

async function insertItem(name, quantity, price, category) {
  await pool.query("INSERT INTO items (itemName, quantity, price, CategoryId) VALUES ($1, $2, $3, $4)", [name, quantity, price, category]);
}

async function UpdateItem(id, name, quantity, price, category) {
  await pool.query("UPDATE items SET itemName = ($1), quantity = ($2), price = ($3), CategoryId = ($4) WHERE itemId = ($5)", [name, quantity, price, category, id]);
}

async function deleteItem(id) {
    await pool.query("DELETE FROM items WHERE itemId = ($1)", [id]);
}

module.exports = {
  getAllCategories,
  AddCategory,
  updateCategory,
  deleteCategory,
  getItemsByCategory,
  insertItem,
  UpdateItem,
  deleteItem
};