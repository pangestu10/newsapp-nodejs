require('dotenv').config();
const db = require('./models'); // Impor models untuk sinkronisasi
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Sinkronisasi database dan jalankan server
db.sequelize.sync({ alter: true }).then(() => { // `alter: true` akan memperbarui tabel jika ada perubahan di model
  console.log('Database synchronized!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});