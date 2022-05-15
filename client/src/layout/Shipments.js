import React, { useEffect, useState } from 'react';
import apis from '../axios/api';
import ShipmentCard from '../components/Card/ShipmentCard'

function Shipments() {
  const styles = {
    padding: '50px 0 0 350px',
  };

  const [shipments, setShipments] = useState();

  useEffect(() => {
      apis.getShipments().then((doc) => {
        setShipments(doc.data.shipmentData);
      });
    ;
  });

  return (
    <div className="d-flex flex-row flex-wrap" style={styles}>
      {shipments?.map((shipment, id) => (
        <ShipmentCard shipment={shipment} key={id} />
      ))}
      ;
    </div>
  );
}

export default Shipments;
