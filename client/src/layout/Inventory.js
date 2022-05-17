import React, { useEffect, useState } from 'react';
import apis from '../axios/api';
import InventoryCard from '../components/Card/InventoryCard';

import { Grid, AppBar, TextField, Button } from '@material-ui/core';

import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Inventory() {
  const styles = {
    padding: '50px 0 0 350px',
  };
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    apis.getAllProducts().then((doc) => {
      setProducts(doc.data.productData);
    });
  });

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchProduct();
    }
  };

  const searchProduct = () => {
    if (search.trim()) {
      apis.getProductBySearch(search).then((doc) => {
        setSearchProducts(doc.data.productSearchData);
      });
      navigate(`/products/search?searchQuery=${search || 'none'}`);
    } else {
      setSearchProducts([]);
      navigate(`/products`);
    }
  };

  return (
    <div style={styles}>

      <Grid>
        <AppBar
          position="static"
          color="inherit"
          style={{ width: '300px', marginLeft:'20px',display: 'flex', flexDirection: 'row' }}
        >
          <TextField
            name="search"
            onKeyDown={handleKeyPress}
            label="Search By Category"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={searchProduct} variant="contained" color="primary">
            Search
          </Button>
        </AppBar>
      </Grid>
      {searchProducts.length == 0 ? (
        <div className="d-flex flex-row flex-wrap">
          {products.map((product, id) => (
            <Grid>
              <InventoryCard product={product} key={id} />
            </Grid>
          ))}
        </div>
      ) : (
        <div className="d-flex flex-row flex-wrap">
          {searchProducts.map((product, id) => (
            <Grid item sm={4} md={4}>
              <InventoryCard product={product} key={id} />
            </Grid>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;
