import {produtos} from "../api/db/models/produtos.js"

const db_produtos = [
    {
        "nome": "Mini SoftBox",
        "descricao": "Mini Softbox Octogonal para Flash de 20cm",
        "categoria": 1,
        "preco": 8.200,
        "stock": 0
    },
    {
        "nome": "Mini SoftBox",
        "descricao": "Mini Softbox Octogonal para Flash 30cm",
        "categoria": 1,
        "preco": 11.000,
        "stock": 0
    },
    {
        "nome": "Mini SoftBox",
        "descricao": "Mini Softbox Octogonal para Flash 15x17cm",
        "categoria": 1,
        "preco": 17.000,
        "stock": 0
    },
    {
        "nome": "Produto D",
        "descricao": "Descrição do Produto D",
        "categoria": 4,
        "preco": 12.345,
        "stock": 0
    },
    {
        "nome": "Produto E",
        "descricao": "Descrição do Produto E",
        "categoria": 5,
        "preco": 99.999,
        "stock": 0
    }
]

const db_categorias = [
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
        "nome": "Tripé de Iluminação"
    },
    {
        "nome": "Bolsa e Mochila"
    },
    {
        "nome": "Acessórios"
    },
    {
        "nome": "Acessórios de Estudio"
    }
]

let taxa1 = 500
let taxa2 = 1.000
let taxa3 = 1.200
const db_locais = [
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