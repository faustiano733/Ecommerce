import { produtos } from "./models/produtos.js";
import { locais } from "./models/locais.js";
import { encomenda_item } from "./models/encomendaItem.js";
import { encomendas } from "./models/encomenda.js";
import { clientes } from "./models/clientes.js";
import { categorias } from "./models/categorias.js";
import db from "./models/helpers/connection.js";


const teste_produtos = [
    {
        "nome": "Produto A",
        "descricao": "Descrição do Produto A",
        "categoria": 1,
        "preco": 25.500,
        "stock": 100
    },
    {
        "nome": "Produto B",
        "descricao": "Descrição do Produto B",
        "categoria": 2,
        "preco": 15.750,
        "stock": 50
    },
    {
        "nome": "Produto C",
        "descricao": "Descrição do Produto C",
        "categoria": 3,
        "preco": 45.200,
        "stock": 30
    },
    {
        "nome": "Produto D",
        "descricao": "Descrição do Produto D",
        "categoria": 4,
        "preco": 12.345,
        "stock": 20
    },
    {
        "nome": "Produto E",
        "descricao": "Descrição do Produto E",
        "categoria": 5,
        "preco": 99.999,
        "stock": 5
    }
]

const teste_categorias = [
    {
        "nome": "Modificadores de iluminação"
    },
    {
        "nome": "Lente de câmera"
    },
    {
        "nome": "Flash de câmera"
    },
    {
        "nome": "Disparadores"
    },
    {
        "nome": "Acessórios"
    }
]

const teste_locais = [
    {
        "nome": "Luanda",
        "taxa": 15.000
    },
    {
        "nome": "Benguela",
        "taxa": 10.500
    },
    {
        "nome": "Huambo",
        "taxa": 8.250
    },
    {
        "nome": "Lubango",
        "taxa": 12.000
    },
    {
        "nome": "Cabinda",
        "taxa": 20.750
    }
]


const {sequelize, Sequelize} = db

async function dadosTeste(){
    await Promise.all([
        teste_produtos.map(async produto=>{
            produtos.create(produto)
        }),
        teste_categorias.map(async categoria=>{
            categorias.create(categoria)
        }),
        teste_locais.map(async local=>{
            locais.create(local)
        })
    
    ])
}


await sequelize.sync()

//await dadosTeste()

//sequelize.drop()