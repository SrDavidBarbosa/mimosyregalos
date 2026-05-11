'use client';

import React, { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default function CatalogoPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Catálogo</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <a
            key={p.id}
            href={`/produto/${p.slug}`}
            className="bg-white rounded-2xl shadow border border-pink-100 overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-48 bg-slate-100">
              {p.images?.length > 0 ? (
                <img
                  src={p.images[0]}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Sem imagem
                </div>
              )}
            </div>

            <div className="p-4">
              <h2 className="font-medium text-lg">{p.name_es}</h2>
              <p className="text-sm text-slate-500 mt-1">
                {(p.priceCents / 100).toFixed(2)} €
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}