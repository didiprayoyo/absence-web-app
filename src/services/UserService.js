import { USER_DATA } from "./UserData.js";

// TO DO: for all handler, handle using try-catch for any query results
const queryListOfUsers = () => {
    return USER_DATA;
};

const queryUserById = (id) => {
    // HATI-HATI MIGRASI ID TYPE
    const user = USER_DATA.find((userData) => Number(userData.id) === Number(id))
    // let user;
    // pakai find aja
    // USER_DATA.forEach((userData) => {
    //     if (userData.id == id) {
    //         user = userData;
    //     }
    // });
    return user;
}

const deleteUserById = () => {
    USER_DATA.filter((user) => {
        return user.id !== Number(id); // HATI-HATI MIGRASI ID TYPE
    });
};

export {
    queryListOfUsers,
    queryUserById,
    deleteUserById,
};