"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function ClientLayout({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Inicialização mais robusta
  useEffect(() => {
    const initializeCart = () => {
      try {
        const carrinhoSalvo = Cookies.get("carrinho");
        setCarrinho(carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCarrinho([]);
      }
    };

    initializeCart();
  }, []);

  const atualizarCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    Cookies.set("carrinho", JSON.stringify(novoCarrinho), { 
      expires: 7,
      secure: true,
      sameSite: 'strict'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      
      <Navbar 
        carrinhoCount={carrinho.length} 
        onSearch={setSearchQuery} 
        className="shadow-sm"
      />
      
      <main className="flex-1 pt-36 md:pt-40 transition-all duration-300">
        {children}
      </main>
      
      <Footer className="border-t border-gray-200 mt-12" />
    </div>
  );
}