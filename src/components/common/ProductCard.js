import { capitalize } from "@/utils/stringUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductCard = ({ product, onAddToCart }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await onAddToCart(product.nome);
    setIsAdding(false);
  };

  return (
    <div 
      className={`flex flex-col items-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 ${
        isHovered ? 'transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative w-full h-60 rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => router.push(`/produtos/detalhes?nome=${encodeURIComponent(product.nome)}`)}
      >
        <Image
          src={product.imagem}
          alt={product.nome}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      <div className="w-full mt-2 px-2"> {/* Reduzido de mt-4 */}
        <h3 className="text-lg font-medium text-gray-800 line-clamp-2">
          {capitalize(product.nome)}
        </h3>
        <p className="text-lg font-bold text-black mt-1"> {/* Reduzido de mt-2 */}
          {product.preco}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-colors ${
              isAdding 
                ? 'bg-gray-100 text-gray-500' 
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            {isAdding ? (
              'Adicionando...'
            ) : (
              <>
                <ShoppingCartIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Adicionar</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              handleAddToCart();
              router.push("/carrinho");
            }}
            className="flex-1 py-2 px-4 rounded-full bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ArrowRightIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Componentes de ícone (pode mover para arquivo separado)
  function ShoppingCartIcon({ className }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }

  function ArrowRightIcon({ className }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    );
  }
};

export default ProductCard;