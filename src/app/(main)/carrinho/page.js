"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import TablesProduts from "@components/TablesProduts";
import Navbar from "@components/Navbar";

export default function Carinho({
  receberProduto,
  F_receber_produto,
  priceForLocal,
  frete,
  Pagamento,
}) {
  const [carrinho, setCarrinho] = useState([]); // Estado que guarda os produtos do carrinho
  // Carregar carrinho do cookie ao iniciar
  useEffect(() => {
    const carrinhoCookie = Cookies.get("carrinho");
    if (carrinhoCookie) {
      setCarrinho(JSON.parse(carrinhoCookie));
    }
  }, []);

  // Função para atualizar o carrinho no estado e cookie
  const atualizarCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    Cookies.set("carrinho", JSON.stringify(novoCarrinho), { expires: 7 });
  };

  return (
    <div>
      <Navbar carrinhoCount={carrinho.length} />

      <TablesProduts />
    </div>
  );
}
