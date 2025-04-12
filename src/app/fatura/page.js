"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Importando o useRouter para navegação

export default function Facturas() {
  const [dadosCompra, setDadosCompra] = useState(null);
  const [mensagem, setMensagem] = useState();
  const router = useRouter(); // Inicializando o router

  useEffect(() => {
    const dadosCompraCookie = Cookies.get("dadosCompra");
    if (dadosCompraCookie) {
      try {
        setDadosCompra(JSON.parse(dadosCompraCookie));
      } catch (error) {
        console.error("Erro ao analisar os dados do cookie:", error);
      }
    }
  }, []);

  const calcularTotal = (produtos) =>
    produtos.reduce(
      (total, produto) => total + produto.preco * produto.quantidade,
      0
    );

  // Função para redirecionar para a página inicial
  const irParaPaginaInicial = () => {
    router.push("/"); // Redireciona para a página inicial
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      {/* Mensagem fixa no topo */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-lg text-black text-center py-2 z-50">
        Este comprovativo lhe será enviado por email
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-16 sm:mt-24">
        {/* Informações da empresa */}
        <div className="flex flex-col items-start space-y-2 sm:w-1/2 sm:ml-6">
          <Image
            width={200}
            height={80}
            src="/image/bemtoc.png"
            alt="logotipo da bemtoc"
            className="rounded-lg mb-4"
          />
          <div>
            <p>Comércio Geral e Prestação de Serviços, LDA</p>
            <p>NIF: 5001692470</p>
            <p>Endereço: Luanda, Maianga, Bairro Gamek à direita</p>
            <p>Contactos: 927 056 454</p>
            <p>Email: bemtoc.suporte@gmail.com</p>
            <p>Luanda - Angola</p>
          </div>
        </div>

        {/* Informações do cliente */}
        <div className="flex flex-col space-y-2 sm:w-1/2 sm:mt-0 mt-16">
          <p>FRM 13B2023 a 50 Factura Recibo Nª 2</p>
          <p>Data: {new Date().toLocaleDateString()}</p>
          <p>Cliente: {dadosCompra?.cliente?.nome || "----"}</p>
          <p>Endereço: {dadosCompra?.local || "----"}</p>
          <p>Contacto: {dadosCompra?.cliente?.contacto || "----"}</p>
        </div>
      </div>

      <table className="table-auto border-collapse w-full mt-8">
        <thead>
          <tr className="border border-black">
            <th className="border border-black px-4 py-2">Qtd</th>
            <th className="border border-black px-4 py-2">Designação</th>
            <th className="border border-black px-4 py-2">Preço Unitário</th>

            <th className="border border-black px-4 py-2">Total</th>
            <th className="border border-black px-4 py-2">--</th>
          </tr>
        </thead>
        <tbody>
          {dadosCompra?.produtos?.map((produto, index) => (
            <tr key={index} className="border border-black">
              <td className="border border-black px-4 py-2">
                {produto.quantidade}
              </td>
              <td className="border border-black px-4 py-2">{produto.nome}</td>
              <td className="border border-black px-4 py-2">
                {produto.preco.toLocaleString()} KZ
              </td>
              <td className="border border-black px-4 py-2">
                {(produto.preco * produto.quantidade).toLocaleString()} KZ
              </td>
            </tr>
          ))}

          <tr className="border border-black">
            <td className="border border-black px-4 py-2" colSpan={2}></td>
            <td
              className="border border-black px-4 py-2 text-center"
              colSpan={2}
            >
              Total
            </td>
            <td className="border border-black px-4 py-2">
              {dadosCompra?.produtos
                ? calcularTotal(dadosCompra.produtos).toLocaleString()
                : 0}{" "}
              KZ
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4">
        <p className="text-sm">
          Edvaldo Alfredo Tito Manuel, NIF: 005676509LA044-2020-AGT-218
        </p>
      </div>

      {/* Botão para ir para a página inicial */}
      <div className="flex justify-center mt-8">
        <button
          onClick={irParaPaginaInicial}
          className="bg-gray-200 text-black shadow-bottom mb-20 hover:bg-blue-300 py-2 px-4 rounded"
        >
          Ir para a página inicial
        </button>
      </div>
    </div>
  );
}
