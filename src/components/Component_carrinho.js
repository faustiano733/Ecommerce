import Carrinho_produtos from "./components/Carrinho_produtos";
import { useState } from "react";

const CartPage = () => {
  const [location, setLocation] = useState("");
  const [pickup, setPickup] = useState(true); // true = balcão, false = entrega

  const products = [
    { name: "Produto 1", description: "Descrição do produto 1", price: 29.99 },
    { name: "Produto 2", description: "Descrição do produto 2", price: 49.99 },
  ];

  const handlePayment = () => {
    // Lógica de pagamento
    console.log("Pagamento realizado");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex">
        {/* Coluna da esquerda: Informações de pagamento e localização */}
        <div className="w-1/2 pr-4">
          <h1 className="text-2xl font-bold mb-4">Informações de Pagamento</h1>
          <label className="block mb-2">Localização:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-400 rounded-lg p-2 mb-4 w-full"
            placeholder="Digite sua localização"
          />
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="pickup"
                checked={pickup}
                onChange={() => setPickup(true)}
              />
              <span className="ml-2">Retirar no balcão</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                className="form-radio"
                name="pickup"
                checked={!pickup}
                onChange={() => setPickup(false)}
              />
              <span className="ml-2">Receber em casa</span>
            </label>
          </div>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Fazer Pagamento
          </button>
        </div>

        {/* Coluna da direita: Produtos no carrinho */}
        <div className="w-1/2 pl-4">
          <h1 className="text-2xl font-bold mb-4">Produtos no Carrinho</h1>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
