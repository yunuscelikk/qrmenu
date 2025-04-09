import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "../../../backend/models/Product";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

export async function GET(req, { params }) {
  const { category } = params;

  try {
    await connectDb();

    const products = await Product.find({ category });

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No products found in this category" },
        { status: 404 }
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
