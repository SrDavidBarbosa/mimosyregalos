'use client';

import React, { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name_es, setNameEs] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  // Buscar categorias
  async function loadCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  // Criar ou editar categoria
  async function saveCategory() {
    try {
      setStatus('Salvando...');

      const payload = {
        name_es,
        slug,
        icon,
        sortOrder: Number(sortOrder),
      };

      const url = editingId
        ? `${API_BASE}/categories/${editingId}`
        : `${API_BASE}/categories`;

      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro ao salvar categoria');

      setStatus('Categoria salva com sucesso.');
      setNameEs('');
      setSlug('');
      setIcon('');
      setSortOrder(0);
      setEditingId(null);
      loadCategories();
    } catch (err) {
      console.error(err);
      setStatus('Erro ao salvar categoria.');
    }
  }

  // Excluir categoria
  async function deleteCategory(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    try {
      setStatus('Excluindo...');
      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Erro ao excluir categoria');

      setStatus('Categoria excluída.');
      loadCategories();
    } catch (err) {
      console.error(err);
      setStatus('Erro ao excluir categoria.');
    }
  }

  // Editar categoria
  function startEdit(cat: any) {
    setEditingId(cat.id);
    setNameEs(cat.name_es);
    setSlug(cat.slug);
    setIcon(cat.icon || '');
    setSortOrder(cat.sortOrder || 0);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">Categorias</h1>

        {/* Formulário */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-pink-100 space-y-4">
          <h2 className="text-lg font-medium">
            {editingId ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>

          <input
            value={name_es}
            onChange={(e) => setNameEs(e.target.value)}
            placeholder="Nome (ES)"
            className="w-full border rounded-xl px-3 py-2"
          />

          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug (ex: romantica)"
            className="w-full border rounded-xl px-3 py-2"
          />

          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Ícone (ex: 🎁)"
            className="w-full border rounded-xl px-3 py-2"
          />

          <input
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            type="number"
            placeholder="Ordem"
            className="w-full border rounded-xl px-3 py-2"
          />

          <button
            onClick={saveCategory}
            className="bg-pink-600 text-white px-4 py-2 rounded-xl"
          >
            {editingId ? 'Salvar alterações' : 'Criar categoria'}
          </button>

          <p className="text-xs text-slate-500">{status}</p>
        </div>

        {/* Lista */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-pink-100">
          <h2 className="text-lg font-medium mb-4">Lista de Categorias</h2>

          <div className="space-y-3">
            {categories.map((cat: any) => (
              <div
                key={cat.id}
                className="flex items-center justify-between border rounded-xl px-4 py-3 bg-white"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cat.icon || '🎁'}</span>
                  <div>
                    <p className="font-medium">{cat.name_es}</p>
                    <p className="text-xs text-slate-500">{cat.slug}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => startEdit(cat)}
                    className="text-sm text-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-sm text-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <p className="text-sm text-slate-500">Nenhuma categoria criada ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}