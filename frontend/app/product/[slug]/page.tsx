'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_BASE}/products?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setProduct(data[0]));
  }, [slug]);

  if (!product) return <div className="p-8">Cargando...</div>;

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Imágenes */}
        <div className="space-y-3">
          {product.images?.map((url: string, i: number) => (
            <img
              key={i}
              src={url}
              className="w-full rounded-2xl shadow"
            />
          ))}
        </div>

        {/* Contenido */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{product.name_es}</h1>

          <p className="text-slate-600">{product.shortDescription_es}</p>

          <p className="text-pink-700 italic">{product.phrase_es}</p>

          <h3 className="font-medium mt-4">Incluye:</h3>
          <ul className="list-disc pl-6 text-slate-600">
            {product.items_es.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className="text-2xl font-semibold mt-4">
            {(product.priceCents / 100).toFixed(2)} €
          </p>

          {/* Botón de añadir al carrito */}
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name_es,
                priceCents: product.priceCents,
                image: product.images?.[0],
              })
            }
            className="w-full bg-pink-600 text-white py-3 rounded-xl shadow hover:bg-pink-700"
          >
            Añadir al carrito
          </button>

          {/* Botón WhatsApp */}
          <a
            href={`https://wa.me/34XXXXXXXXX?text=Quiero%20el%20producto%20${product.name_es}`}
            className="block w-full text-center bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}