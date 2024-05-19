import React from "react";

const Admin = () => {
    const [users, setUsers] = useState({});
    const [userLogs, setUserLogs] = useState([]);

    // just access 1x after login success
    useEffect(async () => {
        const getAllUsers = await attendanceAPI.get("/users");
        setUsers(getAllUsers);

        const getUserLogs = await attendanceAPI.get("/user-logs");
        setUserLogs(getUserLogs);
    }, []);

    const handleSubmit = (event) => {
        const name = event.input.name.value;
        const department = event.input.department.value;
        const job = event.input.job.value;

        setBiodata({ ...biodata, name, department, job });
        // if there is a change
        attendanceAPI.put("/user/:userId", { // insert into
            body: biodata, 
        });
    };

    return (
        <>
            {/* complete/edit biodata: COPAST USER OR CREATE CARD COMPONENT */}

            {/* show user picture, auto fill (diffs: user & admin): COPAST USER */}
            {/* upload new picture */}
            
            {/* show biodata detail: name, department, job role: COPAST USER OR CREATE CARD COMPONENT */}

            {/* delete account & logout: COPAST USER OR CREATE BUTTON COMPONENT */}

            {/* see all user (not admin) */}
            <ol>
                {users.forEach((user) => {
                    <ul>
                        {user.map((key, value) => {
                            <li>{key}: {value}</li>
                        })}
                    </ul>
                })}
            </ol>

            {/* log for all user, including admin */}
            <ol>
                {userLogs.forEach((log) => {
                    <ul>
                        {log.map((key, value) => {
                            <li>{key}: {value}</li>
                        })}
                    </ul>
                })}
            </ol>
        </>
    )
}

export default Admin;