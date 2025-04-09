"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CafeHeader from "../../public/components/CafeHeader";
import "./home.css";

export default function Home() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  return (
    <div className="home-container">
      {/* Header */}
      <CafeHeader />
      {/* Menü Butonları */}
      <div className="buttons ">
        <button
          className={`menu-button ${isMenuActive ? "active" : ""} shadow-md`}
          onClick={() => {
            setIsMenuActive(true);
            setIsContactActive(false);
          }}
        >
          Menü
        </button>
        <button
          className={`contact-button ${
            isContactActive ? "active" : ""
          } shadow-md`}
          onClick={() => {
            setIsContactActive(!isContactActive);
            setIsMenuActive(false);
          }}
        >
          Bize Ulaşın
        </button>
      </div>
      <hr className="w-full border border-gray-200 my-2 mb-0 " />
      {/* Kategoriler veya Mesaj Formu */}
      {isContactActive ? (
        <div className="message-form flex flex-col items-start gap-2 p-4">
          <h2 className="text-lg font-light text-left ">Mesajınız</h2>
          <textarea
            className="w-70 max-w-lg h-32 p-2 border border-gray-300 rounded"
            placeholder="Mesajınızı buraya yazın..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            className="send-button bg-grey-500 text-black px-4 py-2 rounded shadow-md cursor-pointer"
            onClick={async () => {
              if (!message.trim()) {
                setResponseMessage("Lütfen bir mesaj yazın.");
                return;
              }

              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ message }),
                });

                const data = await res.json();
                if (data.success) {
                  setResponseMessage("Mesajınız başarıyla gönderildi!");
                  setMessage(""); // Formu temizle
                } else {
                  setResponseMessage("Mesaj gönderilemedi: " + data.error);
                }
              } catch (err) {
                setResponseMessage("Bir hata oluştu.");
                console.error(err);
              }
            }}
          >
            Gönder
          </button>
          {responseMessage && (
            <p className="text-sm text-gray-600 mt-2">{responseMessage}</p>
          )}
        </div>
      ) : (
        <section className="categories grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-base">
          {[
            {
              name: "Tatlılar",
              image: "/images/tatlilar.jpg",
              path: "/categories/tatlilar",
            },
            {
              name: "Atıştırmalıklar",
              image: "/images/atistirmaliklar.jpg",
              path: "/categories/atistirmaliklar",
            },
            {
              name: "Moctails",
              image: "/images/moctails.jpg",
              path: "/categories/moctails",
            },
            {
              name: "Espresso Bazlı",
              image: "/images/espresso.jpg",
              path: "/categories/Espresso",
            },
            {
              name: "Sıcak İçecekler",
              image: "/images/sicak.jpg",
              path: "/categories/sicakicecekler",
            },
            {
              name: "Buzlu Kahveler",
              image: "/images/buzlu.jpg",
              path: "/categories/buzlukahveler",
            },
            {
              name: "Soğuk İçecekler",
              image: "/images/soguk.jpg",
              path: "/categories/sogukicecekler",
            },
            {
              name: "Ekstralar",
              image: "/images/cafe-logo.png",
              path: "/categories/ekstralar",
            },
          ].map((category) => (
            <Link
              href={category.path}
              key={category.name}
              className="category-card shadow-md w-full max-w-xs flex flex-col items-center"
            >
              <div className="category-image-container relative w-full h-40 mb-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={175}
                  height={175}
                  objectFit="cover"
                  className="rounded-t-lg "
                />
              </div>
              <p>{category.name}</p>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
