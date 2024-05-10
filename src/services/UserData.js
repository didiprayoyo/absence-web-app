// ORM Models for User by querying postgres
import * as table from "../models/postgres-db.js";
const { pool } = require('./postgres-db.js');

const bcrypt = require("bcrypt");
let dummyHashedPassword = bcrypt.hash("admin", 10);

let id = 3;
let USER_DATA = [
    { id: 0, name: "admin", password: dummyHashedPassword, role: "admin" },
    { id: 1, name: 'Kyle', password: dummyHashedPassword, role: ROLE.ADMIN },
    { id: 2, name: 'Sally', password: bcrypt.hash("user", 10), role: ROLE.BASIC },
    { id: 3, name: 'Joe', password: bcrypt.hash("user", 10), role: ROLE.BASIC }
];

const ROLE = {
    ADMIN: 'admin',
    USER: 'user'
};

const PROJECTS = [
    { id: 1, name: "Kyle's Project", userId: 1 },
    { id: 2, name: "Sally's Project", userId: 2 },
    { id: 3, name: "Joe's Project", userId: 3 }
];

module.exports = {
    ROLE,
    USER_DATA,
    PROJECTS, 
};