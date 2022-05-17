import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';

import apis from '../axios/api';

function CreateProduct() {
  const navigate = useNavigate();

  const [name, setname] = useState();
  const [category, setcategory] = useState();
  const [description, setdescription] = useState();
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();
  const [selectedFile, setselectedFile] = useState();

  const inputProductName = (e) => {
    e.preventDefault();
    setname(e.target.value);
  };
  const inputProductCategory = (e) => {
    e.preventDefault();
    setcategory(e.target.value);
  };
  const inputProductDescription = (e) => {
    e.preventDefault();
    setdescription(e.target.value);
  };
  const inputProductPrice = (e) => {
    e.preventDefault();
    setprice(e.target.value);
  };
  const inputProductQuantity = (e) => {
    e.preventDefault();
    setquantity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const inventory = { name, category, price, description, quantity, selectedFile};
    apis
      .createProduct(inventory)
      .then((doc) => {
        window.alert('Product created and added to the inventory successfully');
        navigate('/products');
      })
      .catch((err) => {
        window.alert('Missing Fields');
      });
  };
  return (
    <form style={{ padding: '50px 70px 0 350px' }}>
      <h2>Create Product</h2>

      <div className="form-group">
        <label>Product Name: </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Product Name"
          value={name}
          onChange={inputProductName}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Category: </label>
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={inputProductCategory}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Description: </label>
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={inputProductDescription}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Price per Unit: ($ Dollar)</label>
        <input
          type="number"
          className="form-control"
          placeholder="Price per Unit"
          value={price}
          onChange={inputProductPrice}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Stock available: </label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter stock"
          value={quantity}
          onChange={inputProductQuantity}
        />
      </div>
      <br />
      <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setselectedFile(base64)} /></div>
      <br />
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Create Product
      </button>
    </form>
  );
}

export default CreateProduct;
