import "dotenv/config"; // .env dosyasındaki değişkenleri yükler
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import QRCode from "qrcode";
import path from "path";
import Product from "./backend/models/Product.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5002;
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB bağlantı URI'sini al

// MongoDB'ye bağlanma
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// uploads klasörüne erişim sağlama
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// QR kodu oluşturma route'u
app.post("/api/generate-qr", (req, res) => {
  const url = "https://qr-menu-orpin.vercel.app";
  const qrPath = path.join(__dirname, "uploads", "qr-menu.png");

  QRCode.toFile(
    qrPath,
    url,
    {
      color: { dark: "#000000", light: "#FFFFFF" },
    },
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "QR kodu oluşturulamadı", error: err });
      }
      res.status(200).json({
        message: "QR kodu başarıyla oluşturuldu",
        imagePath: `/uploads/qr-menu.png`,
      });
    }
  );
});

// API Route: Kategoriye göre ürünleri çekme
app.get("/api/products/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }); // Kategoriye göre ürünleri çek
    res.json(products); // Ürünleri döndür
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ürünler alınırken hata oluştu", error: err });
  }
});

// Server'ı başlatma
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor!`);
});
