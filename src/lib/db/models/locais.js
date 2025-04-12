import db from "./helpers/connection.js";

export const locais = db.sequelize.define("locais",{
    nome:{
        type:db.Sequelize.STRING,
        allowNull:false
    },
    taxa:{
        type:db.Sequelize.DECIMAL(8,2),
        allowNull:false
    }
})