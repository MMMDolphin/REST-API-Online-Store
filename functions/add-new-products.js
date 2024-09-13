const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'onlinestore',
    password: 'example',
    port: 5432,
});

// Function to insert a product into the database
const insertProduct = async (name, description, price, stock) => {
    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting product:', error);
        throw error;
    }
};

// Export the pool and the function to use in other files
module.exports = {
    pool,
    insertProduct,
};
