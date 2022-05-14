import axios from 'axios';

const apiURL = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const createProduct = (payload) => {
  return apiURL.post(`/product`, payload);
};
const getAllProducts = () => {
  return apiURL.get(`/products`);
};
const updateProduct = (id, payload) => {
  return apiURL.put(`/product/${id}`, payload);
};
const deleteProduct = (id) => {
  return apiURL.delete(`/product/${id}`);
};
const getProduct = (id) => {
  return apiURL.get(`/product/${id}`);
};

const getShipments = () => {
  return apiURL.get(`/shipments`);
};

const createShipment = (payload) => {
  return apiURL.post(`/shipment`, payload);
};

const updateShipment = (id, payload) => {
  return apiURL.put(`/shipment/${id}`, payload);
};

const deleteShipment = (id) => {
  return apiURL.delete(`/shipment/${id}`);
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
  deleteShipment,
};

export default apis;
