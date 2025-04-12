import { categorias } from "../db/models/categorias.js";
import { produtos } from "../db/models/produtos.js";

export async function pegarProdutosCategoria(categoria_nome){
    const categoria = await categorias.findOne({
        where:{
            nome:categoria_nome
        }
    })
    const lista_produtos = await produtos.findAll({
        where:{
            categoria:categoria.id
        },
        attributes:{
            exclude:["categoria","id","stock"]
        }
    })

    return lista_produtos;
}

export const getCategoriaByName = async (name)=>{
    return await categorias.findOne({where:{name}})
}

export async function pegarTodasCategorias(){
    const lista_categorias = await categorias.findAll({attributes:{exclude:["id"]}})
    return lista_categorias
}

//const teste = await pegarTodasCategorias()
//
//console.log(teste)