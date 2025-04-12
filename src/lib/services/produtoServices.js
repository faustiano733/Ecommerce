import { produtos } from "../db/models/produtos.js";
import { Op } from "sequelize";

export async function pegarTodosProdutos() {
  const lista_produtos = await produtos.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return lista_produtos;
}

export async function pegarProduto(produto_nome) {
  const produto_encontrado = await produtos.findOne({
    where: {
      nome: produto_nome,
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  return produto_encontrado;
}

export const getProducts = async ({ page = 1, limit = 10, categoria, nome } = {}) => {
  try {
    // Montar filtros dinamicamente
    const where = {};

    if (categoria) {
      where.categoria = categoria;
    }

    if (nome) {
      where.nome = { [Op.like]: `%${nome}%` }; // busca aproximada
    }

    const offset = (page - 1) * limit;

    const result = await produtos.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]], // opcional: ordena do mais novo para o mais antigo
    });

    return {
      data: result.rows,
      total: result.count,
      currentPage: page,
      totalPages: Math.ceil(result.count / limit),
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Erro ao buscar produtos");
  }
};