import React from 'react';
// import { Switch, Route } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inventory from './layout/Inventory'
import CreateProduct from './layout/CreateProduct'
import EditProduct from './layout/EditProduct'
import Shipments from './layout/Shipments'
import CreateShipment from './layout/CreateShipment'
import NavBar from './components/NavBar';

const AppRoutes = () => {
  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/products" exact element={<Inventory />} />
          <Route path="/product/create" exact element={<CreateProduct />} />
          <Route path="/product/edit/:id" exact element={<EditProduct />} />
          <Route path="/shipments" exact element={<Shipments />} />
          <Route path="/shipment/create" exact element={<CreateShipment />} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
