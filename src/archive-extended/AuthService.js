/** Extended TODO:
 * if ORM implemented, move all auth-related service here instead of in UserService
 */

import { USER_DATA } from "../models/UserData.js";

// TODO: for all handler, handle using try-catch for any query results
const registerUser = (newUser) => {
  return USER_DATA.push(newUser); // TODO: DON'T FORGET TO INSERT TO DB (OR JUST SYNCHRONIZE ORM TO DB WHENEVER TRIGGER TAKEN)
};

const queryUserByName = (name) => {
  // HATI-HATI MIGRASI ID TYPE
  return USER_DATA.find((user) => user.name === name);
};

export { registerUser, queryUserByName };
