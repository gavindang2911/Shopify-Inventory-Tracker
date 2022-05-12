const express = require('express')
const {createShipment, getAllShipments, getByIdShipment, deleteByIdShipment} = require('../controllers/shipment.controller');

const router = express.Router();

router.post('/shipment', createShipment);
router.get('/shipments', getAllShipments);
router.get('/shipment/:id', getByIdShipment);
router.delete('/shipment/:id', deleteByIdShipment);


module.exports = router;