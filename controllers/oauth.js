const axios = require('axios');
const {
  naverOauthDataUrl,
  getNaverTokenUrl,
  getNaverUnlinkUrl,
  kakaoOauthDataUrl,
  getKakaoTokenUrl,
} = require('../url.js');

module.exports = {
<<<<<<< HEAD
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
    const state = req.query.state;
    console.log(state);

    const getKakaoUnlinkUrl = `https://kapi.kakao.com/v1/user/unlink`;

    try {
      // 인가코드 > 엑세스토큰
      const {
        data: { access_token },
      } = await axios.post(getKakaoTokenUrl(code));

      // 엑세스토큰 > 데이터
      const {h
        data
      } = await axios.get(kakaoOauthDataUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // 토큰 만료 (이거 없어도되나? 일단 만료시킴)
      await axios.get(getKakaoUnlinkUrl, {
=======
	getByNaver: async (req, res) => {
		const code = req.query.code; // 인가코드
		const state = req.query.state;
		const clientId = process.env.NAVER_CLIENT_ID;
		const clientSecret = process.env.NAVER_CLIENT_SECRET;
		// TODO: 환경별 수정필요
		const redirectUrl = state === "local" ? "http://localhost:3000/payment" : "http://ttot.netlify.app/payment";
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
		res.cookie("oauthData", JSON.stringify(response), { expires: new Date(Date.now() + 1000 * 60) });
		res.status(302).redirect(redirectUrl);
	},

	getByKakao: async (req, res) => {
    const code = req.query.code; // 인가코드
    const state = req.query.state;
    const clientId = process.env.KAKAO_CLIENT_ID;
    const redirectUrl =
      state === "local"
        ? "http://localhost:5000/kakao/callback"
        : "http://ttot.netlify.app/payment";

    const getTokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirectUrl}&code=${code}`;
    const getOauthDataUrl = "https://kapi.kakao.com/v2/user/me";

    // 인가 코드 > 토큰 받기
    const {
      data: { access_token },
    } = await axios.post(getTokenUrl);


    // 엑세스토큰 > 데이터(이메일만 받아오면 이런 코드)
    const {
      data
    } = await axios.get(getOauthDataUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
    });

    console.log(data);


    const unlinkTokenUrl = `https://kapi.kakao.com/v1/user/unlink`;
    await axios.get(unlinkTokenUrl, {
>>>>>>> 9651f58e217dd485cb3760be154e4c5e6c68a522
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

<<<<<<< HEAD
      res.status(200).send({ data,  message: 'success' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
=======
    // 쿠키만료시간 1분
    res.cookie("oauthData", JSON.stringify(data), {
      expires: new Date(Date.now() + 1000 * 60),
    });

    res.status(302).redirect("http://localhost:3000/payment");
>>>>>>> 9651f58e217dd485cb3760be154e4c5e6c68a522
  },
};
