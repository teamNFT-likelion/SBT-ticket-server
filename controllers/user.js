const axios = require('axios');
const firebase = require('../db');
const firestore = firebase.firestore();

module.exports = {
  postSignup: async (req, res) => {
    const { address, email } = req.body;

    if (!address || !email) {
      res.status(400).send({ msg: '이메일과 주소를 주세요' });
    }

    const userDoc = await firestore.collection('User').doc(address).get();

    if (!userDoc.exists) {
      // db에 저장된 주소가 없는경우
      await firestore.collection('User').doc(address).set({ address, email });
      res.status(200).send({ msg: 'signup success' });
    } else {
      // db에 이미 저장된 주소가 있는경우
      res.status(200).send({ msg: 'already signup', data: userDoc.data() });
    }
  },

  getInfo: async (req, res) => {
    const { address } = req.body;

    const userDoc = await firestore.collection('User').doc(address).get();

    if (!userDoc.exists) {
      res.status(400).send({ msg: 'no data' });
    } else {
      res.status(200).send({ data: userDoc.data() });
    }
  },
};
