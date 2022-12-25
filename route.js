const express = require('express');
const router = express.Router();

router.get('/test', async (req, res) => {
  res.status(200).send({ data: 'test', message: 'test' });
});

const oauthController = require('./controllers/oauth');
router.get('/naver/callback', oauthController.getByNaver);
router.get('/kakao/callback', oauthController.getByKakao);

const userController = require('./controllers/user');
router.post('/user/signup', userController.postSignup);
router.get('/user', userController.getInfo);

const tossPayController = require('./controllers/toss');
router.get('/payment/success', tossPayController.success);
router.get('/payment/cancel', tossPayController.cancel);

module.exports = router;
