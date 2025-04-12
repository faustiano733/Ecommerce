import { NextResponse } from "next/server.js"
import { pegarProdutosCategoria, pegarTodasCategorias } from "@services/categoriaServices.js"

export async function GET(req) {
    try {
        if (!req?.nextUrl) {
            return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
          }
        const parametro_categoria = req.nextUrl.searchParams.get("categoria")
        
        const resposta = parametro_categoria
            ? await pegarProdutosCategoria(parametro_categoria)
            : await pegarTodasCategorias()

        return NextResponse.json(resposta)
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao processar requisição" },
            { status: 500 }
        )
    }
}