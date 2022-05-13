import axios from 'axios';

const apiURL = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const createProduct = (payload) => {
  apiURL
    .post(`/product`, payload)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getAllProducts = () => {
  return apiURL.get(`/products`);

};
const updateProduct = (id, payload) => {
  apiURL
    .put(`/product/${id}`, payload)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteProduct = (id) => {
  apiURL
    .delete(`/product/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getProduct = (id) => {
  apiURL
    .get(`/product/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};


const getShipments = () => {
    apiURL
      .get(`/shipments`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createShipment = (payload) => {
    apiURL
      .post(`/shipment`, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateShipment = (id, payload) => {
    apiURL
      .put(`/shipment/${id}`, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteShipment = (id) => {
    apiURL
      .delete(`/shipment/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const apis = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProduct,
    getShipments,
    createShipment,
    updateShipment,
    deleteShipment
  };

  export default apis;
