import { server } from "./server";
import "./database";
import cors from 'cors'

server.use(cors({
    origin: 'https://loperapablo.herokuapp.com/',
  optionsSuccessStatus: 200}))

server.start({ port: 4000 }, ({port}) => {
    console.log('Servidor en puerto ', port)
})


// "start": "babel-node src/index.js",
    // "dev": "nodemon --exec npm start"