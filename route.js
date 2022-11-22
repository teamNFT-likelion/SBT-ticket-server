const express = require('express');
const router = express.Router();

router.get('/test', async (req, res) => {
  res.status(200).send({ data: 'test', message: 'test' });
});

<<<<<<< HEAD
const oauthController = require('./controllers/oauth');
router.get('/naver/callback', oauthController.getByNaver);
router.get('/kakao/callback', oauthController.getByKakao);
=======
const oauthController = require("./controllers/oauth");
router.get("/naver/callback", oauthController.getByNaver);
router.get("/kakao/callback", oauthController.getByKakao);

>>>>>>> 9651f58e217dd485cb3760be154e4c5e6c68a522

module.exports = router;
