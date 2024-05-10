// ORM Models for User by querying postgres
import * as table from "../models/postgres-db.js";
const { pool } = require('./postgres-db.js');

const bcrypt = require("bcrypt");
let dummyHashedPassword = bcrypt.hash("admin", 10);

let id = 0;
let USER_DATA = [
    { id: id, name: "admin", password: dummyHashedPassword },
];