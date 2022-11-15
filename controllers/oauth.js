const axios = require("axios");

module.exports = {
	getByNaver: async (req, res) => {
		const code = req.query.code; // 인가코드
		const state = req.query.state;
		const clientId = process.env.NAVER_CLIENT_ID;
		const clientSecret = process.env.NAVER_CLIENT_SECRET;
		// TODO: 환경별 수정필요
		const redirectUrl = state === "local" ? "http://localhost:3000/payment" : "http://ttot.netlify.app/payment";
		const getTokenUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&code=${code}&state=${state}`;
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
};
