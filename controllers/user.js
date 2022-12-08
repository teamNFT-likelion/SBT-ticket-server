const axios = require('axios');
const { getFirestore } = require('firebase-admin/firestore');
const { User } = require('../config.js');

module.exports = {
  postSignup: async (req, res) => {
    const { address, email } = req.body;
    if (!address || !email) {
      res.status(400).send({ msg: '이메일과 주소를 주세요' });
    }

    const addressRef = User.doc(address);
    const addressDoc = await addressRef.get();

    if (!addressDoc.exists) {
      // db에 저장된 주소가 없는경우
      await User.doc(address).set({ address, email });
      res.status(200).send({ msg: 'signup success' });
    } else {
      // db에 이미 저장된 주소가 있는경우
      res.status(200).send({ msg: 'already signup', data: addressDoc.data() });
    }
  },

  getInfo: async (req, res) => {
    res.send({ msg: 'get' });
  },
};
