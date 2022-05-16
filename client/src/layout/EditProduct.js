import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import apis from '../axios/api';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setname] = useState();
  const [category, setcategory] = useState();
  const [description, setdescription] = useState();
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();

  useEffect(() => {
    apis.getProduct(id).then((doc) => {
      setname(doc.data.productData.name);
      setcategory(doc.data.productData.category);
      setdescription(doc.data.productData.description);
      setprice(doc.data.productData.price);
      setquantity(doc.data.productData.quantity);
    });
  }, []);
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
    const inventory = { name, category, price, description, quantity };
    console.log(inventory);
    apis
      .updateProduct(id, inventory)
      .then((doc) => {
        window.alert('Product inventory updated successfully');
        navigate('/products');
      })
      .catch((err) => {
        window.alert('Missing Fields');
      });
  };
  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <form style={{ padding: '50px 70px 0 350px' }}>
      <h2>Edit and Update Product</h2>

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
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Update
      </button>
      <span style={{ marginRight: '20px' }} />
      <button className="btn btn-danger" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditProduct;
