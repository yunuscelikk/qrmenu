import mongoose from "mongoose";
import Product from "../src/app/backend/models/Product";
import Category from "../src/app/backend/models/Category";

// MongoDB bağlantısı
mongoose.connect(
  "mongodb+srv://yunusceliik0:cEl1k2834@qrmenu.kp3fhez.mongodb.net/qrmenu",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function updateProductCategories() {
  try {
    console.log("Ürün kategorilerini güncelliyor...");

    // Tüm ürünleri al
    const products = await Product.find();

    for (let product of products) {
      const category = await Category.findById(product.category);

      if (category) {
        product.category = category.name; // 🟢 ID yerine kategori adını kaydet
        await product.save();
        console.log(`Güncellendi: ${product.name} -> ${category.name}`);
      }
    }

    console.log("✅ Tüm ürünler güncellendi!");
    mongoose.connection.close();
  } catch (error) {
    console.error("🚨 Hata oluştu:", error);
    mongoose.connection.close();
  }
}

updateProductCategories();
