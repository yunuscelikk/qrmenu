// src/app/backend/models/Product.ts

import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
});

export default models.Product || mongoose.model("Product", productSchema);
