const axios = require('axios');
const {
  naverOauthDataUrl,
  getNaverTokenUrl,
  getNaverUnlinkUrl,
  kakaoOauthDataUrl,
  getKakaoTokenUrl,
} = require('../url.js');

module.exports = {
  getByNaver: async (req, res) => {
    const code = req.query.code; // 인가코드

    try {
      // 인가코드 > 엑세스토큰
      const {
        data: { access_token },
      } = await axios.get(getNaverTokenUrl(code));

      // 엑세스토큰 > 데이터
      const {
        data: { response },
      } = await axios.get(naverOauthDataUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // 토큰 만료 (이거 없어도되나? 일단 만료시킴)
      await axios.get(getNaverUnlinkUrl(access_token));

      res.status(200).send({ data: response, message: 'success' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },

  getByKakao: async (req, res) => {
    const code = req.query.code; // 인가코드
    const location = req.get('origin');

    const getKakaoUnlinkUrl = `https://kapi.kakao.com/v1/user/unlink`;

    try {
      // 인가코드 > 엑세스토큰
      const {
        data: { access_token },
      } = await axios.post(getKakaoTokenUrl(code, location));

      // 엑세스토큰 > 데이터
      const {
        data
      } = await axios.get(kakaoOauthDataUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // 토큰 만료 (이거 없어도되나? 일단 만료시킴)
      await axios.get(getKakaoUnlinkUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

      res.status(200).send({ data,  message: 'success' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
};
