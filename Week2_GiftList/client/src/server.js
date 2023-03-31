import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:5137",
});

export default server;