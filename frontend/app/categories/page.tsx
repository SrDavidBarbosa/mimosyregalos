'use client';

import React, { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Categorías</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat: any) => (
          <a
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="bg-white rounded-2xl shadow border border-pink-100 p-6 flex items-center gap-4 hover:shadow-lg transition"
          >
            <span className="text-3xl">{cat.icon || '🎁'}</span>
            <span className="text-lg font-medium">{cat.name_es}</span>
          </a>
        ))}
      </div>
    </div>
  );
}