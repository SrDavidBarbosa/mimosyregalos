'use client';

import React, { useState, useEffect } from 'react';
import { useWizard } from '@/hooks/useWizard';
import { CategoryCard } from '@/components/CategoryCard';
import type { Category } from '@/types/category';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default function AdminProductsPage() {
  const { step, next, back, isMobile } = useWizard();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Campos do produto
  const [name_es, setNameEs] = useState('');
  const [shortDescription_es, setShortDescriptionEs] = useState('');
  const [phrase_es, setPhraseEs] = useState('');
  const [items_es, setItemsEs] = useState('[]');
  const [price, setPrice] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [isMothersDaySpecial, setIsMothersDaySpecial] = useState(false);

  // Buscar categorias
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch(() => setStatus('Erro ao carregar categorias'));
  }, []);

  function toggleCategory(id: number) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
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

      const { uploadUrl, fileUrl } = await res.json();

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
      setLoading(true);
      setStatus('Salvando produto...');

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

      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro ao salvar produto');

      setStatus('Produto salvo com sucesso.');
    } catch (err) {
      console.error(err);
      setStatus('Erro ao salvar produto.');
    } finally {
      setLoading(false);
    }
  }

  // -------------------------
  // MOBILE
  // -------------------------
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-slate-50 to-slate-100 p-4">
        <h1 className="text-xl font-semibold mb-4">Novo Produto</h1>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Categorias</h2>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  selected={selectedCategories.includes(cat.id)}
                  onToggle={toggleCategory}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={selectedCategories.length === 0}
              className="w-full mt-6 bg-pink-600 text-white py-2 rounded-xl disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Informações básicas</h2>

            <input
              value={name_es}
              onChange={(e) => setNameEs(e.target.value)}
              placeholder="Nome (ES)"
              className="w-full border rounded-xl px-3 py-2"
            />

            <textarea
              value={shortDescription_es}
              onChange={(e) => setShortDescriptionEs(e.target.value)}
              placeholder="Descrição curta (ES)"
              className="w-full border rounded-xl px-3 py-2"
            />

            <textarea
              value={phrase_es}
              onChange={(e) => setPhraseEs(e.target.value)}
              placeholder="Frase (ES)"
              className="w-full border rounded-xl px-3 py-2"
            />

            <div className="flex justify-between mt-6">
              <button onClick={back} className="px-4 py-2 rounded-xl bg-slate-200">
                Voltar
              </button>
              <button onClick={next} className="px-4 py-2 rounded-xl bg-pink-600 text-white">
                Próximo
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Itens (ES)</h2>

            <textarea
              value={items_es}
              onChange={(e) => setItemsEs(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 font-mono text-xs"
            />

            <div className="flex justify-between mt-6">
              <button onClick={back} className="px-4 py-2 rounded-xl bg-slate-200">
                Voltar
              </button>
              <button onClick={next} className="px-4 py-2 rounded-xl bg-pink-600 text-white">
                Próximo
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Preço e Flags</h2>

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Preço (EUR)"
              type="number"
              step="0.01"
              className="w-full border rounded-xl px-3 py-2"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
              />
              Produto Premium
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isMothersDaySpecial}
                onChange={(e) => setIsMothersDaySpecial(e.target.checked)}
              />
              Especial Dia das Mães
            </label>

            <div className="flex justify-between mt-6">
              <button onClick={back} className="px-4 py-2 rounded-xl bg-slate-200">
                Voltar
              </button>
              <button onClick={next} className="px-4 py-2 rounded-xl bg-pink-600 text-white">
                Próximo
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Imagens</h2>

            <label className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer">
              <span className="text-sm text-pink-700">Enviar imagem</span>
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>

            <div className="grid grid-cols-2 gap-3">
              {images.map((url, idx) => (
                <div key={idx} className="relative">
                  <img src={url} className="w-full h-28 object-cover rounded-xl" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-white/80 text-xs px-2 py-1 rounded-full"
                  >
                    remover
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={back} className="px-4 py-2 rounded-xl bg-slate-200">
                Voltar
              </button>
              <button
                onClick={saveProduct}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-pink-600 text-white disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2">{status}</p>
          </div>
        )}
      </div>
    );
  }

  // -------------------------
  // DESKTOP
  // -------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-[1.5fr,1fr] gap-6">
        <section className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-pink-100 space-y-6">
          <h1 className="text-2xl font-semibold">Novo Produto</h1>

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

          <input
            value={name_es}
            onChange={(e) => setNameEs(e.target.value)}
            placeholder="Nome (ES)"
            className="w-full border rounded-xl px-3 py-2"
          />

          <textarea
            value={shortDescription_es}
            onChange={(e) => setShortDescriptionEs(e.target.value)}
            placeholder="Descrição curta (ES)"
            className="w-full border rounded-xl px-3 py-2"
          />

          <textarea
            value={phrase_es}
            onChange={(e) => setPhraseEs(e.target.value)}
            placeholder="Frase (ES)"
            className="w-full border rounded-xl px-3 py-2"
          />

          <textarea
            value={items_es}
            onChange={(e) => setItemsEs(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 font-mono text-xs"
            placeholder='["Chocolate", "Vinho", "Flores"]'
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço (EUR)"
            type="number"
            step="0.01"
            className="w-full border rounded-xl px-3 py-2"
          />

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
              Dia de La Madres
            </label>
          </div>

          <button
            onClick={saveProduct}
            disabled={loading}
            className="bg-pink-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar produto'}
          </button>

          <p className="text-xs text-slate-500">{status}</p>
        </section>

        <aside className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-pink-100 space-y-4">
          <h2 className="text-sm font-semibold">Imagens</h2>

          <label className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer">
            <span className="text-sm text-pink-700">Enviar imagem</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          <div className="grid grid-cols-2 gap-3">
            {images.map((url, idx) => (
              <div key={idx} className="relative">
                <img src={url} className="w-full h-28 object-cover rounded-xl" />
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