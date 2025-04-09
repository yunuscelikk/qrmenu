import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Message from "@/app/backend/models/message"; // Message modelini dahil ettik

export async function POST(request: Request) {
  try {
    const MONGODB_URI = process.env.MONGODB_URI as string;
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Mesaj boş olamaz." },
        { status: 400 }
      );
    }

    // MongoDB'ye bağlantı kuruyoruz
    await mongoose.connect(MONGODB_URI);

    // Yeni mesajı veritabanına kaydediyoruz
    const newMessage = new Message({
      message,
    });

    await newMessage.save();
    console.log("Yeni mesaj:", message);

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla gönderildi.",
    });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json(
      { success: false, error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
