import { Sequelize } from "sequelize";
import pg from "pg";
import module from "mysql2";

let sequelize = null
if(process.env.NODE_ENV ==='production'){
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgress",
    dialectModule: pg,
    dialectOptions: {
      charset: "utf8",
    },
  });
}else if(process.env.NODE_ENV === 'development'){
  sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    dialect: "mysql",
    dialectModule: module,
    dialectOptions: {
      charset: "utf8",
    },
  });
}



const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

export default db;
