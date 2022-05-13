import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Inventory from './layout/Inventory'
import CreateProduct from './layout/CreateProduct'
import EditProduct from './layout/EditProduct'
import Shipments from './layout/Shipments'
import CreateShipment from './layout/CreateShipment'

const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/products" exact component={<Inventory />} />
          <Route path="/product/create" exact component={<CreateProduct />} />
          <Route path="/product/edit/:id" exact component={<EditProduct />} />
          <Route path="/shipments" exact component={<Shipments />} />
          <Route path="/shipment/create" exact component={<CreateShipment />} />

        </Switch>
    </BrowserRouter>
  );
};

export default Routes;
