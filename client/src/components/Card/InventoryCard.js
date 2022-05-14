import React from 'react';
import apis from '../../axios/api';

function InventoryCard(props) {
  const styles = {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyItems: 'center',
    margin: 20,
    width: 300,
  };
  return (
    <div className="card" style={styles}>
      <div>{props.product.category}</div>
      <div
        className="card-body"
        style={{
          backgroundColor: 'lightblue',
          width: 300,
        }}
      >
        <h5 className="card-title">{props.product.name}</h5>
        <h6 className="text-muted">Price Per Unit: ${props.product.price}</h6>
        <p className="card-text">{props.product.description}</p>
        <h6 className="text-muted">
          Stock Available: {props.product.quantity}
        </h6>
        <br />
        <div className="d-flex  justify-content-around">
          <a
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/products/edit/' + props.product._id;
            }}
          >
            Update
          </a>
          <a className="btn btn-danger"
          onClick={(e) => {
            e.preventDefault();
            apis.deleteProduct(props.product._id);
          }}
          >Delete</a>
        </div>
      </div>
    </div>
  );
}

export default InventoryCard;
