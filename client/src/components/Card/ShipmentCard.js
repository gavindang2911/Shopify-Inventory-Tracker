import React from 'react';
import apis from '../../axios/api';

function ShipmentCard(props) {
  const styles = {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyItems: 'center',
    margin: 20,
    width: 300,
  };
  return (
    <div className="card" style={styles}>
      <div>{props.shipment.firstName} {props.shipment.lastName}</div>
      <div
        className="card-body"
        style={{
          backgroundColor: 'lightblue',
          width: 300,
        }}
      >
        <h5 className="card-title">{props.shipment.createdAt.slice(0,19)}</h5>
        <h6 className="text-muted">Address: {props.shipment.address}</h6>
        {props.shipment.orders.map((item, id) => (
            <li className="card-text" key={id}>{item.name}: {item.quantity}</li>
        ))}
        {/* <p className="card-text">{props.product.description}</p> */}
        {/* <h6 className="text-muted">
          Stock Available: {props.product.quantity}
        </h6> */}
        <br />
        <div className="d-flex  justify-content-around">
          <a
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/products/edit/' + props.shipment._id;
            }}
          >
            Update
          </a>
          <a className="btn btn-danger"
          onClick={(e) => {
            e.preventDefault();
            apis.deleteProduct(props.shipment._id);
          }}
          >Delete</a>
        </div>
      </div>
    </div>
  );
}

export default ShipmentCard;
