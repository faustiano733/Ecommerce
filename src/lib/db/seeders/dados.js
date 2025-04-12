import { produtos } from "../models/produtos.js";
import { categorias } from "../models/categorias.js";
import { locais } from "../models/locais.js";

const lista_categorias = [
    {
        nome:"Modificadores de iluminação"//1
    },
    {
        nome:"Flash da Câmara"//2
    },
    {
        nome:"Disparadores"//3
    },
    {
        nome:"Acessorios"//4
    },
    {
        nome:"Tripe de Iluminação"//5
    },
    {
        nome:"Bolsa e Mochila"//6
    }
]

const lista_produtos = [
    {
        nome: "Alça dupla",
        descricao: "Alça dupla da Câmera SLR",
        categoria: 4,
        imagem: "/image/alca-dupla-da-camera-slr.png",
        preco: 16800.00,
        stock: 1
    },
    {
        nome: "Alça simples",
        descricao: "Alça simples da Câmera SLR",
        categoria: 4,
        imagem:"/image/alca-simples-da-camera-slr.png",
        preco: 10800.00,
        stock: 14
    },
    {
        nome: "Baliza de Fundo",
        descricao: "Baliza de Fundo de fotografia de 2*3CM",
        categoria: 4,
        imagem: "/image/baliza-de-fundo-de-fotografia-de-2x3cm.png",
        preco: 45500.00,
        stock: 0
    },
    {
        nome: "Bateria alcalina",
        descricao: "Bateria alcalina seca de 12V, 23A",
        categoria: 4,
        imagem: "/image/bateria-alcalina-seca-de-12v-23a.png",
        preco: 1250.00,
        stock: 0
    },
    {
        nome: "Bolsa fotográfica",
        descricao: "Bolsa fotográfica de câmera e acessórios resistente à água e choques",
        categoria: 6,
        imagem: "/image/bolsa-fotografica-de-camera-e-acessorios-resistente-a-agua-e-choques.png",
        preco: 10000.00,
        stock: 3
    },
    {
        nome: "Caneta de limpeza",
        descricao: "Caneta de limpeza dupla de lentes de fotografia",
        categoria: 4,
        imagem: "/image/caneta-de-limpeza-dupla-de-lentes-de-fotografia.png",
        preco: 4500.00,
        stock: 12
    },
    {
        nome: "Carregador de bateria",
        descricao: "Carregador de bateria duplo para canon LP-E6",
        categoria: 4,
        imagem: "/image/carregador-de-bateria-duplo-para-canon-lp-e6.png",
        preco: 15000.00,
        stock: 1
    },
    {
        nome: "Difusor Luvinha",
        descricao: "Difusor Luvinha Universal de Flash",
        categoria: 1,
        imagem: "/image/difusor-luvinha-universal-de-flash.png",
        preco: 4500.00,
        stock: 4
    },
    {
        nome: "Difusor Semi-transparente",
        descricao: "Difusor Semi-transparente rígido para speedlight da Godox/Triopo",
        categoria: 1,
        imagem: "/image/difusor-semi-transparente-rigido-para-speedlight-da-godox-triopo.png",
        preco: 4400.00,
        stock: 4
    },
    {
        nome: "Flash de câmera TT520II",
        descricao: "Flash de câmera da Godox TT520II",
        categoria: 2,
        imagem: "/image/flash-de-camera-da-godox-tt520ii.png",
        preco: 58600.00,
        stock: 11
    },
    {
        nome: "Flash de câmera TT600",
        descricao: "Flash de câmera da Godox TT600",
        categoria: 2,
        imagem: "/image/flash-de-camera-da-godox-tt600.png",
        preco: 74500.00,
        stock: 7
    },
    {
        nome: "Flash de câmera TT950II",
        descricao: "Flash de câmera da Triopo TT950II",
        categoria: 2,
        imagem: "/image/flash-de-camera-da-triopo-tt950ii.png",
        preco: 59800.00,
        stock: 7
    },
    {
        nome: "Grade de Softbox 120CM",
        descricao: "Grade de Softbox da Godox de 120CM Octógono",
        categoria: 1,
        imagem: "/image/grade-de-softbox-da-godox-de-120cm-octogono.png",
        preco: 15500.00,
        stock: 15
    },
    {
        nome: "Grade de Softbox 80CM",
        descricao: "Grade de Softbox da Godox de 80CM Octógono",
        categoria: 1,
        imagem: "/image/grade-de-softbox-da-godox-de-80cm-octogono.png",
        preco: 13500.00,
        stock: 15
    },
    {
        nome: "Filtro de Flash (12 Cores)",
        descricao: "Kit de Filtro de Flash (12 Cores)",
        categoria: 1,
        imagem: "/image/kit-de-filtro-de-flash-12-cores.png",
        preco: 4100.00,
        stock: 30
    },
    {
        nome: "Filtro de Flash (Multicolor)",
        descricao: "Kit de Filtro de Flash (Multicolor)",
        categoria: 1,
        imagem: "/image/kit-de-filtro-de-flash-multicolor.png",
        preco: 4300.00,
        stock: 24
    },
    {
        nome: "Lente Yongnuo",
        descricao: "Lente Yongnuo ef 50 mm 1.8 de Canon",
        categoria: 2,
        imagem: "/image/lente-yongnuo-ef-50mm-1-8-de-canon.png",
        preco: 90500.00,
        stock: 0
    },
    {
        nome: "Mini Softbox 20 CM",
        descricao: "Mini Softbox Octogonal para flash de 20 CM",
        categoria: 1,
        imagem: "/image/mini-softbox-octogonal-para-flash-de-20cm.png",
        preco: 8200.00,
        stock: 20
    },
    {
        nome: "Mini Softbox 30 CM",
        descricao: "Mini Softbox Octogonal para flash de 30 CM",
        categoria: 1,
        imagem: "/image/mini-softbox-octogonal-para-flash-de-30cm.png",
        preco: 11000.00,
        stock: 8
    },
    {
        nome: "Mini Softbox 15*17cm",
        descricao: "Mini Softbox Quadrada para flash de 15*17cm",
        categoria: 1,
        imagem: "/image/mini-softbox-quadrada-para-flash-de-15x17cm.png",
        preco: 7000.00,
        stock: 15
    },
    {
        nome: "Mochila Fotográfica",
        descricao: "Mochila Fotográfica multifuncional resistente à água",
        categoria: 6,
        imagem: "/image/mochila-fotografica-multifuncional-resistente-a-agua.png",
        preco: 19600.00,
        stock: 5
    },
    {
        nome: "Mochila Fotográfica da Puluz",
        descricao: "Mochila Fotográfica da Puluz",
        categoria: 6,
        imagem: "/image/mochila-fotografica-da-puluz.png",
        preco: 29800.00,
        stock: 15
    },
    {
        nome: "Mola",
        descricao: "Mola",
        categoria: 4,
        imagem: "/image/mola.png",
        preco: 2500.00,
        stock: 20
    },
    {
        nome: "Pano de fundo",
        descricao: "Pano de fundo de Algodão para estúdio",
        categoria: 4,
        imagem: "/image/pano-de-fundo-de-algodao-para-estudio.png",
        preco: 44500.00,
        stock: 0
    },
    {
        nome: "Parassol HB-47",
        descricao: "Parassol HB-47",
        categoria: 1,
        imagem: "/image/parassol-hb-47.png",
        preco: 6500.00,
        stock: 3
    },
    {
        nome: "Rádio Flash Xpro-C",
        descricao: "Rádio Flash Godox Xpro-C",
        categoria: 3,
        imagem: "/image/radio-flash-godox-xpro-c.png",
        preco: 67500.00,
        stock: 1
    },
    {
        nome: "Rádio Flash X2T-C",
        descricao: "Rádio Flash Godox X2T-C",
        categoria: 3,
        imagem: "/image/radio-flash-godox-x2t-c.png",
        preco: 52500.00,
        stock: 0
    },
    {
        nome: "Rádio flash AT-16",
        descricao: "Rádio flash AT-16",
        categoria: 3,
        imagem: "/image/radio-flash-at-16.png",
        preco: 20500.00,
        stock: 0
    },
    {
        nome: "Rádio flash Godox CT-16",
        descricao: "Rádio flash universal Godox CT-16",
        categoria: 3,
        imagem: "/image/radio-flash-universal-godox-ct-16.png",
        preco: 24500.00,
        stock: 0
    },
    {
        nome: "Reflector de flash",
        descricao: "Reflector de flash para câmera (Pala)",
        categoria: 1,
        imagem: "/image/reflector-de-flash-para-camera-pala.png",
        preco: 4600.00,
        stock: 0
    },
    {
        nome: "Refletor 5 em 1 (110CM)",
        descricao: "Refletor 5 em 1 (110CM)",
        categoria: 1,
        imagem: "/image/refletor-5-em-1-110cm.png",
        preco: 28500.00,
        stock: 5
    },
    {
        nome: "Refletor 5 em 1 (80*120CM)",
        descricao: "Refletor 5 em 1 (80*120CM)",
        categoria: 1,
        imagem: "/image/refletor-5-em-1-80x120cm.png",
        preco: 32500.00,
        stock: 0
    },
    {
        nome: "Softbox de 120CM",
        descricao: "Softbox da Godox de 120CM Octógono",
        categoria: 1,
        imagem: "/image/softbox-da-godox-de-120cm-octogono.png",
        preco: 51500.00,
        stock: 1
    },
    {
        nome: "Softbox de 80CM",
        descricao: "Softbox da Godox de 80CM Octógono",
        categoria: 1,
        imagem: "/image/softbox-da-godox-de-80cm-octogono.png",
        preco: 33500.00,
        stock: 0
    },
    {
        nome: "Softbox de 80*80CM",
        descricao: "Softbox da Godox de 80*80CM Quadrada",
        categoria: 1,
        imagem: "/image/softbox-da-godox-de-80x80cm-quadrada.png",
        preco: 57500.00,
        stock: 0
    },
    {
        nome: "Softbox 90CM",
        descricao: "Softbox da Triopo de 90CM Octógono",
        categoria: 1,
        imagem: "/image/softbox-da-triopo-de-90cm-octogono.png",
        preco: 64500.00,
        stock: 0
    },
    {
        nome: "Sombrinha reflectora",
        descricao: "Sombrinha reflectora 83CM dourada",
        categoria: 1,
        imagem: "/image/sombrinha-reflectora-83cm.png",
        preco: 9000.00,
        stock: 7
    },
    {
        nome: "Sombrinha reflectora",
        descricao: "Sombrinha reflectora 83CM prateada",
        categoria: 1,
        imagem: "/image/sombrinha-reflectora-83cm.png",
        preco: 9000.00,
        stock: 3
    },
    {
        nome: "Suporte da Softbox 90CM",
        descricao: "Suporte da Softbox da Triopo de 90CM Óctogono",
        categoria: 5,
        imagem: "/image/suporte-da-softbox-da-triopo-de-90cm-octogono.png",
        preco: 25000.00,
        stock: 1
    },
    {
        nome: "Suporte de Lâmpada",
        descricao: "Suporte de Lâmpada de Luz Contínua Tipo E27",
        categoria: 5,
        imagem: "/image/suporte-de-lampada-de-luz-continua-tipo-e27.png",
        preco: 6000.00,
        stock: 12
    },
    {
        nome: "Suporte Tipo E",
        descricao: "Suporte Metálico do Tipo E",
        categoria: 4,
        imagem: "/image/suporte-metalico-do-tipo-e.png",
        preco: 11000.00,
        stock: 0
    },
    {
        nome: "Suporte Tipo B",
        descricao: "Suporte Tipo B",
        categoria: 4,
        imagem: "/image/suporte-tipo-b.png",
        preco: 8600.00,
        stock: 2
    },
    {
        nome: "Suporte Tipo S",
        descricao: "Suporte Tipo S",
        categoria: 4,
        imagem: "/image/suporte-tipo-s.png",
        preco: 20400.00,
        stock: 2
    },
    {
        nome: "Suporte pilhas",
        descricao: "Suporte transparente para 4 pilhas",
        categoria: 4,
        imagem: "/image/suporte-transparente-para-4-pilhas.png",
        preco: 2000.00,
        stock: 17
    },
    {
        nome: "Tripé de Aço Inoxidável",
        descricao: "Tripé de Aço Inoxidável de 2,8M",
        categoria: 5,
        imagem: "/image/tripe-de-aco-inoxidavel-de-2-8m.png",
        preco: 49500.00,
        stock: 10
    },
    {
        nome: "Tripé de Alumínio Dobrável",
        descricao: "Tripé de Alumínio Dobrável de 2,1M",
        categoria: 5,
        imagem: "/image/tripe-de-aluminio-dobravel-de-2-1m.png",
        preco: 19500.00,
        stock: 25
    },
    {
        nome: "Tripé Stand",
        descricao: "Tripé Stand para Vídeos e Streaming de 1,1M",
        categoria: 5,
        imagem: "/image/tripe-stand-para-videos-e-streaming-de-1-1m.png",
        preco: 15500.00,
        stock: 19
    }
];

