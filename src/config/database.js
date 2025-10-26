const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // Jalankan ini jika di production (Render)
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in production environment");
  }
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Diperlukan untuk Render
      },
    },
    logging: false, // Matikan logging di production
  });
} else {
  // Jalankan ini jika di development (local)
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
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }
  );
}

module.exports = sequelize;