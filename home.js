const React = require('react');
const { useState, useEffect } = React;
const axios = require('axios');

const url = "http://localhost:3000/products"; // Base URL for the products API

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(url); // Fetch all products
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Delete product by ID
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url}/${id}`); // Delete product by ID
            setProducts(products.filter(product => product.id !== id)); // Remove deleted product from state
        } catch (err) {
            setError('Error deleting product');
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            {products.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default Home;
