import React, { useState } from 'react';

const ProductManagement = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        imageUrl: ''
    });
    const [message, setMessage] = useState('');
    const [productId, setProductId] = useState('');
    const [deleteIds, setDeleteIds] = useState('');
    const [category, setCategory] = useState('');
    const [importFile, setImportFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleProductIdChange = (e) => setProductId(e.target.value);
    const handleDeleteIdsChange = (e) => setDeleteIds(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleFileChange = (e) => setImportFile(e.target.files[0]);

    const addProduct = async () => {
        const response = await fetch('http://127.0.0.1:8000/product/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const result = await response.json();
        setMessage(result.Message);
    };

    const deleteProduct = async () => {
        const response = await fetch(`http://127.0.0.1:8000/product/delete/${productId}/`, {
            method: 'DELETE',
        });
        const result = await response.json();
        setMessage(result.Message);
    };

    const updateProduct = async () => {
        const response = await fetch(`http://127.0.0.1:8000/product/update/${productId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: product.name }), // Update with necessary fields
        });
        const result = await response.json();
        setMessage(result.Message);
    };

    const deleteMultipleProducts = async () => {
        const response = await fetch('http://127.0.0.1:8000/product/delete-multiple/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_ids: deleteIds.split(',') }),
        });
        const result = await response.json();
        setMessage(result.Message);
    };

    const getProductsByCategory = async () => {
        const response = await fetch(`http://127.0.0.1:8000/product/get/category/${category}/`);
        const result = await response.json();
        setMessage(JSON.stringify(result.Products, null, 2)); // Display products
    };

    const importProducts = async () => {
        const formData = new FormData();
        formData.append('file', importFile);

        const response = await fetch('http://127.0.0.1:8000/product/import-products/', {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        setMessage(result.Message);
    };

    return (
        <div>
            <h2>Add Product</h2>
            <input name="name" placeholder="Name" onChange={handleInputChange} required />
            <input name="description" placeholder="Description" onChange={handleInputChange} required />
            <input name="price" type="number" placeholder="Price" onChange={handleInputChange} required />
            <input name="stock" type="number" placeholder="Stock" onChange={handleInputChange} required />
            <select name="category" onChange={handleInputChange} required>
                <option value="">Select Category</option>
                <option value="ELEC">Electronics</option>
                <option value="FASH">Fashion</option>
                <option value="TOYS">Toys</option>
            </select>
            <input name="imageUrl" placeholder="Image URL" onChange={handleInputChange} />
            <button onClick={addProduct}>Add Product</button>

            <h2>Delete Product</h2>
            <input placeholder="Product ID" onChange={handleProductIdChange} required />
            <button onClick={deleteProduct}>Delete Product</button>

            <h2>Update Product</h2>
            <input placeholder="Product ID" onChange={handleProductIdChange} required />
            <input name="name" placeholder="New Name" onChange={handleInputChange} />
            <button onClick={updateProduct}>Update Product</button>

            <h2>Delete Multiple Products</h2>
            <input placeholder="Product IDs (comma separated)" onChange={handleDeleteIdsChange} required />
            <button onClick={deleteMultipleProducts}>Delete Multiple Products</button>

            <h2>Get Products by Category</h2>
            <input placeholder="Category" onChange={handleCategoryChange} required />
            <button onClick={getProductsByCategory}>Get Products</button>

            <h2>Import Products from CSV</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={importProducts}>Import Products</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductManagement;
