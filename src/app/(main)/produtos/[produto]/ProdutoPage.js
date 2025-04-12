"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Image from "next/image";


// Hook de Debounce
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };
  
  export default function ClientPageProduto({produto}) {
    const searchParams = useSearchParams();
    const produtoNome = searchParams.get("nome");
  
    const [produtoDetalhes, setProdutoDetalhes] = useState(null); // Inicialize como null
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [carrinho, setCarrinho] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
  
    // Efeito para buscar dados do carrinho
    useEffect(() => {
      const carrinhoCookie = Cookies.get("carrinho");
      if (carrinhoCookie) setCarrinho(JSON.parse(carrinhoCookie));
  
      if (produto) {
        setLoading(true);
        fetch(`/api/produtos`)
          .then((response) => {
            if (!response.ok) throw new Error("Erro ao carregar a API");
            return response.json();
          })
          .then((produtos) => {
            const produtoEncontrado = produtos.find(
              (p) => p.nome.toLowerCase() === produto.toLowerCase()
            );
            if (produtoEncontrado) {
              setProdutoDetalhes(produtoEncontrado);
            } else {
              setProdutoDetalhes(null); // Caso não encontre o produto
            }
          })
          .catch((error) => console.error("Erro ao carregar o produto:", error))
          .finally(() => setLoading(false));
      }
    }, [produto]);
  
    // Hook de debounce para a pesquisa
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
    useEffect(() => {
      if (debouncedSearchQuery) {
        pegaProduto(debouncedSearchQuery); // Pesquisa com o valor debounced
      } else {
        setProdutoDetalhes(null); // Se a pesquisa estiver vazia, não exibe nenhum produto
      }
    }, [debouncedSearchQuery]);
  
    // Função para buscar produto com base no termo de pesquisa
    const pegaProduto = (query) => {
      setLoading(true);
      fetch(`/api/produtos?search=${query}`)
        .then((response) => response.json())
        .then((produtos) => {
          const produtoEncontrado = produtos.find(
            (p) => p.nome.toLowerCase().includes(query.toLowerCase()) // Busca parcial
          );
          if (produtoEncontrado) {
            setProdutoDetalhes(produtoEncontrado); // Exibe o produto encontrado
          } else {
            setProdutoDetalhes(null); // Se não encontrar, exibe null
          }
        })
        .catch((error) => console.error("Erro ao buscar produto:", error))
        .finally(() => setLoading(false));
    };
  
    // Função para adicionar ao carrinho
    const adicionarAoCarrinho = (produtonome) => {
      const produto = produtoDetalhes;
      if (produto && !carrinho.some((p) => p.nome === produto.nome)) {
        const novoCarrinho = [...carrinho, produto];
        setCarrinho(novoCarrinho);
        Cookies.set("carrinho", JSON.stringify(novoCarrinho), { expires: 7 });
        setMensagem("O seu produto foi adicionado ao carrinho.");
        setTimeout(() => setMensagem(""), 3000);
      } else {
        setMensagem("O seu produto já está no carrinho.");
        setTimeout(() => setMensagem(""), 3000);
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar carrinhoCount={carrinho.length} onSearch={setSearchQuery} />
        {mensagem && (
          <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
            {mensagem}
          </div>
        )}
        <main className="flex-grow max-w-6xl mx-auto p-4 mt-20 md:mt-36">
          {loading ? (
            <p className="text-center mt-10">Carregando...</p>
          ) : produtoDetalhes ? (
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg w-80 md:w-96 mt-4">
              {/* Imagem do Produto */}
              <div
                className="w-full h-60 bg-black cursor-pointer"
                onClick={() =>
                  router.push(`/produtos/detalhes?nome=${produtoDetalhes.nome}`)
                }
              >
                {produtoDetalhes.imagem ? (
                  <Image
                    src={produtoDetalhes.imagem}
                    alt={produtoDetalhes.nome}
                    width={800}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <p className="text-center mt-4">Imagem não disponível</p>
                )}
              </div>
  
              {/* Detalhes do Produto */}
              <div className="w-80 md:w-96 mt-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {produtoDetalhes.nome}
                </h2>
                <p className="text-sm font-semibold text-gray-700 mb-4">
                  {produtoDetalhes.descricao}
                </p>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <p className="text-lg font-bold text-blue-600">
                    kz {produtoDetalhes.preco}
                  </p>
                </div>
  
                {/* Botões */}
                <div className="flex justify-center">
                  <button
                    className="flex items-center bg-white text-black shadow-lg text-sm hover:shadow-none
                    px-6 py-0 rounded-l-full transition duration-200 mb-3"
                    onClick={() => adicionarAoCarrinho(produtoDetalhes.nome)}
                  >
                    <img
                      src="/image/carrinhos.png"
                      alt="ícone adicionar"
                      className="w-6 h-6 mr-2"
                    />
                    Adicionar
                  </button>
                  <button
                    className="flex items-center bg-slate-100 text-black text-sm px-6 py-0 mb-3 hover:shadow-lg rounded-r-full transition duration-200"
                    onClick={() => {
                      adicionarAoCarrinho(produtoDetalhes.nome);
                      router.push("/carrinho");
                    }}
                  >
                    Comprar
                    <img
                      src="/image/Dinheiro2.png"
                      alt="ícone comprar"
                      className="w-6 h-6 ml-2"
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center mt-10">Pesquise por um produto</p>
          )}
        </main>
        <Footer />
      </div>
    );
  }
  