const axios = require('axios');
const {
  naverOauthDataUrl,
  getNaverTokenUrl,
  getNaverUnlinkUrl,
} = require('../url.js');

module.exports = {
  getByNaver: async (req, res) => {
    const code = req.query.code; // 인가코드
<<<<<<< HEAD

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
=======
    const state = req.query.state;
    const clientId = process.env.NAVER_CLIENT_ID;
    const clientSecret = process.env.NAVER_CLIENT_SECRET;
    // TODO: 환경별 수정필요
    const redirectUrl =
      state === "local"
        ? "http://localhost:3000/payment"
        : "http://ttot.netlify.app/payment";
    const getTokenUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`;
    const getOauthDataUrl = "https://openapi.naver.com/v1/nid/me";

    // 인가코드 > 엑세스토큰
    const {
      data: { access_token },
    } = await axios.get(getTokenUrl);

    // 엑세스토큰 > 데이터
    const {
      data: { response },
    } = await axios.get(getOauthDataUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // 엑세스토큰 만료
    const unlinkTokenUrl = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${clientId}&client_secret=${clientSecret}&access_token=${access_token}&service_provider=NAVER`;
    await axios.get(unlinkTokenUrl);

    // 쿠키만료시간 1분
    res.cookie("oauthData", JSON.stringify(response), {
      expires: new Date(Date.now() + 1000 * 60),
    });
    res.status(302).redirect(redirectUrl);
>>>>>>> 3cddf1c (fix: 주석 수정)
  },

  getByKakao: async (req, res) => {
    const code = req.query.code; // 인가코드
    const state = req.query.state;
    const clientId = process.env.KAKAO_CLIENT_ID;
    const redirectUrl =
<<<<<<< HEAD
      state === 'local'
        ? 'http://localhost:5000/kakao/callback'
        : 'http://ttot.netlify.app/payment';

    const getTokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirectUrl}&code=${code}`;
    const getOauthDataUrl = 'https://kapi.kakao.com/v2/user/me';
=======
      state === "kakao"
        ? "http://localhost:3000/kakao/callback"
        : "https://ttot.netlify.app/payment";

    const getTokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&redirect_uri=http://localhost:5000/kakao/callback&code=${code}`;
    const getOauthDataUrl = "https://kapi.kakao.com/v2/user/me";
>>>>>>> ae9a32b (fix : redirectUrl 수정)

    // 인가 코드 > 토큰 받기
    const {
      data: { access_token },
    } = await axios.post(getTokenUrl);

<<<<<<< HEAD
    // 엑세스토큰 > 데이터(이메일만 받아오면 이런 코드)
=======
    // 엑세스토큰 > 데이터
>>>>>>> 3cddf1c (fix: 주석 수정)
    const { data } = await axios.get(getOauthDataUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(data);

<<<<<<< HEAD
=======
    // 엑세스토큰 만료
>>>>>>> 3cddf1c (fix: 주석 수정)
    const unlinkTokenUrl = `https://kapi.kakao.com/v1/user/unlink`;
    await axios.get(unlinkTokenUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // 쿠키만료시간 1분
    res.cookie('oauthData', JSON.stringify(data), {
      expires: new Date(Date.now() + 1000 * 60),
    });

<<<<<<< HEAD
    res.status(302).redirect('http://localhost:3000/payment');
=======
    res.status(302).redirect(redirectUrl);
>>>>>>> ae9a32b (fix : redirectUrl 수정)
  },
};
