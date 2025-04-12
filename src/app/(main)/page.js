"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useDebounce from "@/hooks/useDebounce";
import Slide from "@components/Slide";
import ProductCard from "@components/common/ProductCard";
import Notification from "@/components/common/Notification";

export default function Home() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtosEstaticos] = useState([
    {
      id: 1,
      nome: "Alça dupla",
      imagem: "/image/alca-dupla-da-camera-slr.png",
      preco: "kz 16.800,00",
    },
    {
      id: 4,
      nome: "Bateria Alcalina",
      imagem: "/image/bateria-alcalina-seca-de-12v-23a.png",
      preco: "kz 1.250,00",
    },
    {
      id: 6,
      nome: "Caneta de Limpeza",
      imagem: "/image/caneta-de-limpeza-dupla-de-lentes-de-fotografia.png",
      preco: "kz 4.500,00",
    },
    {
      id: 23,
      nome: "Mola",
      imagem: "/image/mola.png",
      preco: "kz 2.500,00",
    },
  ]);
  const [produtosParaExibir, setProdutosParaExibir] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mostrarMais, setMostrarMais] = useState(true);
  const router = useRouter();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Função para buscar e filtrar produtos
  async function pegaProdutos(query = "") {
    setLoading(true);
    try {
      const response = await fetch("api/produtos", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const produtosAPI = await response.json();
      console.log("Produtos da API:", produtosAPI); // Verifique os dados retornados da API

      const todosProdutos = [...produtosAPI, ...produtosEstaticos];

      const produtosFiltrados = query
        ? todosProdutos.filter((produto) =>
            produto.nome.toLowerCase().includes(query.toLowerCase())
          )
        : todosProdutos;

      setListaProdutos(produtosAPI);
      setProdutosFiltrados(produtosFiltrados);
      setProdutosParaExibir(produtosFiltrados.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setListaProdutos([]);
      setProdutosFiltrados([]);
      setProdutosParaExibir([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("Produtos Estáticos:", produtosEstaticos);
    console.log("Lista Produtos:", listaProdutos); // Se existir lista dinâmica
  }, []);

  useEffect(() => {
    setIsClient(true);
    pegaProdutos();
    const carrinhoSalvo = Cookies.get("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      pegaProdutos(debouncedSearchQuery);
    } else {
      pegaProdutos();
    }
  }, [debouncedSearchQuery]);

  // Função de pesquisa
  const handleSearch = (query) => {
    setSearchQuery(query);
  }; 
  
  const adicionarAoCarrinho = (produtoNome) => {
    const produto =
      listaProdutos.find((p) => p.nome === produtoNome) || // Busca pelo nome na lista dinâmica
      produtosEstaticos.find((p) => p.nome === produtoNome); // Busca pelo nome na lista estática
    if (!produto.id) {
      console.error("Produto sem ID:", produto);
      return;
    }
    if (produto && !carrinho.some((p) => p.nome === produtoNome)) {
      // Verifica se o produto já está no carrinho
      const novoCarrinho = [...carrinho, produto];
      setCarrinho(novoCarrinho); // Atualiza o estado do carrinho
      Cookies.set("carrinho", JSON.stringify(novoCarrinho), { expires: 7 }); // Salva o carrinho nos cookies
      setMensagem("O seu produto foi adicionado ao carrinho."); // Exibe mensagem de sucesso
      setTimeout(() => setMensagem(""), 3000); // Limpa a mensagem após 3 segundos
    } else {
      setMensagem("O seu produto já está no carrinho."); // Exibe mensagem de erro
      setTimeout(() => setMensagem(""), 3000); // Limpa a mensagem após 3 segundos
    }
  };

  // Função para carregar mais produtos
  const carregarMaisProdutos = () => {
    const nextIndex = produtosParaExibir.length + 4;
    const novosProdutos = produtosFiltrados.slice(0, nextIndex);

    setProdutosParaExibir(novosProdutos);

    if (novosProdutos.length === produtosFiltrados.length) {
      setMostrarMais(false);
    }
  };


  useEffect(() => {
    setIsClient(true);
    pegaProdutos();
    const carrinhoSalvo = Cookies.get("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      pegaProdutos(debouncedSearchQuery);
    } else {
      pegaProdutos();
    }
  }, [debouncedSearchQuery]);

  return (
    <>
      <Slide />
      <Notification message={mensagem} onClose={() => setMensagem("")} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-white p-4">
        {produtosParaExibir.map((produto) => (
          <ProductCard key={produto.id} product={produto} onAddToCart={adicionarAoCarrinho} />
        ))}
      </div>

      {mostrarMais && (
        <div className="flex justify-center mt-8">
          <button
            onClick={carregarMaisProdutos}
            className="px-5 py-1 text-white bg-black mb-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Ver mais
          </button>
        </div>
      )}
    </>
  );
}