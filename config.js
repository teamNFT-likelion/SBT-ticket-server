const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');
const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
const User = db.collection('User');

module.exports = { User };
