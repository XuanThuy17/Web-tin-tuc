import express from "express";
import apiAuController from '../controllers/apiAuController'

const router = express.Router();

const apiAuthor = (app) => {
    router.post('/au-create-new', apiAuController.handleCreateNew);
    router.put('/au-update-new', apiAuController.handleUpdateNew);
    router.delete('/au-delete-new', apiAuController.handleDeleteNew);
    
    router.get('/au-get-new', apiAuController.handleDisplayNew);
    router.get('/au-get-detail', apiAuController.handleDisplayDetail);

    
    return app.use("/api/v1/", router);

}

export default apiAuthor;