import { NextResponse } from "next/server.js";
import {
  pegarProduto,
  pegarTodosProdutos,
} from "@services/produtoServices";

export async function GET(request) {
  try {
    if (!request?.nextUrl) {
      return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
    }

    const parametro_produto = request.nextUrl.searchParams.get("p");

    const resposta = parametro_produto
      ? await pegarProduto(parametro_produto)
      : await pegarTodosProdutos();

    return NextResponse.json(resposta);
  } catch (error) {
    console.error("Erro em /api/produtos:", error);
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 });
  }
}

