import { Sequelize } from "sequelize";
import pg from "pg";
import module from "mysql2";

const sequelize  = new Sequelize(process.env.DATABASE_URL, {
    dialect: process.env.DATABASE_DIALECT,
    dialectModule: module,
    dialectOptions: {
      charset: "utf8",
    },
  });


const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

export default db;
