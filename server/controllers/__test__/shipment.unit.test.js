const productController = require('../product.controller');
const Shipment = require('../../models/shipment.model');
const request = require('supertest');
const app = require('../../app.js');
const mongoose = require('mongoose');
require('dotenv').config();

const expectedShipment = {
    _id: "6284685202598c9f0ce5e9f0",
    firstName: "teo",
    middleName: "teo",
    lastName: "Tom",
    phoneNumber: 123124125,
    address: "asdasd",
    orders: [
        {
            "id": "6284682bac35272b45ce8b79",
            "name": "Samsung 49-Inch Curved Gaming Monitor (LC49HG90DMNXZA)",
            "quantity": "30"
        }
    ]
};

const newShipment = {
    firstName: "teo",
    middleName: "teo",
    lastName: "Tom",
    phoneNumber: 123124125,
    address: "asdasd",
    orders: [
        {
            "id": "6284682bac35272b45ce8b79",
            "name": "Samsung 49-Inch Curved Gaming Monitor (LC49HG90DMNXZA)",
            "quantity": "30"
        }
    ]
};
const missingFieldsShipment = {
    _id: "6284679c459d1e93cfcbbd58",
    middleName: "teo",
    phoneNumber: 123124125,
    address: "asdasd",
    orders: [
        {
            "id": "6284422203b1bd63c018086b",
            "name": "Samsung 49-Inch Curved Gaming Monitor (LC49HG90DMNXZA)",
            "quantity": "30"
        }
    ]
};


describe("POST /shipment", () => {
    describe("Test create Shipment Fail", () => {
      test("Test response status code 403", async () => {
        const res = await request(app).post("/api/shipment").send(missingFieldsShipment);
        expect(res.statusCode).toBe(403);
      });

      test("Test empty field shipment to save in database", async () => {
        const res = await request(app).post("/api/shipment").send();
        expect(res.statusCode).toBe(403);
      });

      test("Test missing fields shipment to save in database", async () => {
        const res = await request(app).post("/api/shipment").send(missingFieldsShipment);
        const item = await Shipment.findOne({ _id: missingFieldsShipment._id });
        expect(item).toBeFalsy();
      });

      test("Test error message return from calling api", async () => {
        const res = await request(app).post("/api/shipment").send(missingFieldsShipment);
        expect(res.body.msgError.message).toBe("Shipment validation failed: lastName: Path `lastName` is required., firstName: Path `firstName` is required.");
      });

      test("Test header Json return", async () => {
        const res = await request(app).post("/api/shipment").send(missingFieldsShipment);
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
      });
    });

    describe("Test create Shipment Successfully", () => {
      test("Test response status code 200", async () => {
        const res = await request(app).post("/api/shipment").send(newShipment);
        expect(res.statusCode).toBe(200);
      });
      test("Test object data return after creat shipment", async () => {
        const res = await request(app).post("/api/shipment").send(newShipment);
        expect(res.body.shipmentData.firstName).toEqual(newShipment.firstName);
      });

      test("Test header Json return", async () => {
        const res = await request(app).post("/api/shipment").send(newShipment);
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
      });
    });
  });


describe('GET /shipments', () => {
  describe('Get all shipments', () => {
    test('Test response status code', async () => {
      const res = await request(app).get('/api/shipments').send();
      expect(res.statusCode).toBe(200);
    });

    test('Test object data return from calling api', async () => {
      const res = await request(app).get('/api/shipments').send();
      expect(res.body.shipmentData).toBeTruthy();
    });
  });
});


describe('GET /shipment/:id', () => {
  describe('Test get shipment by id in inventory', () => {
    test('Test response status code 200', async () => {
      const item = await Shipment.findOne({ _id: expectedShipment._id });
      const res = await request(app).get('/api/shipment/' + item._id).send();
      expect(res.statusCode).toBe(200);
    });
    test('Test object data return from calling api', async () => {
      const item = await Shipment.findOne({ _id: expectedShipment._id });
      const res = await request(app).get('/api/shipment/' + item._id).send();
      expect(res.body.shipmentData.firstName).toEqual(item.firstName);
      expect(res.body.shipmentData.lastName).toEqual(item.lastName);
      expect(res.body.shipmentData.phoneNumber).toEqual(item.phoneNumber);
      expect(res.body.shipmentData.address).toEqual(item.address);
    });
  });

  describe('Test when product id is invalid', () => {
    test('Test response status code 404', async () => {
      const res = await request(app).get('/api/product/asdf').send();
      expect(res.statusCode).toBe(404);
    });

    // test('Test object data return from calling api', async () => {
    //     const res = await request(app).get('/api/product/asdf').send();
    //     expect(res.statusCode).toBe(404);
    //   });
  });
});


  describe("DELETE /shipment:id", () => {
    describe("Test delete shipment successfully", () => {
      test("Test response status code 200", async () => {
        const shipment = await Shipment.findOne({ _id: expectedShipment._id  });
        const res = await request(app).delete("/api/shipment/" + shipment._id).send();
        expect(res.statusCode).toBe(200);
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(res.body.shipmentData._id).toEqual(expectedShipment._id);
      });

      test("Test object data return after delete shipment", async () => {
        const deleted_product = await Shipment.findOne({ _id: expectedShipment._id });
        expect(deleted_product).toBeFalsy();
      });
    });

    describe("Test delete shipment with invalid id fail", () => {
      test("Test res status code 404", async () => {
        const res = await request(app).delete("/api/shipment/asdf").send();
        expect(res.statusCode).toBe(404);
      });

      test("Test header Json return", async () => {
        const res = await request(app).delete("/api/shipment/asdf").send();
        expect(res.headers["content-type"]).toEqual("text/html; charset=utf-8");
      });
    });
  });
