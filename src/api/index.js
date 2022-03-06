export const API_BASE_URL = 'http://localhost:8080';

export const OAUTH_AUTHOR = "/oauth2/authorization/"
export const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth/redirect"

export const GOOGLE_AUTH_URL = API_BASE_URL + OAUTH_AUTHOR + "google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL = API_BASE_URL + OAUTH_AUTHOR + "naver?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL = API_BASE_URL + OAUTH_AUTHOR + "kakao?redirect_uri=" + OAUTH2_REDIRECT_URI;