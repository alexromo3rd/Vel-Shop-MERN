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
  getProductsByCategory: async (req: Request, res: Response) => {
    const { category } = req.query;

    const foundProducts = await Product.find({ category: category });
    if (foundProducts.length === 0) {
      return res.status(404).send(`No ${category} to display`);
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
  updateProduct: async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      name,
      category,
      description,
      countInStock,
      price,
    }: {
      name: string | null;
      category: string | null;
      description: string | null;
      countInStock: number | null;
      price: number | null;
    } = req.body;

    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(400).send('Product does not exist');
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: foundProduct._id },
      {
        name: name || foundProduct.name,
        category: category || foundProduct.category,
        description: description || foundProduct.description,
        countInStock: countInStock || foundProduct.countInStock,
        price: price || foundProduct.price,
      },
      { new: true }
    );

    await updatedProduct
      .save()
      .then((response: ProductInterface) => {
        return res.status(202).send(response);
      })
      .catch((err) => {
        return res.status(400).send('Unable to update product');
      });
  },
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
