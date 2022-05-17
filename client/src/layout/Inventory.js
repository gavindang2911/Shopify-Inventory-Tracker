import React, { useEffect, useState } from 'react';
import apis from '../axios/api';
import InventoryCard from '../components/Card/InventoryCard';
import { Grid, CircularProgress } from '@material-ui/core';
function Inventory() {
  const styles = {
    padding: '50px 0 0 350px',
  };
  const [products, setProducts] = useState();

  // useEffect(async () => {
  //   await apis.getAllProducts().then((doc) => {
  //     setProducts(doc.data.productData)
  //   })
  // }, []);

  useEffect(() => {
      apis.getAllProducts().then((doc) => {
        setProducts(doc.data.productData);
        // console.log(products);
      });
    ;
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap" style={styles}>
      {products?.map((product, id) => (
        // <InventoryCard product={product} key={id} />
        <Grid item  sm={4} md={4}>
            <InventoryCard product={product} key={id} />
        </Grid>
      ))}
    </div>
  );
}

export default Inventory;
