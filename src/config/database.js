const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // TAMBAHKAN BARIS INI UNTUK DEBUGGING
  console.log("DATABASE_URL from env:", process.env.DATABASE_URL);

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  // ... (blok development tidak berubah)
  require('dotenv').config();
  if (!process.env.DB_DIALECT) {
    throw new Error("DB_DIALECT is not set in .env file");
  }
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      logging: false,
    }
  );
}

module.exports = sequelize;