"use client";
import { capitalize } from "@/utils/stringUtils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ProductCard from "@components/common/ProductCard";
import Notification from "@components/common/Notification";
import LoadingSpinner from "@components/common/LoadingSpinner";

export default function CategoriaDeProdutos() {
  const [categorias, setCategorias] = useState([]);
  const [produtosDaCategoria, setProdutosDaCategoria] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [loading, setLoading] = useState({
    categorias: true,
    produtos: false
  });
  const [mensagem, setMensagem] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const carrinhoSalvo = Cookies.get("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
    pegaCategorias();
  }, []);

  useEffect(() => {
    if (categoriaSelecionada) {
      pegaProdutosDaCategoria(categoriaSelecionada.nome);
    } else {
      setProdutosDaCategoria([]);
    }
  }, [categoriaSelecionada]);

  async function pegaCategorias() {
    try {
      setLoading(prev => ({...prev, categorias: true}));
      const resposta = await fetch("/api/categorias");
      if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
      setCategorias(await resposta.json());
    } catch (erro) {
      console.error("Erro ao buscar categorias:", erro);
      setMensagem("Erro ao carregar categorias");
    } finally {
      setLoading(prev => ({...prev, categorias: false}));
    }
  }

  async function pegaProdutosDaCategoria(categoriaNome) {
    try {
      setLoading(prev => ({...prev, produtos: true}));
      const resposta = await fetch(`/api/categorias?categoria=${categoriaNome}`);
      if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
      const data = await resposta.json();
      setProdutosDaCategoria(data.produtos || data);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      setMensagem("Erro ao carregar produtos");
    } finally {
      setLoading(prev => ({...prev, produtos: false}));
    }
  }

  const adicionarAoCarrinho = (produto) => {
    if (!carrinho.some(p => p.id === produto.id)) {
      const novoCarrinho = [...carrinho, produto];
      setCarrinho(novoCarrinho);
      Cookies.set("carrinho", JSON.stringify(novoCarrinho), { 
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });
      setMensagem(`${produto.nome} adicionado ao carrinho`);
    } else {
      setMensagem(`${produto.nome} já está no carrinho`);
    }
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <>
      <Notification message={mensagem} onClose={() => setMensagem("")} />
      
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-10rem)]">
        {/* Sidebar de Categorias */}
        <aside className="w-full md:w-64 bg-gray-50 p-4 border-r border-gray-200">
          <h2 className="text-xl font-bold mb-6 pt-4">Categorias</h2>
          
          {loading.categorias ? (
            <LoadingSpinner size="small" />
          ) : (
            <ul className="space-y-3">
              {categorias.map((categoria) => (
                <li key={categoria.id}>
                  <button
                    onClick={() => setCategoriaSelecionada(categoria)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      categoriaSelecionada?.id === categoria.id
                        ? 'bg-primary text-white'  // Texto branco quando selecionado
                        : 'hover:bg-gray-100 text-gray-800'  // Texto escuro quando não selecionado
                    }`}
                  >
                    {capitalize(categoria.nome)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-6">
          {loading.produtos && (
            <div className="flex justify-center my-8">
              <LoadingSpinner />
            </div>
          )}

          {categoriaSelecionada ? (
            <>
              <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold text-gray-800">
    {categoriaSelecionada.nome.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
  </h1>
  {/* Removido o span com o contador de produtos */}
</div>

              {produtosDaCategoria.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {produtosDaCategoria.map((produto) => (
                    <ProductCard
                      key={produto.id}
                      product={produto}
                      onAddToCart={() => adicionarAoCarrinho(produto)}
                      onBuyNow={() => {
                        adicionarAoCarrinho(produto);
                        router.push("/carrinho");
                      }}
                    />
                  ))}
                </div>
              ) : (
                !loading.produtos && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      Nenhum produto encontrado nesta categoria
                    </p>
                    <button
                      onClick={() => setCategoriaSelecionada(null)}
                      className="mt-4 text-primary hover:underline"
                    >
                      Voltar para todas categorias
                    </button>
                  </div>
                )
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-600 mb-4">
                Selecione uma categoria
              </h2>
              {!loading.categorias && categorias.length === 0 && (
                <p className="text-gray-500">Nenhuma categoria disponível</p>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}