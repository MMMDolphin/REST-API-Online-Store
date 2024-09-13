// Assuming you're using a database client like Mongopool, Sequelize, or plain SQL
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'onlinestore',
    password: 'example',
    port: 5432,
});
async function getAllProducts() {
    try {
        // Replace with your actual query or ORM logic
        const products = await pool.query('SELECT * FROM products'); // SQL example
        return products.rows; // Adjust based on your database client
    } catch (error) {
        throw new Error('Failed to retrieve products');
    }
}

module.exports = { getAllProducts };
