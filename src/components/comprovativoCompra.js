"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ComprovativoCompra() {
  const [formData, setFormData] = useState({
    nome: "",
    contacto: "",
    contacto_alternativo: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [carrinho, setCarrinho] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [local, setlocal] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const carrinhoCookie = Cookies.get("carrinho");
    const carrinholocal = Cookies.get("localizacao");
    if (carrinhoCookie) {
      const carrinhoData = JSON.parse(carrinhoCookie);
      const carrinhoLocalicao = carrinholocal;
      console.log("Carrinho Data:", carrinhoData); // Depuração
      console.log("Carrinho local:", carrinhoLocalicao); // Depuração
      setCarrinho(carrinhoData);
      setlocal(carrinhoLocalicao);
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    // Validação do nome
    if (!/^[a-zA-ZÀ-ÿ\s]{1,30}$/.test(formData.nome)) {
      newErrors.nome =
        "O nome deve conter apenas letras (máximo 30 caracteres).";
    }
    // Validação do número
    if (!/^9\d{8}$/.test(formData.contacto)) {
      newErrors.contacto =
        "O número deve começar com 9 e conter exatamente 9 dígitos.";
    }
    // Validação do número alternativo
    if (!/^9\d{8}$/.test(formData.contacto_alternativo)) {
      newErrors.contacto_alternativo =
        "O número alternativo deve começar com 9 e conter exatamente 9 dígitos.";
    }
    // Validação para números iguais
    if (formData.contacto === formData.contacto_alternativo) {
      newErrors.contacto_alternativo =
        "O número alternativo não pode ser igual ao número principal.";
    }
    // Validação do email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Insira um email válido.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Limpa o erro ao digitar
  };
  const handleFinalizarCompra = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const dadosCompra = {
      cliente: formData,
      local: local,
      produtos: carrinho
        .map((produto) => {
          if (!produto.id) {
            console.error("Produto sem ID:", produto);
            return null;
          }
          return {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade || 1,
          };
        })
        .filter(Boolean),
    };

    console.log("Dados de compra enviados:", dadosCompra);

    console.log("Carrinho:", carrinho);
    console.log("Form Data:", formData);

    Cookies.set("dadosCompra", JSON.stringify(dadosCompra), { expires: 1 });

    try {
      const response = await fetch(`/api/encomenda`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCompra),
      });

      if (!response.ok) {
        // Tente capturar a resposta do erro
        const errorText = await response.text();
        console.error("Erro da API:", errorText);
        setMensagem("Ocorreu um erro ao finalizar a compra.");
        return;
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json();
        console.log("Resposta da API:", responseData);
        setMensagem("Compra finalizada! Receberá os produtos em 24h.");
        Cookies.remove("carrinho");
        setTimeout(() => {
          router.push("/Fatura");
        }, 5000);
      } else {
        console.error("Erro: Resposta não é JSON");
        setMensagem("Ocorreu um erro ao finalizar a compra.");
      }
    } catch (error) {
      console.error("Erro de rede ou outro erro:", error);
      setMensagem("Ocorreu um erro ao tentar finalizar a compra.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-black rounded-lg p-6 w-full max-w-lg">
        <Image
          src="/image/bemtoc.png"
          width={200}
          height={100}
          className="mx-auto w-32 h-auto sm:w-40 md:w-48 lg:w-56"
          alt="Logo"
        />

        <h2 className="text-2xl font-bold text-center mb-5 text-blue-800">
          Informações do Comprador
        </h2>
        {mensagem && (
          <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg">
            {mensagem}
          </div>
        )}
        <form className="grid gap-4" onSubmit={handleFinalizarCompra}>
          <div>
            <label htmlFor="nome" className="text-blue-800">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Diga-nos o seu nome"
              className="p-2 border border-black rounded-full w-full text-black placeholder:text-gray-500"
            />
            {errors.nome && (
              <p className="text-red-500 text-sm">{errors.nome}</p>
            )}
          </div>

          <div>
            <label htmlFor="contacto" className="text-blue-800">
              Contacto
            </label>
            <input
              type="number"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              placeholder="Insira o seu número"
              className="p-2 border border-black rounded-full w-full text-black placeholder:text-gray-500"
            />
            {errors.contacto && (
              <p className="text-red-500 text-sm">{errors.contacto}</p>
            )}
          </div>

          <div>
            <label htmlFor="contacto_alternativo" className="text-blue-800">
              contacto alternativo
            </label>
            <input
              type="number"
              name="contacto_alternativo"
              value={formData.contacto_alternativo}
              onChange={handleChange}
              placeholder="Insira o seu número alternativo"
              className="p-2 border border-black rounded-full w-full text-black placeholder:text-gray-500"
            />
            {errors.contacto_alternativo && (
              <p className="text-red-500 text-sm">
                {errors.contacto_alternativo}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-blue-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Insira o seu email"
              className="p-2 border border-black rounded-full w-full text-black placeholder:text-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-600 p-2 text-white rounded-full mt-4 w-full text-base"
          >
            Finalizar a compra
          </button>
        </form>
      </div>
    </div>
  );
}
