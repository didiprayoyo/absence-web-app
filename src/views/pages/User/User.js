import React, { useState, useEffect } from "react";
import axios from axios;

import attendanceAPI from "../../expressAPI/attendanceAPI";
const loginId = 1;

const User = () => {
    const [biodata, setBiodata] = useState({});
    const [userLog, setUserLog] = useState([]);

    // just access 1x after login success
    // getBiodata means getUserBiodata
    useEffect(async () => {
        const getBiodata = await attendanceAPI.get("/user/:userId", {
            params: { userId: loginId }, 
        }); // kirim req.params.id bisa dari endpoint aja
        setBiodata(getBiodata);

        const getUserLog = await attendanceAPI.get("/user-log/:userId"); // filter by userId
        setUserLog(getUserLog);
    }, []);

    const handleSubmit = (event) => {
        // nguli, blum nemu biar ga hardcodeds
        const name = event.input.name.value;
        const department = event.input.department.value;
        const job = event.input.job.value;
        // const newSubmit = {
        //     name: event.input.name.value,
        //     department: event.input.department.value,
        //     job: event.input.job.value,
        // };
        setBiodata({ ...biodata, name, department, job });
        // if there is a change
        attendanceAPI.put("/user/:userId", { // insert into
            body: biodata, 
        });
    };

    return (
        <>
            {/* complete/edit biodata */}
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={biodata.name}
                    required
                />
                
                <label>Department:</label>
                <input
                    type="text"
                    name="department"
                    value={biodata.department}
                    required
                />

                <label>Job Role:</label>
                <input
                    type="text"
                    name="job"
                    value={biodata.job}
                    required
                />

                <button type="submit" onClick={handleSubmit}>Submit your new biodata</button>
                {/* handle cancel */}
                {/* Toaster confirm */}
            </form>

            {/* show user picture, auto fill (diffs: user & admin) */}
            <img src={biodata.picture} alt={`Picture of ${biodata.name}`} />
            {/* upload new picture */}

            {/* show biodata detail: name, department, job role */}
            <ul>
                {biodata.map((key, value) => {
                    <li>{key}: {value}</li>
                })}
            </ul>

            {/* delete account & logout */}

            {/* log for this user only */}
            <ol>
                {userLog.forEach((log) => {
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

export default User;