const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getCategoryById(id) {
    const { rows } = await pool.query("SELECT * FROM categories WHERE category_id = ($1)", [id]);
    return rows;
}

async function AddCategory(name) {
  await pool.query("INSERT INTO categories (category_name) VALUES ($1)", [name]);
}

async function updateCategory(id, name) {
  await pool.query("UPDATE categories set category_name = ($1) WHERE category_id = ($2)", [name, id]);
}

async function deleteCategory(id) {
    await pool.query("DELETE FROM categories WHERE category_id = ($1)", [id]);
}

async function getItemsByCategory(id) {
    const { rows } = await pool.query("SELECT * FROM items WHERE category_id = ($1)", [id]);
    return rows;
}

async function getItemById(id) {
    const { rows } = await pool.query("SELECT * FROM items WHERE item_id = ($1)", [id]);
    return rows;
}

async function insertItem(name, quantity, price, category) {
  await pool.query("INSERT INTO items (item_name, quantity, price, category_id) VALUES ($1, $2, $3, $4)", [name, quantity, price, category]);
}

async function UpdateItem(id, name, quantity, price, category) {
  await pool.query("UPDATE items SET item_name = ($1), quantity = ($2), price = ($3), Category_id = ($4) WHERE item_id = ($5)", [name, quantity, price, category, id]);
}

async function deleteItem(id) {
    await pool.query("DELETE FROM items WHERE item_id = ($1)", [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  AddCategory,
  updateCategory,
  deleteCategory,
  getItemsByCategory,
  getItemById,
  insertItem,
  UpdateItem,
  deleteItem
};