import db from "./helpers/connection.js";

export const produtos = db.sequelize.define("produtos",{
    nome:{
        type:db.Sequelize.STRING
    },
    descricao:{
        type:db.Sequelize.STRING
    },
    categoria:{
        type:db.Sequelize.INTEGER
    },
    imagem:{
        type:db.Sequelize.STRING
    }
    ,
    preco:{
        type:db.Sequelize.DECIMAL(8,2)
    },
    stock:{
        type:db.Sequelize.INTEGER(3)
    }
},{
    timestamps:false
})