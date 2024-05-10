import { USER_DATA } from "./UserData.js";

// TO DO: for all handler, handle using try-catch for any query results
const registerUser = (newUser) => {
    return USER_DATA.push(newUser); // TO DO: DON'T FORGET TO INSERT TO DB (OR JUST SYNCHRONIZE ORM TO DB WHENEVER TRIGGER TAKEN)
};

const queryUserByName = (name) => {
    // HATI-HATI MIGRASI ID TYPE
    return USER_DATA.find((user) => user.name === name);
}

export {
    registerUser, queryUserByName,
};