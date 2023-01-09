const firebase = require('../db');
const firestore = firebase.firestore();
const data = require('./initNormalHost.json');

async function addItems() {
  data.map((item) => firestore.collection('NormalHost').doc(item.id).set(item));
}

addItems();
