const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        image: {type: String, required: true },
        categories: {type: Array},
        size: {type: String},
        color: {type: String},
        price: {type: String, required: true},

        },
    {timestamps: true}
);
module.exports = mongoose.model("Product", productSchema);