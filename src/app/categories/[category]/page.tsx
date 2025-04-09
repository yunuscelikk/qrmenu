"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CafeHeader from "../../../../public/components/CafeHeader";
import "/src/app/home.css"; // Eğer `home.css` dosyası bir üst klasördeyse
import { Product } from "@/app/types/Product"; // Product tipini import ettik

export default function CategoryPage() {
  const { category } = useParams(); // Dinamik kategori adı
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category) {
      fetch(`https://qr-menu-orpin.vercel.app/api/products/${category}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Gelen ürünler:", data);
          setProducts(data as Product[]);
        })
        .catch((err) => console.error("Ürünleri çekerken hata oluştu:", err));
    }
  }, [category]);

  return (
    <div className="home-container">
      <div className="category-container">
        <CafeHeader />
        <h1 className="text-xl capitalize text-center my-4">{category}</h1>
        <hr className="w-full border border-gray-200 my-2 mb-0 " />
        <div className="text-center my-4">
          <Link href="/">
            <button className="text-black px-6 py-2">Ana Menüye Dön</button>
            <hr className="w-full border border-gray-200 my-2 mb-0 " />
          </Link>
        </div>
        <section className="categories grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-base ">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="category-card product-card shadow-md p-2 "
              >
                <Image
                  src={`/uploads/${product.imageUrl}`}
                  alt={product.name}
                  width={175}
                  height={175}
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                <h2 className="text-lg ">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-lg text-gray-800">{product.price}₺</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              Bu kategoride henüz ürün yok.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
