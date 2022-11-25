// const http = require('http');

const naverClientId = process.env.NAVER_CLIENT_ID;
const naverClientSecret = process.env.NAVER_CLIENT_SECRET;
const naverOauthDataUrl = 'https://openapi.naver.com/v1/nid/me';
const getNaverTokenUrl = (code) => {
  return `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naverClientId}&client_secret=${naverClientSecret}&code=${code}`;
};
const getNaverUnlinkUrl = (token) => {
  return `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${naverClientId}&client_secret=${naverClientSecret}&access_token=${token}&service_provider=NAVER`;
};

const kakaoClientId = process.env.KAKAO_CLIENT_ID;
const kakaoOauthDataUrl = 'https://kapi.kakao.com/v2/user/me';

const getKakaoTokenUrl = (code, origin) => {
  const kakaoRedirecUrl = origin.includes('localhost')
  ? 'http://localhost:3000/payment'
  : 'https://ttot.netlify.app/payment';
  
  return `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoClientId}&redirect_uri=${kakaoRedirecUrl}&code=${code}`;
};
module.exports = {
  getNaverTokenUrl,
  naverOauthDataUrl,
  getNaverUnlinkUrl,
  kakaoOauthDataUrl,
  getKakaoTokenUrl,
};
