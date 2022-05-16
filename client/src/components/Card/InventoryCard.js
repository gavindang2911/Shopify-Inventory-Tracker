import React from 'react';
import { generatePath } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apis from '../../axios/api';

function InventoryCard(props) {
  const styles = {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyItems: 'center',
    margin: 20,
    width: 300,
  };
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    const id = props.product._id;
    navigate(generatePath('/products/edit/:id', { id }));
  };
  return (
    <div className="card" style={styles}>
      <div>{props.product.category}</div>
      <div
        className="card-body"
        style={{
          backgroundColor: '#f0e7db',
          width: 300,
        }}
      >
        <h5 className="card-title">{props.product.name}</h5>
        <h6 className="text-muted">Price Per Unit: ${props.product.price}</h6>
        <h6 className="text-muted">
          Stock Available: {props.product.quantity}
        </h6>
        <p className="card-text">{props.product.description}</p>
        <br />
        <div className="d-flex  justify-content-around">
          <a className="btn btn-primary" onClick={handleEdit}>
            Update
          </a>
          <a
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              apis.deleteProduct(props.product._id);
            }}
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

export default InventoryCard;
