import React from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <div className='sidebar'>


      <Link className="navbar-brand" to="/">
        Shopify Inventory Tracker
      </Link>
      <div  id="navbarNav">
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

    </div>
  );
}

export default NavBar;
