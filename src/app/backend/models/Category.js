import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Kategori adı
  createdAt: { type: Date, default: Date.now }, // Oluşturulma tarihi
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
