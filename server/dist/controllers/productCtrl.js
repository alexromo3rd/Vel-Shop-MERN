"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product = require('../models/product');
module.exports = {
    getProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const foundProduct = yield Product.findById(id);
        if (!foundProduct) {
            return res.status(404).send('Product not found');
        }
        return res.status(200).send(foundProduct);
    }),
    getAllProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foundProducts = yield Product.find({});
        if (foundProducts.length === 0) {
            return res.status(404).send('No products to display');
        }
        return res.status(200).send(foundProducts);
    }),
    createProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, category, description, countInStock, price, } = req.body;
        const foundProduct = yield Product.findOne({ name: name });
        if (foundProduct) {
            return res.status(400).send('Product already exists');
        }
        const newProduct = new Product({
            name,
            category,
            description,
            countInStock,
            price,
        });
        newProduct
            .save()
            .then((response) => {
            return res.status(201).send(response);
        })
            .catch((err) => {
            return res.status(400).send('Unable to create product');
        });
    }),
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name = null, category = null, description = null, countInStock = null, price = null, } = req.body;
        const foundProduct = yield Product.findOne({ name: name });
        if (foundProduct) {
            return res.status(400).send('Product already exists');
        }
        const newProduct = new Product({
            name,
            category,
            description,
            countInStock,
            price,
        });
        newProduct
            .save()
            .then((response) => {
            return res.status(201).send(response);
        })
            .catch((err) => {
            return res.status(400).send('Unable to create product');
        });
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const foundProduct = yield Product.findById(id);
        if (!foundProduct) {
            return res.status(404).send('Product not found');
        }
        if (foundProduct._id.toString() === id) {
            yield foundProduct.remove();
            return res.status(200).send('Successfully deleted product');
        }
        else {
            return res.status(400).send('ProductId does not match');
        }
    }),
};
//# sourceMappingURL=productCtrl.js.map