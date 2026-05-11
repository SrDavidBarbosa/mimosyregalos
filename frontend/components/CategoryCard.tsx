import React from 'react';

interface Category {
  id: number;
  slug: string;
  name_es: string;
  icon?: string;
}

interface CategoryCardProps {
  category: Category;
  selected: boolean;
  onToggle: (id: number) => void;
}

export function CategoryCard({ category, selected, onToggle }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(category.id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm ${
        selected
          ? 'border-pink-500 bg-pink-50 text-pink-700'
          : 'border-pink-100 bg-white text-slate-700'
      }`}
    >
      <span className="text-xl">{category.icon ?? '🎁'}</span>
      <span>{category.name_es}</span>
    </button>
  );
}