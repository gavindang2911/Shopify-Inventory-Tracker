import React from 'react';
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Shopify Inventory Tracker
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/product/create">
              Create Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shipments">
              Shipments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shipment/create">
              Create Shipment
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
