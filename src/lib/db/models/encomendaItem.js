import db from "./helpers/connection.js";

export const encomenda_item = db.sequelize.define("encomenda_item",{
    quantidade:{
        type:db.Sequelize.INTEGER,
        allowNull:false
    },
    id_produto:{
        type:db.Sequelize.INTEGER,
        alloNull:false
    },
    id_encomenda:{
        type:db.Sequelize.INTEGER,
        allowNull:false
    }
},{
    timestamps:false
})