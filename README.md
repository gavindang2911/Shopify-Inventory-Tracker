# Shopify Backend Internship Application Challenge - Fall 2022

## 1/ Demo:
Link to web app: :link: https://shopify-inventory-tracker.gavindang2911.repl.co/

Link to Replit: :link: https://replit.com/@gavindang2911/Shopify-Inventory-Tracker?v=1


## 2/ Features:
- Basic CRUD (Create, Read, Update, Delete) functionality for inventory products
- Ability to create shipments and assign inventory products to the shipment, and adjust inventory appropriately
- Ability to edit/view/delete shipment information 
- Manage products by category, able to search product by category :muscle: :muscle:
- Upload image to a specific product :eyes::eyes:
- Unit test by Jest :point_down::point_down:

## 3/ Testing:

### Unit tests (Jest) :heavy_check_mark::heavy_check_mark:
![image](https://user-images.githubusercontent.com/57620352/168955658-f9e4990b-0e6f-430c-9aca-3ac5197f53c9.png)

## 4/ Built With

* Node.js
* Express.js
* MongoDB, Mongoose
* React 
* Bootstrap, Material UI
* React Router


<!-- GETTING STARTED -->
## 5/ Getting Started
### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:gavindang2911/Shopify-Inventory-Tracker.git
   ```
2. Install NPM packages
   ```sh
   npm install
   cd client/ , npm install
   ```
3. Enter your env variables
   ```
   MONGO_URL
   PORT
   ...
   ```
4. Run backend
   ```sh
   npm run start
   ```
5. Run front end
   ```sh
   cd client/
   npm start
   ```
6. Run test
  ```sh
    npm run test:unit, or
    npm run test:coverage
  ```
  
## API Documentation

| Method |            Api Endpoints                  |                                                                           |
| :----: | :-----------------------------------------| :-----------------------------------------------------------------------: |
|  GET   |             /api/products                 |                    Retrieves all items/products in inventory              |
|  GET   |           /api/product/:id                |                Retrieves the product with the provided id                 |
|  PUT   |            /api/product/:id               |                 Updates the product with the provided id                  |
|  GET   | /api/product/search?searchQuery=category  |                Retrieves the product with the provided id                 |
|  POST  |            /api/product                   |                    Creates a product and save into database               |
| DELETE |           /api/product/:id                |                      Deletes the product from the database                |
|  GET   |            /api/shipments                 |                    Retrieves shipment information                         |
|  GET   |           /api/shipment/:id               |               Retrieves the shipment with the provided id                 |
|  POST  |            /api/shipment                  |                Create shipment information and save into database         |
| DELETE |          /api/shipment/:id                |                  Delete shipment information from database                |
