const express = require('express');
const expressLayout = require('express-ejs-layouts');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// use postgres db
const { pool } = require('./postgres-db.js');

const app = express();

const { 
    checkInput, addContact, updateContact, deleteContact,
} = require('./handler.js');

const {
    appName, author, dirPath, dataPath
} = require('./constVar.js');

let invalidMessages = [];

// load environment variables from .env file
dotenv.config();
// to jsonify query (on db) response, by res.json(<query-result>)
app.use(express.json());    // req.body

app.use(express.static('public'));
app.use(morgan('dev')); // check & debug logging in development

app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', 'layouts/layout');

app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', (req, res) => {
    res.status(200);
    res.render('index', {
        title: `Homepage - ${appName}`,
        author,

    });
});

// Page not found: 404
app.use('/', (req, res) => {
    res.status(404);
    res.render('not-found', {
        title: `Page Not Found`,
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// beberapa contoh crud routing

// // Create a new contact
// // BERES: rendering ga auto refresh db, ada 2 opsi
// app.post('/contact/create', async (req, res) => {
//     const newContact = {
//         name: req.body.name,
//         mobile: req.body.mobile,
//         email: req.body.email,
//     }
//     // load contacts
//     let contacts = await pool.query('SELECT * FROM contacts;');
//     invalidMessages = checkInput(contacts.rows, ...Object.values(newContact));
//     let oldInput = newContact;
//     if (invalidMessages.length == 0) {
//         try {
//             // need function to arrayify an object
//             const newContactArray = Object.values(newContact);
//             await pool.query('INSERT INTO contacts (name, mobile, email) VALUES ($1, $2, $3)', newContactArray);
//             oldInput = {
//                 name: '',
//                 mobile: '',
//                 email: '',
//             };
//             // opsi 1: load contacts lagi
//             // contacts = await pool.query('SELECT * FROM contacts;');
//             // opsi 2: push newContact object lgsg ke contacts.rows
//             contacts.rows.push(newContact);
//             res.status(200);
//         } catch (err) {
//             console.error(err);
//             res.status(400); // failed to add contact
//         }
//     } else {
//         res.status(400); // due to invalid input
//     }

//     // res.redirect('/contact');
//     res.render('contact', {
//         title: `Contact Page - ${appName}`,
//         contacts: contacts.rows,
//         invalidMessages,
//         input: oldInput,
//     });
// });

// // Update/Edit
// app.post('/detail/update/:name', async (req, res) => {
//     let oldName = req.params.name;
//     // guaranteed that contact is always found
//     const contacts = await pool.query('SELECT * FROM contacts');
//     const updatedContact = {
//         name: req.body.name,
//         mobile: req.body.mobile,
//         email: req.body.email,
//     }
//     invalidMessages = checkInput(contacts.rows, ...Object.values(updatedContact), update=true, oldName=oldName);
//     if (invalidMessages.length == 0) {
//         try {
//             const updatedContactArray = Object.values(updatedContact);
//             await pool.query('UPDATE contacts SET name=$1, mobile=$2, email=$3 WHERE name=$4', [...updatedContactArray, oldName]);
//             res.status(200);
//             res.redirect('/contact');
//         } catch (err) {
//             console.log(err);
//             res.status(404); // contact not found, failed to update contact
//         }
//     } else {
//         const contact = await pool.query('SELECT * FROM contacts WHERE name=$1', [oldName]);
//         res.status(400); // due to invalid input
//         res.render('detail', {
//             title: `Detail Page - ${appName}`,
//             contact,
//             invalidMessages,
//             input: updatedContact,
//         });
//     }
// });

// // Delete
// app.post('/contact/delete', async (req, res) => {
//     const nameToDelete = req.body.name;

//     try {
//         await pool.query('DELETE FROM contacts WHERE name=$1', [nameToDelete]);
//         res.status(200);
//     } catch (err) {
//         console.log(err);
//         res.status(404);
//     }
    
//     res.redirect('/contact');
// });

