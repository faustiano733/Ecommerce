import { encomendas } from "../db/models/encomenda.js";
import { encomenda_item } from "../db/models/encomendaItem.js";
import { clientes } from "../db/models/clientes.js";
import { locais } from "../db/models/locais.js";
import { produtos } from "../db/models/produtos.js";


export async function criarEncomenda(produtos_encomenda,novo_cliente, local_encomenda){
    
    const cliente = await criarCliente(novo_cliente); 
    console.log(local_encomenda)
    const local_entrega = await locais.findOne({
        where:{
            nome:(!local_encomenda&&"ESCRITORIO")
        }
    })
    console.log(local_entrega)
    const referencia = gerarReferencia(cliente)

    let total_compras = await calcularTotal(produtos_encomenda)
    total_compras = parseFloat(total_compras) + parseFloat(local_entrega.taxa)

    const nova_encomenda = await encomendas.create({
        referencia:referencia,
        id_local:local_entrega.id,
        total:total_compras,
        id_cliente:cliente.id,
        estado:"Pendente"
    })

    await Promise.all(produtos_encomenda.map(async (produto)=>{
        
        let produto_db = await produtos.findByPk(produto.id)
        
        let novo_stock = produto_db.stock - produto.quantidade
        
        await produtos.update({stock:novo_stock},{where:{
            nome:produto.nome,
            id:produto.id
        }})

        await encomenda_item.create({id_produto:produto.id,quantidade:produto.quantidade,id_encomenda:nova_encomenda.id})
    }))

    const fatura = await gerarFatura(nova_encomenda, produtos_encomenda)

    return fatura

}

async function gerarFatura(encomenda, produtos){
    
    const cliente = await clientes.findByPk(encomenda.id_cliente,{
        attributes:{exclude:"id"}
    })

    const data = `${encomenda.createdAt.getDate()}-${encomenda.createdAt.getMonth() + 1}-${encomenda.createdAt.getFullYear()}`
    const local = await locais.findByPk(encomenda.id_local,{
        attributes:{exclude:["id","createdAt", "updatedAt"]}
    })
    let fatura = {referencia:encomenda.referencia, cliente:cliente,produtos:produtos, total:encomenda.total, local:local,data:data}

    return fatura
}

async function criarCliente(novo_cliente){

    const cliente_criado = await clientes.create(novo_cliente)
    return cliente_criado

}

function gerarReferencia(cliente){

    
    const data_criacao_cliente = cliente.createdAt

    const referencia_gerada = `ENC-${data_criacao_cliente.getMonth()}${data_criacao_cliente.getYear()}${data_criacao_cliente.getDate()}${data_criacao_cliente.getSeconds()}-${cliente.nome[0].toUpperCase()}${cliente.nome[cliente.nome.length - 1].toUpperCase()}`

    return referencia_gerada
}

async function calcularTotal(lista_produtos){

    const total = lista_produtos.reduce((soma, produto)=>{
        return soma+(produto.preco * produto.quantidade)
    },0)
    return total.toFixed(3)

}

const produtos_encomenda = [
    {
        id: 1, // ID do produto existente na tabela
        nome: "BATERIA ALCALINA",
        quantidade: 2,
        preco: 1250.00
    },
    {
        id: 43, // ID do produto existente na tabela
        nome: "SUPORTE PILHAS",
        quantidade: 1,
        preco: 2000.00
    }
];


//const cliente = await clientes.findByPk(3)
//
//const referencia = gerarReferencia(cliente)
//
//console.log(referencia)

const novo_cliente = {
    nome: "Nataniel Hebo",
    email: "natanielhebo863@gmail.com",
    contacto: "923123456",
    contacto_alternativo: "912654789"
};

const local_encomenda = "KILAMBA";
//(async () => {
//    try {
//        const encomendaCriada = await criarEncomenda(produtos_encomenda, novo_cliente, local_encomenda);
//        console.log("Encomenda criada com sucesso:", encomendaCriada);
//    } catch (error) {
//        console.error("Erro ao criar encomenda:", error);
//    }
//})();

 //# Teste da função calcular Total

//(  
//    async ()=>{
//        try{
//            const total = await calcularTotal(produtos_encomenda)
//            console.log(typeof total)
//        }catch(error){
//            console.log("Alguma coisa correu mal")
//            console.log(error)
//        }
//    }
//)()

