import db from "./helpers/connection.js";

export const clientes = db.sequelize.define("clientes",{
    nome:{
        type:db.Sequelize.STRING
    },
    email:{
        type:db.Sequelize.STRING
    },
    contacto:{
        type:db.Sequelize.STRING
    },
    contacto_alternativo:{
        type:db.Sequelize.STRING
    }
})