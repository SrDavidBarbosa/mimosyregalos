'use client';

import { useCart } from '@/hooks/useCart';

export default function CarrinhoPage() {
  const { cart, updateQty, removeFromCart, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-slate-500">
        Seu carrinho está vazio.
      </div>
    );
  }

  function gerarMensagemWhatsApp() {
    const linhas = cart.map(
      (p) => `• ${p.qty}x ${p.name} — ${(p.priceCents / 100).toFixed(2)}€`
    );

    const texto = encodeURIComponent(
      `Olá! Quero fazer um pedido:\n\n${linhas.join(
        '\n'
      )}\n\nTotal: ${total.toFixed(2)}€`
    );

    return `https://wa.me/34XXXXXXXXX?text=${texto}`;
  }

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold">Carrinho</h1>

      <div className="space-y-4">
        {cart.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 bg-white rounded-2xl shadow border border-pink-100 p-4"
          >
            <img
              src={p.image}
              className="w-20 h-20 object-cover rounded-xl"
            />

            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-slate-500">
                {(p.priceCents / 100).toFixed(2)} €
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQty(p.id, Math.max(1, p.qty - 1))}
                  className="px-3 py-1 bg-slate-200 rounded-lg"
                >
                  -
                </button>

                <span>{p.qty}</span>

                <button
                  onClick={() => updateQty(p.id, p.qty + 1)}
                  className="px-3 py-1 bg-slate-200 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(p.id)}
              className="text-red-600 text-sm"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow border border-pink-100 p-6 space-y-4">
        <p className="text-lg font-semibold">
          Total: {total.toFixed(2)} €
        </p>

        <a
          href={gerarMensagemWhatsApp()}
          className="block w-full text-center bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700"
        >
          Finalizar pedido pelo WhatsApp
        </a>

        <button
          onClick={clearCart}
          className="block w-full text-center bg-slate-200 text-slate-700 py-3 rounded-xl shadow"
        >
          Limpar carrinho
        </button>
      </div>
    </div>
  );
}