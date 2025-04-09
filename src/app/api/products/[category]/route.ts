import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/backend/db";
import Product from "@/app/backend/models/Product";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const category = pathParts[pathParts.length - 1];

    const products = await Product.find({ category });

    return NextResponse.json(products);
  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json(
      { message: "Ürünler alınamadı", error },
      { status: 500 }
    );
  }
}
