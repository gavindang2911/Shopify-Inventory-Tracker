import React, { useEffect, useState } from 'react'
import apis from '../axios/api';

function Inventory() {
  const [products, setProducts] = useState()

  // useEffect(async () => {
  //   await apis.getAllProducts().then((doc) => {
  //     setProducts(doc.data.productData)
  //   })
  // }, []);

  useEffect(() => {
    (async () => {
      await apis.getAllProducts().then((doc) => {
        setProducts(doc.data.productData)
        // console.log(products);
      })
    })();
  });


  return (
    <div className="container-fluid">
                {/* {products.map((product, key) => {
          <div key={key}> {product.name} </div>;
        })} */}

        {products?.map((product, id) => (
          <div key={id} >
            {product.name}
          </div>
        ))};
    </div>
  )
}

export default Inventory