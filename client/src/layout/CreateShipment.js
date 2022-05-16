import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apis from '../axios/api';

function CreateShipment() {
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState();
  const [middleName, setmiddleName] = useState('');
  const [lastName, setlastName] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [address, setaddress] = useState();
  const [orders, setorders] = useState([]);
  const [inventory, setinventory] = useState([]);
  const [orderCount, setorderCount] = useState(0);

  const [addProductFields, setaddProductFields] = useState([]);

  useEffect(() => {
    apis.getAllProducts().then((doc) => {
      setinventory(doc.data.productData);
    });
  });

  const inputFirstName = (e) => {
    e.preventDefault();
    setfirstName(e.target.value);
  };
  const inputMiddleName = (e) => {
    e.preventDefault();
    setmiddleName(e.target.value);
  };
  const inputLastName = (e) => {
    e.preventDefault();
    setlastName(e.target.value);
  };
  const inputPhoneNumber = (e) => {
    e.preventDefault();
    setphoneNumber(e.target.value);
  };
  const inputAddress = (e) => {
    e.preventDefault();
    setaddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shipment = {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      address,
      orders,
    };
    console.log(shipment);
    await apis
      .createShipment(shipment)
      .then((doc) => {
        window.alert('Shipment created successfully');
        navigate('/shipments');
      })
      .catch((err) => {
        console.log(err);
        window.alert('Missing Fields');
      });
  };
  const handleSelection = (event) => {
    const index = event.target.id;
    const order = [...orders];
    order[index].id = event.target.value;
    order[index].name = event.target.selectedOptions[0].label;
  };
  const handleQuantityInput = (event) => {
    const index = event.target.id;
    const order = [...orders];

    const quantity = event.target.value;
    order.at(index).quantity = quantity;
  };

  const addMoreProduct = () => {
    setorderCount(orderCount + 1);
    const order = { id: '', quantity: 0, name: '' };
    orders.push(order);
    setaddProductFields([
      ...addProductFields,
      <form>
        <label>Product: </label>
        <select
          id={orderCount}
          className="form-select"
          onChange={handleSelection}
        >
          <option value="default" selected></option>
          {inventory.map((e, id) => {
            return (
              <option value={e._id} key={id}>
                {e.name}
              </option>
            );
          })}
        </select>
        <label>
          {' '}
          Quantity:
          <input
            id={orderCount}
            type="number"
            min="1"
            step="1"
            onChange={handleQuantityInput}
            lang="en-US"
            required
          />
        </label>
      </form>,
    ]);
    console.log(orders);
  };

  return (
    <div style={{ padding: '50px 70px 0 350px' }}>
      <h2>Create Shipment To</h2>

      <div className="form-group">
        <label>First Name: </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter First Name"
          value={firstName}
          onChange={inputFirstName}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Middle Name: </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Middle Name"
          value={middleName}
          onChange={inputMiddleName}
        />
      </div>
      <small>Optinal</small>
      <br />
      <div className="form-group">
        <label>Last Name: </label>
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={lastName}
          onChange={inputLastName}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Phone Number: </label>
        <input
          type="number"
          className="form-control"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={inputPhoneNumber}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          value={address}
          onChange={inputAddress}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Add products: </label>
      </div>
      <br />
      {addProductFields}
      <button className="btn btn-primary" onClick={addMoreProduct}>
        Add more products
      </button>
      <br />
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Create Shipment
      </button>
    </div>
  );
}

export default CreateShipment;
