import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import configCors from "./config/cors";
import initApiRoutes from "./routes/api";
import apiAuthor from './routes/apiAuthor';
import apiAdmin from './routes/apiAdmin';
import publicApi from "./routes/publicApi";
import connectDB from "./config/connectDB"

require('dotenv').config();

const app = express();

configCors(app);
configViewEngine(app);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
initApiRoutes(app);
apiAdmin(app);
apiAuthor(app);
publicApi(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    //callback
    console.log("backend is running on port : " + port)
})