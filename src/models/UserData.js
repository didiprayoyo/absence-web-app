// extended TODO: ORM Models for User by querying postgres

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

// Extended TODO: projects CRUD
// const PROJECTS = [
//     { id: 1, name: "Kyle's Project", userId: 1 },
//     { id: 2, name: "Sally's Project", userId: 2 },
//     { id: 3, name: "Joe's Project", userId: 3 }
// ];

module.exports = {
    ROLE,
    STATUS,
};