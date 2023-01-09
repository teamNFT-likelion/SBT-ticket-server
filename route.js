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

const hostController = require('./controllers/host');
router.post('/addHost', hostController.addHost);
router.get('/hosts', hostController.getAllHost);
router.post('/updateHost/:id', hostController.updateHost);
router.get('/deleteHost/:id', hostController.deleteHost);
router.post('/pushSeat', hostController.pushSeat);
router.post('/popSeat', hostController.popSeat);

module.exports = router;
