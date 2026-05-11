export default function HomePage() {
  return (
    <div>
      <section className="px-6 py-16 text-center bg-gradient-to-b from-pink-50 to-white">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">
          Presentes que encantam
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Cestas personalizadas, feitas com carinho e perfeitas para qualquer ocasião.
        </p>

        <a
          href="/catalogo"
          className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl shadow hover:bg-pink-700"
        >
          Ver Catálogo
        </a>
      </section>
    </div>
  );
}