import db from "./helpers/connection.js";

export const categorias = db.sequelize.define("categorias",{
    nome:{
        type:db.Sequelize.STRING
    }
    },{
    timestamps:false

});