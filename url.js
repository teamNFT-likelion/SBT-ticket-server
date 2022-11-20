const naverClientId = process.env.NAVER_CLIENT_ID;
const naverClientSecret = process.env.NAVER_CLIENT_SECRET;
const naverOauthDataUrl = 'https://openapi.naver.com/v1/nid/me';
const getNaverTokenUrl = (code) => {
  return `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naverClientId}&client_secret=${naverClientSecret}&code=${code}`;
};
const getNaverUnlinkUrl = (token) => {
  return `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${naverClientId}&client_secret=${naverClientSecret}&access_token=${token}&service_provider=NAVER`;
};

module.exports = {
  getNaverTokenUrl,
  naverOauthDataUrl,
  getNaverUnlinkUrl,
};
