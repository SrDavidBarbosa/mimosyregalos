'use client';

import React, { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

type ImageState = string[];

export default function AdminProductsPage() {
  const [images, setImages] = useState<ImageState>([]);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setStatus('Gerando URL segura para upload...');
      const res = await fetch(`${API_BASE}/upload/signed-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType: file.type }),
      });

      if (!res.ok) throw new Error('Falha ao obter signed URL');

      const { uploadUrl, fileUrl } = await res.json();

      setStatus('Enviando imagem...');
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error('Falha no upload para R2');

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      setLoading(true);
      setStatus('Salvando produto...');

      const price = parseFloat((formData.get('price') as string) || '0');
      const priceCents = Math.round(price * 100);

      const payload = {
        slug: (formData.get('slug') as string).trim(),
        category: (formData.get('category') as string).trim(),
        tags: ((formData.get('tags') as string) || '').trim() || null,
        priceCents,

        name_es: (formData.get('name_es') as string).trim(),
        name_pt: (formData.get('name_pt') as string).trim(),
        name_en: (formData.get('name_en') as string).trim(),

        shortDescription_es: (formData.get('shortDescription_es') as string).trim(),
        shortDescription_pt: (formData.get('shortDescription_pt') as string).trim(),
        shortDescription_en: (formData.get('shortDescription_en') as string).trim(),

        phrase_es: (formData.get('phrase_es') as string).trim(),
        phrase_pt: (formData.get('phrase_pt') as string).trim(),
        phrase_en: (formData.get('phrase_en') as string).trim(),

        items_es: JSON.parse((formData.get('items_es') as string) || '[]'),
        items_pt: JSON.parse((formData.get('items_pt') as string) || '[]'),
        items_en: [],

        isPremium: formData.get('isPremium') === 'on',
        isMothersDaySpecial: formData.get('isMothersDaySpecial') === 'on',

        images,
      };

      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro ao salvar produto');

      setStatus('Produto salvo com sucesso.');
      form.reset();
      setImages([]);
    } catch (err) {
      console.error(err);
      setStatus('Erro ao salvar produto.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid gap-6 md:grid-cols-[1.5fr,1fr]">
        {/* Form */}
        <section className="rounded-3xl bg-white/90 backdrop-blur shadow-xl border border-pink-100 p-6 md:p-8">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Mimos y Regalos – Produtos
              </h1>
              <p className="text-xs text-slate-500">
                Cadastro de produtos com upload de imagens (Cloudflare R2).
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-[11px] text-pink-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Admin
            </span>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Slug</label>
                <input
                  name="slug"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="cesta-amor"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Categoria</label>
                <input
                  name="category"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="romantica"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Preço (EUR)</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="29.99"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tags</label>
                <input
                  name="tags"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="romântico, dia-das-mães"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nome (ES)</label>
                <input
                  name="name_es"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nome (PT)</label>
                <input
                  name="name_pt"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nome (EN)</label>
                <input
                  name="name_en"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Frase (ES)</label>
                <input
                  name="phrase_es"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Frase (PT)</label>
                <input
                  name="phrase_pt"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Frase (EN)</label>
                <input
                  name="phrase_en"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Descrição curta (ES)
                </label>
                <textarea
                  name="shortDescription_es"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Descrição curta (PT)
                </label>
                <textarea
                  name="shortDescription_pt"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Descrição curta (EN)
              </label>
              <textarea
                name="shortDescription_en"
                rows={2}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Itens (ES) – JSON
                </label>
                <textarea
                  name="items_es"
                  rows={2}
                  defaultValue="[]"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Itens (PT) – JSON
                </label>
                <textarea
                  name="items_pt"
                  rows={2}
                  defaultValue="[]"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                <input
                  name="isPremium"
                  type="checkbox"
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-400"
                />
                Produto premium
              </label>
              <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                <input
                  name="isMothersDaySpecial"
                  type="checkbox"
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-400"
                />
                Especial Dia das Mães
              </label>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">{status}</span>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-pink-200 hover:bg-pink-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Salvando...' : 'Salvar produto'}
              </button>
            </div>
          </form>
        </section>

        {/* Upload / Preview */}
        <aside className="rounded-3xl bg-white/90 backdrop-blur shadow-xl border border-pink-100 p-6 md:p-7 flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Imagens do produto</h2>
            <p className="text-xs text-slate-500">
              Compatível com PC, iPhone e Android. Use câmera ou galeria.
            </p>
          </div>

          <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-pink-200 px-4 py-6 text-center text-xs text-slate-600 cursor-pointer hover:border-pink-400 hover:bg-pink-50/60 transition">
            <span className="font-medium text-pink-700">
              Clique para selecionar ou tirar foto
            </span>
            <span className="text-[10px] text-slate-400">PNG, JPG, até ~10MB</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-auto">
            {images.map((url, idx) => (
              <div
                key={url}
                className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
              >
                <img src={url} className="w-full h-28 object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-red-600 shadow-sm opacity-0 group-hover:opacity-100 transition"
                >
                  remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-auto text-[11px] text-slate-400">
            As imagens são enviadas direto para o Cloudflare R2. O backend só recebe as URLs.
          </div>
        </aside>
      </div>
    </div>
  );
}