import React from 'react';
import { generatePath } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apis from '../../axios/api';

function InventoryCard(props) {
  const styles = {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: 300,
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
  };

  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    const id = props.product._id;
    navigate(generatePath('/products/edit/:id', { id }));
  };
  const imgString =
    props.product.selectedFile ||
    'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

    return (
    <div className="card" style={styles}>
      <div>{props.product.category}</div>
      <div className="card-body">
        <img src={'' + imgString} width="298" height="200" />

        <div
          style={{
            padding: '10px 10px 10px 40px',
          }}
        >
          <h5 className="card-title">{props.product.name}</h5>
          <h6 className="text-muted">Price Per Unit: ${props.product.price}</h6>
          <h6 className="text-muted">
            Stock Available: {props.product.quantity}
          </h6>
          <p className="card-text">{props.product.description}</p>
        </div>
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
