import axios from "axios";

const nodejsPort = "3000";
const attendanceAPI = axios.create({
    baseURL: `https://localhost:${nodejsPort}`,
});

export default attendanceAPI;