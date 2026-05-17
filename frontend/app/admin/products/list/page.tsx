'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Category } from '@/types/category';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

interface ProductCategoryWithCategory {
  category: Category;
}

interface ProductListItem {
  id: number;
  name_es: string;
  priceCents: number;
  images: string[];
  isPremium: boolean;
  isMothersDaySpecial: boolean;
  categories: ProductCategoryWithCategory[];
}

export default function ProductsListPage() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [status, setStatus] = useState('');

  async function loadProducts() {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data: ProductListItem[] = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setStatus('Erro ao carregar produtos.');
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  async function deleteProduct(id: number) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      setStatus('Excluindo...');
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Erro ao excluir produto');

      setStatus('Produto excluído.');
      void loadProducts();
    } catch (err) {
      console.error(err);
      setStatus('Erro ao excluir produto.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Produtos</h1>
          <Link
            href="/admin/products"
            className="bg-pink-600 text-white px-4 py-2 rounded-xl"
          >
            Novo Produto
          </Link>
        </div>

        <p className="text-xs text-slate-500">{status}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-pink-100 overflow-hidden"
            >
              {/* Imagem */}
              <div className="h-48 bg-slate-100">
                {product.images?.length > 0 ? (
                  <img
                    src={product.images[0]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-4 space-y-3">
                <h2 className="font-semibold text-lg">{product.name_es}</h2>

                {/* Categorias */}
                <div className="flex flex-wrap gap-2">
                  {product.categories?.map((pc) => (
                    <span
                      key={pc.category.id}
                      className="px-2 py-1 text-xs rounded-full bg-pink-50 text-pink-700 border border-pink-200"
                    >
                      {pc.category.icon || '🎁'} {pc.category.name_es}
                    </span>
                  ))}
                </div>

                {/* Preço */}
                <p className="text-sm font-medium text-slate-700">
                  {(product.priceCents / 100).toFixed(2)} €
                </p>

                {/* Flags */}
                <div className="flex gap-2">
                  {product.isPremium && (
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                      Premium
                    </span>
                  )}
                  {product.isMothersDaySpecial && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                      Dia das Mães
                    </span>
                  )}
                </div>

                {/* Ações */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="text-sm text-blue-600"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-sm text-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-sm text-slate-500">
              Nenhum produto cadastrado ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}