export function CategoryCard({ category, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(category.id)}
      className={`flex items-center gap-3 p-3 rounded-2xl border transition
        ${selected ? 'border-pink-500 bg-pink-50' : 'border-slate-200 bg-white'}
      `}
    >
      <span className="text-xl">{category.icon || '🎁'}</span>
      <span className="text-sm font-medium">{category.name_es}</span>
    </button>
  );
}