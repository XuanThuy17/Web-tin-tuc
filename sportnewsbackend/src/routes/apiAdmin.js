import express from "express";
import apiAdController from '../controllers/apiAdController'

const router = express.Router();
const apiAdmin = (app) => {

    router.get('/ad-get-new', apiAdController.handleDisplayNew);
    router.put('/ad-acp-new', apiAdController.handleAcpNew);
    
    router.get('/ad-get-author', apiAdController.handleGetAuthor);
    router.put('/ad-acp-author', apiAdController.handleAcpAuthor);

    router.get('/ad-get-user', apiAdController.handleGetUser);
    router.delete('/ad-delete-user', apiAdController.handleDeleteUser);

    router.get('/ad-get-statistic', apiAdController.handleGetStatistic);
    router.get('/ad-get-goodauthor', apiAdController.handleGetGoodauthor);

    return app.use("/api/v1/", router);

}
export default apiAdmin;
