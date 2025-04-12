'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ProductCard from "@components/common/ProductCard";
import Notification from "@/components/common/Notification";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { categoryMappings } from "@/utils/categoryMapping";
import { capitalize } from "@/utils/stringUtils";

export default function Categoria({ categoria }) {
    const [produtosCategoria, setProdutosCategoria] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const [carrinho, setCarrinho] = useState([]);
    const [slug,setSlug] = useState('')
    const router = useRouter();
  
    // Carrega carrinho e produtos ao iniciar
    useEffect(() => {
        const carrinhoSalvo = Cookies.get("carrinho");
        if (carrinhoSalvo) {
            setCarrinho(JSON.parse(carrinhoSalvo));
        }
        setSlug(categoryMappings[categoria])
        pegaProdutosDaCategoria(slug);
    }, [categoria]);

    async function pegaProdutosDaCategoria(categoriaNome) {
        try {
            setLoading(true);
            const resposta = await fetch(`/api/categorias?categoria=${categoriaNome}`);
            if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
            const data = await resposta.json();
            setProdutosCategoria(data.produtos || data);
        } catch (erro) {
            console.error("Erro ao buscar produtos:", erro);
            setMensagem("Erro ao carregar produtos");
        } finally {
            setLoading(false);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Notification message={mensagem} onClose={() => setMensagem("")} />
            
            {/* Cabeçalho com nome da categoria e botão de voltar */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {capitalize(categoryMappings[categoria])}
                </h1>
                <button
                    onClick={() => router.push('/categoria')}
                    className="flex items-center text-primary hover:underline"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Voltar
                </button>
            </div>

            {/* Lista de produtos */}
            {produtosCategoria.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {produtosCategoria.map((produto) => (
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
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                        Nenhum produto encontrado nesta categoria
                    </p>
                    <button
                        onClick={() => router.push('/categorias')}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Ver todas categorias
                    </button>
                </div>
            )}
        </div>
    );
}