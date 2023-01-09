const firebase = require('firebase-admin');
const serviceAccount = require('./firebase.json');

const db = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

module.exports = db;
