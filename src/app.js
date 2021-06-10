import http from 'http';
import configExpress from "./configuration/express.js";

const app = configExpress();
const server = http.createServer(app);
const { PORT } = process.env;
server.listen(PORT, () => console.log(`api is listening at port ${PORT}`));
