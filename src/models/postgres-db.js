// use postgres db
const { Pool } = require('pg');
const dotenv = require('dotenv');

// load environment variables from .env file
dotenv.config();

// create a new postgres pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// connect to the database
pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database!');
    }).catch((err) => {
        console.log(`'Error connecting to PostgreSQL database: ${err}`);
});
    
module.exports = { pool };

// CONTOH QUERY
// const contacts = [
//     ['Naruto', '08123456789', 'naruto@gmail.com'],
//     ['Sasuke', '0898765432', 'sasuke@gmail.com'],
//     ['Sakura', '08123456789', 'sakura@gmail.com']
// ];

// // Add data
// const addContact = (newContact) => {
//     return new Promise((resolve, reject) => {
//         pool.query('INSERT INTO contacts (name, mobile, email) VALUES ($1, $2, $3)', [...newContact])
//             .then(() => {
//                 console.log('Data inserted successfully.');
//                 resolve(); // untuk res.json() => tampilkan data inserted successfully
//             })
//             .catch((err) => {
//                 console.error('Error inserting data:', err);
//                 reject(false);
//             });
//     });
// }

// app.get('/addAsync', async (req, res) => {
//     // kalau ga async, butuh next param biar ga nyangkut
//     try {
//         // pool.query('DELETE FROM contacts;')
//         const cont = ['boruto', '0812345678', 'boruto@gmail.com']
//         const newContact = await pool.query(
//             `INSERT INTO contacts (name, mobile, email) VALUES ($1, $2, $3) RETURNING *;`, cont
//         );
//         res.json(newContact);
//     } catch (err) {
//         console.error(err.message);
//     } 
// });