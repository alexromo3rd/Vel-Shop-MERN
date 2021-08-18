import { Request, Response } from 'express';
import { ProductInterface } from '../interfaces/product.interface';
const Product = require('../models/product');

module.exports = {
  getProduct: async (req: Request, res: Response) => {
    const { id } = req.params;

    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(404).send('Product not found');
    }

    return res.status(200).send(foundProduct);
  },
  getAllProducts: async (req: Request, res: Response) => {
    const foundProducts = await Product.find({});
    if (foundProducts.length === 0) {
      return res.status(404).send('No products to display');
    }

    return res.status(200).send(foundProducts);
  },
  createProduct: async (req: Request, res: Response) => {
    const {
      name,
      category,
      description,
      countInStock,
      price,
    }: ProductInterface = req.body;

    const foundProduct = await Product.findOne({ name: name });

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
      .then((response: ProductInterface) => {
        return res.status(201).send(response);
      })
      .catch((err) => {
        return res.status(400).send('Unable to create product');
      });
  },
  updateProduct: async (req: Request, res: Response) => {},
  deleteProduct: async (req: Request, res: Response) => {
    const { id } = req.params;

    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(404).send('Product not found');
    }

    if (foundProduct._id.toString() === id) {
      await foundProduct.remove();
      return res.status(200).send('Successfully deleted product');
    } else {
      return res.status(400).send('ProductId does not match');
    }
  },
};
