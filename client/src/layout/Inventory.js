import React, { useEffect, useState } from 'react';
import apis from '../axios/api';
import InventoryCard from '../components/Card/InventoryCard';

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
  });

  return (
    <div className="d-flex flex-row flex-wrap" style={styles}>
      {products?.map((product, id) => (
        <InventoryCard product={product} key={id} />
      ))}
      ;
    </div>
  );
}

export default Inventory;
