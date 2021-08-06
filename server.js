const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const routes = require("./app/routes/customer.routes.js");
const mysqlconnection = require("./app/models/db.js");
const path = require("path");
const Customer = require("./app/models/customer.model.js");
//const routes = require("./app/controllers/customer.controller.js");



// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));  
})

app.post('/customers', async (req, res) => {
   const data = Customer.create(req.body);
   res.send(
       data
   );
});

app.get('/customers', async (req, res) =>  {
   Customer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
    console.log(data)
})

app.get("/customers/:customerId", async (req, res) =>  {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
})

app.put("/customers/:customerId", async (req, res) =>  {
  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
})



app.delete("/customers/:customerId", async (req, res) =>  {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
})

app.delete('/customers', async (req, res) =>  {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
})





// set port, listen for requests
const port = 8081
app.listen(8081, () => {
  console.log(`Server is running on port: ${port}.`);
});