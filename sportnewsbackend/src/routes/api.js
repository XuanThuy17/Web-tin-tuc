import express from "express";
import apiController from "../controllers/apiController";

const router = express.Router();

const initApiRoutes = (app) => {

    //user
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);

    //author
    router.post('/register-au', apiController.handleRegisterAu);
    router.post('/login-au', apiController.handleLoginAu);

    //admin
    router.post('/register-ad', apiController.handleRegisterAd);
    router.post('/login-ad', apiController.handleLoginAd);


    return app.use("/api/v1/", router);
}

export default initApiRoutes;
