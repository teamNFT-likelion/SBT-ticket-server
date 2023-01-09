const axios = require('axios');
const firebase = require('../db');
const firestore = firebase.firestore();

module.exports = {
  addHost: async (req, res) => {
    try {
      const data = req.body;
      const hostData = await firestore
        .collection('Host')
        .doc(data.id)
        .set(data);

      res.status(200).send(`Add Successfully\n
        Add data : ${hostData}`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getAllHost: async (req, res) => {
    try {
      const hostsSnapshot = await firestore.collection('Host');
      const hostsData = hostsSnapshot.get();

      if (hostsData.empty) {
        res.status(404).send('No Host Record found');
      } else {
        res.status(200).send(hostsData);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  updateHost: async (req, res) => {
    try {
      const newHostData = req.body;
      const hostId = req.body.id;
      const hostSnapshot = await firestore.collection('Host').doc(hostId);
      const hostData = await hostSnapshot.get();

      if (!hostData.exists) {
        res.status(404).send('Host with given ID not found');
      } else {
        hostSnapshot.update(newHostData);
        res.status(200).send(`Update Successfully\n
        Updated Host ID : ${hostId}`);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  deleteHost: async (req, res) => {
    try {
      const hostId = req.body.id;
      const hostSnapshot = await firestore.collection('Host').doc(hostId);
      const hostData = hostSnapshot.get();

      if (!hostData.exists) {
        res.status(404).send('Host with given Id not found');
      } else {
        hostSnapshot.delete();
        res.status(200).send(`Delete Successfully\n
        Deleted Host ID : ${hostId}`);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  // host id -> dateInfo -> 날짜 -> 회차 -> seats -> sections -> subsections -> seats_by_rows -> 행 -> 열 -> status를 "free" -> "booked"
  // host id -> dateInfo -> 날짜 -> 회차 -> seatCount + 1
  pushSeat: async (req, res) => {
    try {
      const hostId = req.body.id;
      const hostSnapshot = await firestore.collection('Host').doc(hostId);
      const hostData = hostSnapshot.get();
      const newStatus = 'booked';
      const newSeatCount = (await hostData.data().seatCount) + 1; // 수정 필요. depth 고려.

      if (!hostData.exists) {
        res.status(404).send('Host with given Id not found');
      } else {
        hostSnapshot.update({
          // 수정 필요. depth 고려.
          status: newStatus,
          seatCount: newSeatCount,
        });
        res.status(200).send(`Update Successfully!\n
        Updated Host ID : ${hostId}`);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  // host id -> dateInfo -> 날짜 -> 회차 -> seats -> sections -> subsections -> seats_by_rows -> 행 -> 열 -> status를 "booked" -> "free"
  // host id -> dateInfo -> 날짜 -> 회차 -> seatCount - 1
  popSeat: async (req, res) => {
    try {
      const hostId = req.body.id;
      const hostSnapshot = await firestore.collection('Host').doc(hostId);
      const hostData = hostSnapshot.get();
      const newStatus = 'free';
      const newSeatCount = (await hostData.data().seatCount) - 1; // 수정 필요. depth 고려.

      if (!hostData.exists) {
        res.status(404).send('Host with given Id not found');
      } else {
        hostSnapshot.update({
          // 수정 필요. depth 고려.
          status: newStatus,
          seatCount: newSeatCount,
        });
        res.status(200).send(`Update Successfully!\n
        Updated Host ID : ${hostId}`);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
