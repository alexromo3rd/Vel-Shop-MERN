"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    countInStock: { type: Number, required: true },
    price: { type: Number, required: true },
});
const Product = mongoose_1.model('Product', ProductSchema);
module.exports = Product;
//# sourceMappingURL=product.js.map