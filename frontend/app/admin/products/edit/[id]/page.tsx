'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CategoryCard } from '@/components/CategoryCard';
import type { Category } from '@/types/category';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

interface ProductCategoryLink {
  categoryId: number;
}

interface Product {
  id: number;
  name_es: string;
  shortDescription_es: string;
  phrase_es: string;
  items_es: string[];
  priceCents: number;
  isPremium: boolean;
  isMothersDaySpecial: boolean;
  images: string[];
  categories: ProductCategoryLink[];
}

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>([]);

  // Campos do produto
  const [name_es, setNameEs] = useState('');
  const [shortDescription_es, setShortDescriptionEs] = useState('');
  const [phrase_es, setPhraseEs] = useState('');
  const [items_es, setItemsEs] = useState('[]');
  const [price, setPrice] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [isMothersDaySpecial, setIsMothersDaySpecial] = useState(false);

  async function loadCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    const data: Category[] = await res.json();
    setCategories(data);
  }

  async function loadProduct() {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      const product: Product = await res.json();

      setNameEs(product.name_es);
      setShortDescriptionEs(product.shortDescription_es);
      setPhraseEs(product.phrase_es);
      setItemsEs(JSON.stringify(product.items_es, null, 2));
      setPrice((product.priceCents / 100).toFixed(2));
      setIsPremium(product.isPremium);
      setIsMothersDaySpecial(product.isMothersDaySpecial);
      setImages(product.images || []);
      setSelectedCategories(product.categories.map((pc) => pc.categoryId));
    } catch (err) {
      console.error(err);
      setStatus('Erro ao carregar produto.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCategories();
    void loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleCategory(categoryId: number) {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((x) => x !== categoryId)
        : [...prev, categoryId],
    );
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setStatus('Gerando URL segura...');
      const res = await fetch(`${API_BASE}/upload/signed-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType: file.type }),
      });

      const { uploadUrl, fileUrl } = (await res.json()) as {
        uploadUrl: string;
        fileUrl: string;
      };

      setStatus('Enviando imagem...');
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      setImages((prev) => [...prev, fileUrl]);
      setStatus('Imagem enviada com sucesso.');
    } catch (err) {
      console.error(err);
      setStatus('Erro ao enviar imagem.');
    } finally {
      e.target.value = '';
    }
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  async function saveProduct() {
    try {
      setSaving(true);
      setStatus('Salvando...');

      const priceCents = Math.round(parseFloat(price || '0') * 100);

      const payload = {
        categoryIds: selectedCategories,
        priceCents,
        name_es,
        shortDescription_es,
        phrase_es,
        items_es: JSON.parse(items_es || '[]'),
        isPremium,
        isMothersDaySpecial,
        images,
      };

      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro ao salvar produto');

      setStatus('Produto atualizado com sucesso.');
    } catch (err) {
      console.error(err);
      setStatus('Erro ao salvar produto.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Carregando produto...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-[1.5fr,1fr] gap-6">
        {/* Form */}
        <section className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-pink-100 space-y-6">
          <h1 className="text-2xl font-semibold">Editar Produto</h1>

          {/* Categorias */}
          <div>
            <h2 className="text-sm font-semibold mb-2">Categorias</h2>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  selected={selectedCategories.includes(cat.id)}
                  onToggle={toggleCategory}
                />
              ))}
            </div>
          </div>

          {/* Nome */}
          <input
            value={name_es}
            onChange={(e) => setNameEs(e.target.value)}
            placeholder="Nome (ES)"
            className="w-full border rounded-xl px-3 py-2"
          />

          {/* Descrição */}
          <textarea
            value={shortDescription_es}
            onChange={(e) => setShortDescriptionEs(e.target.value)}
            placeholder="Descrição curta (ES)"
            className="w-full border rounded-xl px-3 py-2"
          />

          {/* Frase */}
          <textarea
            value={phrase_es}
            onChange={(e) => setPhraseEs(e.target.value)}
            placeholder="Frase (ES)"
            className="w-full border rounded-xl px-3 py-2"
          />

          {/* Itens */}
          <textarea
            value={items_es}
            onChange={(e) => setItemsEs(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 font-mono text-xs"
            placeholder='["Chocolate", "Vinho", "Flores"]'
          />

          {/* Preço */}
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço (EUR)"
            type="number"
            step="0.01"
            className="w-full border rounded-xl px-3 py-2"
          />

          {/* Flags */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
              />
              Premium
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isMothersDaySpecial}
                onChange={(e) => setIsMothersDaySpecial(e.target.checked)}
              />
              Dia das Mães
            </label>
          </div>

          <button
            onClick={saveProduct}
            disabled={saving}
            className="bg-pink-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>

          <p className="text-xs text-slate-500">{status}</p>
        </section>

        {/* Upload */}
        <aside className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-pink-100 space-y-4">
          <h2 className="text-sm font-semibold">Imagens</h2>

          <label className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer">
            <span className="text-sm text-pink-700">Enviar imagem</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          <div className="grid grid-cols-2 gap-3">
            {images.map((url, idx) => (
              <div key={idx} className="relative">
                <img
                  src={url}
                  className="w-full h-28 object-cover rounded-xl"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-white/80 text-xs px-2 py-1 rounded-full"
                >
                  remover
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}