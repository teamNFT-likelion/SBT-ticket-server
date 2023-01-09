const firebase = require('../db');
const firestore = firebase.firestore();
const data = require('./initHost.json');

async function addItems() {
  data.map((item) => firestore.collection('Host').doc(item.id).set(item));
}

addItems();
