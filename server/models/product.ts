import { Schema, model } from 'mongoose';
import { ProductInterface } from '../interfaces/product.interface';

const ProductSchema = new Schema<ProductInterface>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  countInStock: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Product = model<ProductInterface>('Product', ProductSchema);

module.exports = Product;
