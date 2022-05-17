const productController = require('../product.controller');
const Product = require('../../models/product.model');
const request = require('supertest');
const app = require('../../index');
const mongoose = require('mongoose');
require('dotenv').config();

const expectedItem = {
//   _id: '628409a7cbd48e98dff152ce',
//   name: 'Fjallraven - Foldsack No. 1 Backpack',
//   category: 'Clothing',
//   price: 109.95,
//   description:
//     'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//   quantity: 100,
//   selectedFile: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    _id: '62840a38cbd48e98dff15713',
    name: "Samsung 49-Inch Curved Gaming Monitor (LC49HG90DMNXZA)",
    category: "Electronics",
    price: 999.99,
    description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    quantity: 100,
    selectedFile: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
};
const sampleProductChanged = {
    _id: '62840a38cbd48e98dff15713',
    name: "Samsung 49-Inch Curved Gaming Monitor (LC49HG90DMNXZA)",
    category: "Electronics",
    price: 999.99,
    description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    quantity: 400,
    selectedFile: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
};
const newItem = {
    name: "Samsung 49-Inch Curved Gaming Monitor (LC49HG90DMNXZA)",
    category: "Electronics",
    price: 999.99,
    description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    quantity: 100,
    selectedFile: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
};
const missingFieldsItem = {
  _id: '62840a38cbd48e98dff1534a',
  name: 'Fjallraven - Foldsack No. 1 Backpack',
  category: 'Clothing',
  price: 109.95,
  selectedFile: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
};


beforeAll(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongo database is connected!!! `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
});

describe("POST /product", () => {
    describe("Test create Product Fail", () => {
      test("Test response status code 403", async () => {
        const res = await request(app).post("/api/product").send(missingFieldsItem);
        expect(res.statusCode).toBe(403);
      });

      test("Test empty field product to save in database", async () => {
        const res = await request(app).post("/api/product").send();
        expect(res.statusCode).toBe(403);
      });

      test("Test missing fields product to save in database", async () => {
        const res = await request(app).post("/api/product").send(missingFieldsItem);
        const item = await Product.findOne({ _id: missingFieldsItem._id });
        expect(item).toBeFalsy();
      });

      test("Test error message return from calling api", async () => {
        const res = await request(app).post("/api/product").send(missingFieldsItem);
        expect(res.body.msgError.message).toBe("Product validation failed: quantity: Path `quantity` is required., description: Path `description` is required.");
      });

      test("Test header Json return", async () => {
        const res = await request(app).post("/api/product").send(missingFieldsItem);
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
      });
    });

    describe("Test create Product Successfully", () => {
      test("Test response status code 200", async () => {
        const res = await request(app).post("/api/product").send(expectedItem);
        expect(res.statusCode).toBe(200);
      });
      test("Test object data return after creat product", async () => {
        const res = await request(app).post("/api/product").send(newItem);
        expect(res.body.productData.name).toEqual(newItem.name);
        expect(res.body.productData.category).toEqual(newItem.category);
        expect(res.body.productData.price).toEqual(newItem.price);
        expect(res.body.productData.description).toEqual(newItem.description);
        expect(res.body.productData.quantity).toEqual(newItem.quantity);
      });

      test("Test header Json return", async () => {
        const res = await request(app).post("/api/product").send(newItem);
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
      });
    });
  });


describe('GET /products', () => {
  describe('Get all products in inventory', () => {
    test('Test response status code', async () => {
      const res = await request(app).get('/api/products').send();
      expect(res.statusCode).toBe(200);
    });

    test('Test object data return from calling api', async () => {
      const res = await request(app).get('/api/products').send();

      expect(res.body.productData).toBeTruthy();
    });
  });
});


describe("GET /products/search", () => {
    describe("Get search product by category in inventory", () => {
        test("Test response status code", async () => {
            const query = "Electronics";
            const res = await request(app).get(`/api/products/search?searchQuery=${query}`).send();
            expect(res.statusCode).toBe(200);
        });

      test("Test object data return from calling api", async () => {
        const query = "Electronics";
        const res = await request(app).get(`/api/products/search?searchQuery=${query}`).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.productSearchData).toBeTruthy();
      });
    });
  });

describe('GET /product/:id', () => {
  describe('Test get product by id in inventory', () => {
    test('Test response status code 200', async () => {
      const item = await Product.findOne({ _id: expectedItem._id });
      const res = await request(app).get('/api/product/' + item._id).send();
      expect(res.statusCode).toBe(200);
    });
    test('Test object data return from calling api', async () => {
      const item = await Product.findOne({ _id: expectedItem._id });
      const res = await request(app).get('/api/product/' + item._id).send();
      expect(res.body.productData.name).toEqual(item.name);
      expect(res.body.productData.category).toEqual(item.category);
      expect(res.body.productData.price).toEqual(item.price);
      expect(res.body.productData.description).toEqual(item.description);
      expect(res.body.productData.quantity).toEqual(item.quantity);
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



  describe("PUT /product:id", () => {
    describe("Test update product with valid id successfully", () => {
      test("Test response status code 200", async () => {
        const item = await Product.findOne({ _id: expectedItem._id });
        const res = await request(app).put("/api/product/" + item._id).send(sampleProductChanged);
        expect(res.statusCode).toBe(200);
      });

      test("Test object data return after creat product", async () => {
        const item = await Product.findOne({ _id: expectedItem._id });
        const res = await request(app)
          .put("/api/product/" + item._id)
          .send(sampleProductChanged);

        expect(res.body.productData.quantity).toBe(sampleProductChanged.quantity);
      });

      test("Test header Json return", async () => {
        const item = await Product.findOne({ _id: expectedItem._id });
        const res = await request(app)
          .put("/api/product/" + item._id)
          .send(sampleProductChanged);
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
      });
    });

    describe("Test update product with invalid id fail", () => {
      test("Test response status code 404", async () => {
        const res = await request(app).put("/api/product/asdf").send(sampleProductChanged);
        expect(res.statusCode).toBe(404);
      });

    //   test("Test error message return from calling api", async () => {
    //     const response = await request(app).put("/api/product/asdf").send();
    //     expect(response.body.message).toBe("Product not found!");
    //   });

      test("Test header Json return", async () => {
        const res = await request(app).put("/api/product/asdf").send();
        expect(res.headers["content-type"]).toEqual("text/html; charset=utf-8");
      });
    });
  });

  describe("DELETE /product:id", () => {
    describe("Test delete product successfully", () => {
      test("Test response status code 200", async () => {
        const product = await Product.findOne({ _id: expectedItem._id  });
        const res = await request(app).delete("/api/product/" + product._id).send();
        expect(res.statusCode).toBe(200);
        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(res.body.productData._id).toEqual(expectedItem._id);
      });

      test("Test object data return after delete product", async () => {
        const deleted_product = await Product.findOne({ _id: expectedItem._id });
        expect(deleted_product).toBeFalsy();
      });
    });

    describe("Test delete product with invalid id fail", () => {
      test("Test res status code 404", async () => {
        const res = await request(app).delete("/api/product/asdf").send();
        expect(res.statusCode).toBe(404);
      });

    //   test("Test return invalid message", async () => {
    //     const res = await request(app).delete("/api/product/626faa77e898b740c402eb23").send();
    //     expect(res.body.error).toBe("Product not found");
    //   });

      test("Test header Json return", async () => {
        const res = await request(app).delete("/api/product/asdf").send();
        expect(res.headers["content-type"]).toEqual("text/html; charset=utf-8");
      });
    });
  });




afterAll((done) => {
  mongoose.connection.close();
  done();
});
