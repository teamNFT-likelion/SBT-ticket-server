const axios = require('axios');

const EncodedSecretKey = 'dGVzdF9za19ZUEJhbDJ2eGo4MU5STHpPZ09LMzVSUWdPQU5EOgo='; // testKey+: encode한값
module.exports = {
  success: async (req, res) => {
    const { paymentKey, orderId, amount } = req.query;

    try {
      const response = await axios.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        { paymentKey, orderId, amount },
        {
          headers: {
            Authorization: `Basic ${EncodedSecretKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      res.status(200).send({ data: response.data });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },

  cancel: async (req, res) => {
    const { paymentKey, cancelReason } = req.query;
    try {
      const response = await axios.post(
        `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
        { cancelReason },
        {
          headers: {
            Authorization: `Basic ${EncodedSecretKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      res.status(200).send({ data: response.data });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
};
