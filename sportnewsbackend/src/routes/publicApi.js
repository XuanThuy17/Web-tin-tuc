import express from "express";
import publicController from '../controllers/publicController'

const router = express.Router();

const publicApi = (app) => {

    router.get('/get-category', publicController.getCategory);
    router.get('/get-category-detail', publicController.getCategoryDetail);
    
    router.get('/home-hot-news', publicController.homeHotNews);
    router.get('/home-lastest-news', publicController.homeLastestNews);
    router.get('/home-latest-news', publicController.homeLatestNews);
    router.get('/home-news-by-category', publicController.homeNewsByCategory);
    router.get('/home-all-news', publicController.homeAllNews);
    
    router.get('/get-lastest-news', publicController.getLastestNews);
    router.get('/get-latest-news', publicController.getLatestNews);
    router.get('/get-news-by-category', publicController.getNewsByCategory);
    router.get('/get-news-by-category-detail', publicController.getNewsByCategoryDetail);
    router.get('/get-all-news', publicController.getAllNews);
    
    router.get('/get-new-detail', publicController.getNewsDetail);
    router.get('/search-news', publicController.searchNews);

    router.post('/history-news', publicController.postHistoryNews);
    router.get('/get-history-news', publicController.getHistoryNews);

    router.post('/save-news', publicController.postSaveNews);
    router.get('/get-save-news', publicController.getSaveNews);
    router.delete('/delete-save-news', publicController.deleteSaveNews);
    router.get('/check-save-news', publicController.checkSaveNews);

    router.get('/get-profile', publicController.getProfile);
    router.put('/update-profile', publicController.updateProfile);

    router.post('/comment-news', publicController.postCommentNews);
    router.get('/get-comment', publicController.getComment);
    



    return app.use("/api/v1/", router);

}

export default publicApi