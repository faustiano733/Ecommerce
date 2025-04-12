import db from "./helpers/connection.js";

export const encomendas = db.sequelize.define("encomendas",{
    referencia:{
        type:db.Sequelize.STRING
    },
    id_cliente:{
        type:db.Sequelize.INTEGER,
        allowNull:false
    },
    id_local:{
        type:db.Sequelize.INTEGER,
        defaultValue:1
    },
    estado:{
        type:db.Sequelize.ENUM,
        values:["Pendente","Concluida"]
    },
    total:{
        type:db.Sequelize.DECIMAL(6,3)
    }
})