const lista_locais = [
    
    { nome: "Escritorio", taxa: 0.00 },
    { nome: "Gamek á direita", taxa: 500.00 },
    { nome: "Corimba nas cadeira", taxa: 500.00 },
    { nome: "Morro Bento", taxa: 800.00 },
    { nome: "Samba", taxa: 1000.00 },
    { nome: "Zamba 2", taxa: 1000.00 },
    { nome: "Bairro Azul", taxa: 1000.00 },
    { nome: "Martéris", taxa: 1000.00 },
    { nome: "Cassenda", taxa: 1000.00 },
    { nome: "Rocha", taxa: 1000.00 },
    { nome: "Aeroporto", taxa: 1000.00 },
    { nome: "Nova Vida", taxa: 1000.00 },
    { nome: "Benfica", taxa: 1000.00 },
    { nome: "Rotunda da Fubu", taxa: 1000.00 },
    { nome: "Danjarré", taxa: 1000.00 },
    { nome: "Mutamba", taxa: 1200.00 },
    { nome: "Maianga", taxa: 1200.00 },
    { nome: "Prenda", taxa: 1200.00 },
    { nome: "Mercado do scongolenses", taxa: 1200.00 },
    { nome: "Bairro Popular", taxa: 1200.00 },
    { nome: "Cassequel", taxa: 1200.00 },
    { nome: "Golf 2", taxa: 1200.00 },
    { nome: "Maianga", taxa: 1200.00 },
    { nome: "Vila do Gamek", taxa: 1200.00 },
    { nome: "Futungo", taxa: 1200.00 },
    { nome: "Talatona", taxa: 1200.00 },
    { nome: "Ilha de Luanda", taxa: 1500.00 },
    { nome: "Maculusso", taxa: 1500.00 },
    { nome: "Kilamba", taxa: 1500.00 },
    { nome: "Kinaxixi", taxa: 1500.00 },
    { nome: "São Paulo", taxa: 1500.00 },
    { nome: "Palanca", taxa: 1500.00 },
    { nome: "Camama", taxa: 1500.00 },
    { nome: "Calemba 2", taxa: 1500.00 },
    { nome: "Ramiros", taxa: 2000.00 },
    { nome: "Luanda Sul", taxa: 2000.00 },
    { nome: "Sanbizanga", taxa: 2000.00 },
    { nome: "Hoji-ha-henda", taxa: 2000.00 },
    { nome: "Vila de Viana", taxa: 2000.00 },
    { nome: "Zona verde", taxa: 2000.00 },
    { nome: "Disvio do Zango", taxa: 2000.00 },
    { nome: "Vila do Cacuaco", taxa: 2000.00 },
    { nome: "Ponte do 25", taxa: 2500.00 },
    { nome: "Zango 1,2 e 3", taxa: 2500.00 },
    { nome: "Trinta", taxa: 2500.00 }
    ];

async function semear(model, lista){
    await lista.map(async (objecto)=>{
        await model.create({...objecto,nome:objecto.nome.toUpperCase()})
    })
}


await semear(categorias, lista_categorias)
await semear(produtos,lista_produtos)
await semear (locais, lista_locais)
