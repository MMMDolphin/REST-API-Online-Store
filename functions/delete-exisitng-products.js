const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'onlinestore',
    password: 'example',
    port: 5432,
});

//Fetch products
const deleteProductById = async (productId) => {
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);

        if (result.rowCount === 0) {
            return { message: 'Product not found' };
        }

        return { message: 'Product deleted successfully', product: result.rows[0] };
    } catch (error) {
        console.error('Error deleting product:', error );
    }
};

module.exports= { deleteProductById };