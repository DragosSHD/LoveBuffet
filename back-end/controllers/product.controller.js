const db = require("../models");
const Product = db.productdb;

exports.create = (req, res) => {
// Validate request
if (!req.body.description) {
res.status(400).send({ message: "Content can not be empty!" });
return;
}

const product = new Product({
description: req.body.description,
value: req.body.value
});
// Save Product in the database
product
.save(product)
.then(data => {
res.send(data);
})
.catch(err => {
res.status(500).send({
message:
err.message || "Some error occurred while creating the Product."
});
});
};

// Retrieve all Product data from the database.
exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { $regex: new RegExp(description), $options:
    "i" } } : {};
    Product.find(condition)
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
    message:
    err.message || "Some error occurred while retrieving Product data."
    });
    });
};

// Find a single Product data with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
    .then(data => {
    if (!data)
    res.status(404).send({ message: "Not found Product data with id " + id }
    );
    else res.send(data);
    })
    .catch(err => {
    res
    .status(500)
    .send({ message: "Error retrieving Product data with id=" + id });
    });
};

// Update a Product data by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
    return res.status(400).send({
    message: "Data to update can not be empty!"
    });
    }
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
    if (!data) {
    res.status(404).send({
    message: `Cannot update Product db with id=${id}. Maybe Product db was not found!`
    });
    } else res.send({ message: "Product db was updated successfully." });
    })
    .catch(err => {
    res.status(500).send({
    message: "Error updating Product db with id=" + id
    });
    });
};

// Delete a Product db with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
    res.status(404).send({
    message: `Cannot delete Product data with id=${id}. Maybe Product data was not found!`
    });
    } else {
    res.send({
    message: "Product data was deleted successfully!"
    });
    }
    })
    .catch(err => {
    res.status(500).send({
    message: "Could not delete Product with id=" + id
    });
    });
};

// Delete all Product data from the database.
exports.deleteAll = (req, res) => {
    Product.deleteMany({})
    .then(data => {
    res.send({
    message: `${data.deletedCount} Product were deleted successfully!`
    });
    })
    .catch(err => {
    res.status(500).send({
    message:
    err.message || "Some error occurred while removing all Product."
    });
    });
};

// Find all published Product
exports.findAllRecovered = (req, res) => {
    Product.find({ recovered: true })
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
    message:
    err.message || "Some error occurred while retrieving Product."
    });
    });
};

