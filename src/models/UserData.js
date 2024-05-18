// extended TODO: ORM Models for User by querying postgres
const { pool } = require('./postgres-db.js');

const bcrypt = require("bcrypt");

// Integer-coded
// For user authorization TODO: soft delete CRUD by *admin
const ROLE = ["superadmin", "admin", "employee"];
// For attendance status
const STATUS = ["start", "in", "late", "remote/sick", "out", "no_desc"];
// For App Logs, try using .txt/sheets/csv for different various db
// const DESC = {
//     CREATE: "created",
//     UPDATE: "updated", // or edit
//     DELETE: "deleted",
// };

const USER_DATA = [
    { id: 0, username: "admin", password: dummyHashedPassword, role: "admin" },
    { id: 1, username: 'Kyle', password: dummyHashedPassword, role: ROLE.ADMIN },
    { id: 2, username: 'Sally', password: bcrypt.hash("user", 10), role: ROLE.BASIC },
    { id: 3, username: 'Joe', password: bcrypt.hash("user", 10), role: ROLE.BASIC }
];

const USER_LOG = [
    {id: 0, userId: 0, datetime: new Date(), desc: {
        detail: DESC.CREATE,
        userId: 0,
    }},
    {id: 0, userId: 0, datetime: new Date(), desc: {
        detail: DESC.CREATE,
        userId: 1,
    }},
    {id: 0, userId: 0, datetime: new Date(), desc: {
        detail: DESC.UPDATE,
        userId: 1,
        before: { id: 1, username: 'kyle-before', password: dummyHashedPassword, role: ROLE.ADMIN },
        after: { id: 1, username: 'Kyle', password: dummyHashedPassword, role: ROLE.ADMIN },

    }},
    {id: 0, userId: 0, datetime: new Date(), desc: {
        detail: DESC.DELETE,
        userId: 3,
    }},
];

const ATTENDANCE_LOG = [
    {id: 0, userId: 2, datetime: new Date(), mode: "in_late"},
    {id: 0, userId: 2, datetime: new Date(), mode: "out_lembur"}
];

// Extended TODO: projects CRUD
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