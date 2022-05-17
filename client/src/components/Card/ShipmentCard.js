import React from 'react';
import apis from '../../axios/api';

function ShipmentCard(props) {
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
  return (
    <div className="card" style={styles}>
      <div>
        {props.shipment.firstName} {props.shipment.lastName}
      </div>
      <div
        className="card-body"
        style={{
          backgroundColor: 'lightblue',
          width: 300,
        }}
      >
        <h5 className="card-title">{props.shipment.createdAt.slice(0, 19)}</h5>
        <h6 className="text-muted">Address: {props.shipment.address}</h6>
        {props.shipment.orders.map((item, id) => (
          <li className="card-text" key={id}>
            {item.name}: {item.quantity}
          </li>
        ))}
        {/* <p className="card-text">{props.product.description}</p> */}
        {/* <h6 className="text-muted">
          Stock Available: {props.product.quantity}
        </h6> */}
        <br />
        <div className="d-flex  justify-content-around">
          <a
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              apis.deleteShipment(props.shipment._id);
            }}
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

export default ShipmentCard;
