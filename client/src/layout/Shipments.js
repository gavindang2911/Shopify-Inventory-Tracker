import React, { useEffect, useState } from 'react';
import apis from '../axios/api';
import ShipmentCard from '../components/Card/ShipmentCard';
import { Grid } from '@material-ui/core';

function Shipments() {
  const styles = {
    padding: '50px 0 0 350px',
  };

  const [shipments, setShipments] = useState();

  useEffect(() => {
    apis.getShipments().then((doc) => {
      setShipments(doc.data.shipmentData);
    });
  });

  return (
    <div className="d-flex flex-row flex-wrap" style={styles}>
      {shipments?.map((shipment, id) => (
        <Grid item xs={6} sm={4} md={4}>
          {/* <InventoryCard product={product} key={id} /> */}
          <ShipmentCard shipment={shipment} key={id} />
        </Grid>
      ))}
      ;
    </div>
  );
}

export default Shipments;
