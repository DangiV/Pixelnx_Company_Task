import express from 'express';
import bodyParser from 'body-parser'
import route from './Routes/indexRoute.js';
import './Db/Connection.js'

const app = express();

const port = 3030;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(express.json());
app.use(route);

app.set('view engine', 'ejs');

app.listen(3030);
console.log("server invoked at http://localhost:3030");