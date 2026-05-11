'use client';

import React, { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const cats = await fetch(`${API_BASE}/categories`).then((r) => r.json());
      const cat = cats.find((c: any) => c.slug === slug);
      setCategory(cat);

      const prods = await fetch(`${API_BASE}/products`).then((r) => r.json());
      const filtered = prods.filter((p: any) =>
        p.categories.some((pc: any) => pc.category.slug === slug)
      );

      setProducts(filtered);
    }

    load();
  }, [slug]);

  if (!category) return <div className="p-8">Cargando...</div>;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <span className="text-3xl">{category.icon}</span>
        {category.name_es}
      </h1>

      {products.length === 0 && (
        <p className="text-slate-500">No hay productos en esta categoría.</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <a
            key={p.id}
            href={`/product/${p.slug}`}
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
                  Sin imagen
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