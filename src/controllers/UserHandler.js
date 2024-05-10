import {
    queryListOfUsers, queryUserById,
} from "../services/UserService.js";

// TO DO: for all handler, handle using try-catch for any response cases
const getAllUsers = (req, res) => {
    const userList = queryListOfUsers();
    
    // check log response to react axios
    return res.json(userList);
};

const getUser = (req, res) => {
    const userId = req.params.id; // passing param from axios.get
    const userData = queryUserById(userId);

    return res.json(userData);
};

export {
    getAllUsers, getUser
};