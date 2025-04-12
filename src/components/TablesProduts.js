import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Carregamento from "./carregamento";

// Dados das localizações e preços de entrega
const Localizacoes = [
  { nome: "Gamek á direita", preco: 500 },
  { nome: "Corimba nas cadeira", preco: 500 },
  { nome: "Morro Bento", preco: 800 },
  { nome: "Samba", preco: 1000 },
  { nome: "Zamba 2", preco: 1000 },
  { nome: "Bairro Azul", preco: 1000 },
  { nome: "Martéris", preco: 1000 },
  { nome: "Cassenda", preco: 1000 },
  { nome: "Rocha", preco: 1000 },
  { nome: "Aeroporto", preco: 1000 },
  { nome: "Nova Vida", preco: 1000 },
  { nome: "Benfica", preco: 1000 },
  { nome: "Rotunda da Fubu", preco: 1000 },
  { nome: "Danjarré", preco: 1000 },
  { nome: "Mutamba", preco: 1200 },

  { nome: "Prenda", preco: 1200 },
  { nome: "Mercado do scongolenses", preco: 1200 },
  { nome: "Bairro Popular", preco: 1200 },
  { nome: "Cassequel", preco: 1200 },
  { nome: "Golf 2", preco: 1200 },
  { nome: "Maianga", preco: 1200 },
  { nome: "Vila do Gamek", preco: 1200 },
  { nome: "Futungo", preco: 1200 },
  { nome: "Talatona", preco: 1200 },
  { nome: "Ilha de Luanda", preco: 1500 },
  { nome: "Maculusso", preco: 1500 },
  { nome: "Kilamba", preco: 1500 },
  { nome: "Kinaxixi", preco: 1500 },
  { nome: "São Paulo", preco: 1500 },
  { nome: "Palanca", preco: 1500 },
  { nome: "Camama", preco: 1500 },
  { nome: "Calemba 2", preco: 1500 },
  { nome: "Ramiros", preco: 2000 },
  { nome: "Luanda Sul", preco: 2000 },
  { nome: "Sanbizanga", preco: 2000 },
  { nome: "Hoji-ha-henda", preco: 2000 },
  { nome: "Vila de Viana", preco: 2000 },
  { nome: "Zona verde", preco: 2000 },
  { nome: "Disvio do Zango", preco: 2000 },
  { nome: "Vila do Cacuaco", preco: 2000 },
  { nome: "Ponte do 25", preco: 2500 },
  { nome: "Zango 1,2 e 3", preco: 2500 },
  { nome: "Trinta", preco: 2500 },
];

export default function TablesProduts(carrinhoCount) {
  const [carrinho, setCarrinho] = useState([]);
  const [localizacao, setLocalizacao] = useState("");
  const [fretes, setFrete] = useState(0);
  const [quantidade, setQuantidades] = useState([]);
  const [isSelectEnabled, setIsSelectEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);
  const [mensagem, setMensagem] = useState("");
  //funcao para guardar os dados do produtos em cookie
  useEffect(() => {
    const carrinhoCookie = Cookies.get("carrinho");
    const freteCookie = Cookies.get("frete");
    const localizacaoCookie = Cookies.get("localizacao");

    if (carrinhoCookie) {
      const parsedCarrinho = JSON.parse(carrinhoCookie);
      setCarrinho(parsedCarrinho);
      setQuantidades(parsedCarrinho.map(() => 1)); // Inicializa quantidades em 1
    }

    if (freteCookie) {
      const parsedFrete = JSON.parse(freteCookie);
      setFrete(parsedFrete || 0);
    }

    if (localizacaoCookie) {
      setLocalizacao(localizacaoCookie);
    }

    setLoading(false); // Após carregar os dados, definimos loading como false
  }, []);
  //efeito para calcular o total de produtos,o frete e a quantidade
  useEffect(() => {
    const total = calcularTotalProdutos();
    setTotalProdutos(total);
    setTotalCompra(total + (isSelectEnabled ? fretes : 0));
  }, [carrinho, quantidade, fretes, isSelectEnabled]);
  //funcao para calcular produtos
  const calcularTotalProdutos = () => {
    return carrinho.reduce((acc, produto, index) => {
      const precoProduto = parseFloat(produto.preco) || 0; // Certifique-se de que o preço é numérico
      const quantidadeProduto = Math.max(parseInt(quantidade[index])); // Certifique-se de que a quantidade é >= 1
      return acc + precoProduto * quantidadeProduto;
    }, 0);
  };
  //funcao para seleção da localização
  const handleSelectLocalizacao = (e) => {
    const selected = Localizacoes.find((loc) => loc.nome === e.target.value);
    setLocalizacao(selected?.nome || "");
    setFrete(selected?.preco || 0);

    Cookies.set("localizacao", selected?.nome || "", { expires: 7 });
    Cookies.set("frete", JSON.stringify(selected?.preco || 0), { expires: 7 });
  };
  //funcao para incrementar os produtos

  const Incrementar = (index) => {
    try {
      const produto = carrinho[index];
      const estoqueDisponivel = produto.stock;

      // Verificar se ainda há estoque suficiente
      if (quantidade[index] < estoqueDisponivel) {
        const newQuantidades = [...quantidade];
        newQuantidades[index] += 1;
        setQuantidades(newQuantidades);
        atualizarCarrinho(newQuantidades);
        Cookies.set("quantidade", JSON.stringify(newQuantidades), {
          expires: 7,
        });
      } else {
        setMensagem("Quantidade máxima disponível em estoque atingida!");
      }
    } catch (err) {
      console.log("Erro ao atualizar o carrinho.");
      console.error(err);
    }
  };

  //funcao para decrementar os produtos
  const Decrementar = (index) => {
    if (quantidade[index] > 1) {
      const newQuantidades = [...quantidade];
      newQuantidades[index] -= 1;
      setQuantidades(newQuantidades);
      atualizarCarrinho(newQuantidades);
      Cookies.set("quantidade", JSON.stringify(newQuantidades), { expires: 7 });
    }
  };
  //funcao para remover produtos do carrinho
  const removerProduto = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);

    const novasQuantidades = [...quantidade];
    novasQuantidades.splice(index, 1);
    setQuantidades(novasQuantidades);

    Cookies.set("carrinho", JSON.stringify(novoCarrinho), { expires: 7 });
    Cookies.set("quantidade", JSON.stringify(novasQuantidades), { expires: 7 });
  };
  //funcao para atualizar o carrinho com novos produtos
  const atualizarCarrinho = (novasQuantidades) => {
    const novosCarrinho = carrinho.map((produto, index) => ({
      ...produto,
      quantidade: novasQuantidades[index],
    }));
    setCarrinho(novosCarrinho);
    Cookies.set("carrinho", JSON.stringify(novosCarrinho), { expires: 7 });
  };

  //funcao para na empresa

  const handleReceberNaEmpresa = () => {
    setIsSelectEnabled(false);
    setFrete(0);
    setLocalizacao("");
  };
  //funcao para receber em casa
  const handleReceberEmCasa = () => {
    setIsSelectEnabled(true);
  };

  const handleFinalizarCompra = () => {
    Cookies.set("totalProdutos", JSON.stringify(totalProdutos), { expires: 7 });
    Cookies.set("totalCompra", JSON.stringify(totalCompra), { expires: 7 });
    Cookies.set("localizacao", localizacao, { expires: 7 });
    setMensagem(`Compra finalizada! Total: AOA ${totalCompra.toFixed(3)}`);
    console.log("localizacao", localizacao);
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
      setMensagem("");

      window.location.href = "/Comprovante";
    }, 3000);
  };

  if (loading) {
    return <Carregamento />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6  font-samsung font-medium">
      {mensagem && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-10 rounded shadow-lg">
          {mensagem}
        </div>
      )}
      {/* Tabela de Produtos */}
      <div className="flex-1">
        <div className="text-center mt-20 mb-6 text-2xl pt-36 font-samsung font-bold">
          <div>Sumário do Carrinho de Compras</div>
        </div>

        <section className="bg-white shadow-lg p-4 rounded-md">
          <table className="w-full divide-y divide-gray-200 ">
            <thead>
              <tr className="bg-slate-100 border border-gray-100 text-base font-samsung font-bold">
                <th className="border border-gray-50 shadow-lg">Produto</th>

                <th className="border border-gray-50 shadow-lg">Preço</th>
                <th className="border border-gray-50 shadow-lg">Quantidade</th>
                <th className="border border-gray-50 shadow-lg"></th>
              </tr>
            </thead>
            <tbody className="bg-white font-samsung font-medium">
              {carrinho.map((produto, index) => (
                <tr key={index} className="border border-gray-100">
                  <td className="flex flex-col items-center p-3">
                    <Image
                      width={80}
                      height={80}
                      src={produto.imagem}
                      alt={produto.nome}
                      className="mb-2" // Espaço entre a imagem e o nome
                    />
                    <span className="text-center">{produto.nome}</span>{" "}
                    {/* Nome centralizado abaixo da imagem */}
                  </td>

                  <td className="text-center">AOA {produto.preco}</td>
                  <td className="text-center">
                    <button
                      onClick={() => Decrementar(index)}
                      className="bg-gray-100 text-black px-2 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{quantidade[index]}</span>
                    <button
                      onClick={() => Incrementar(index)}
                      className="bg-blue-50 text-black px-2 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="text-center space-x-3 pl-2">
                    <Image
                      src="/image/Remover.png"
                      width={20}
                      height={20}
                      alt="Remover produto"
                      onClick={() => removerProduto(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Resumo da Compra */}
      <div className="w-full md:w-1/3 bg-slate-100 shadow-lg mt-8 md:mt-0 p-4 rounded-md flex flex-col items-center lg:mt-40">
        <h2 className="text-xl md:text-2xl text-black text-center p-1 rounded font-samsung font-bold">
          Resumo da Compra
        </h2>
        <div className="mt-4 font-samsung font-medium w-full">
          <h1 className="mt-5 md:mt-7 mb-4 md:mb-5 text-center md:text-left">
            Como vai receber o produto?
          </h1>
          <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={handleReceberNaEmpresa}
              className={`${
                !isSelectEnabled ? "bg-blue-100" : "bg-gray-200 shadow-lg"
              } rounded text-black px-4 py-2`}
            >
              Nosso Escritório
            </button>
            <button
              onClick={handleReceberEmCasa}
              className={`${
                isSelectEnabled ? "bg-blue-100" : "bg-gray-200 shadow-lg"
              } rounded text-black px-4 py-2`}
            >
              Receber em casa
            </button>
          </div>
          <select
            onChange={handleSelectLocalizacao}
            disabled={!isSelectEnabled}
            value={localizacao || ""}
            className="mt-4 w-full bg-gray-50 text-black rounded p-2"
          >
            <option value="" disabled>
              Escolha a sua localização:
            </option>
            {Localizacoes.map((loc) => (
              <option key={loc.nome} value={loc.nome}>
                {loc.nome}
              </option>
            ))}
          </select>
          <div className="mt-4">
            <div>Total Produtos: AOA {totalProdutos.toFixed(3)}</div>
            <div>Frete: AOA {fretes.toFixed(3)}</div>
            <div className="font-bold">
              Total Compra: AOA {totalCompra.toFixed(3)}
            </div>
          </div>
          <Link href="/Comprovante">
            <button
              className="bg-blue-50 hover:bg-blue-100 shadow-lg text-black px-6 md:px-14 py-2 rounded mt-6 mx-auto block"
              onClick={handleFinalizarCompra}
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
