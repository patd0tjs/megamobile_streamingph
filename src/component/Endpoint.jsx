// const BASE_URL = "https://dev.megabots.app/streaming_ph/";
// const BASE_URL1 = "https://streamingph.com/";
// const BASE_URL = "https://streamingph.com/sph/";
const BASE_URL1 = "https://dev.megabots.app/streaming_ph/";
const BASE_URL = "https://dev.megabots.app/streaming_ph/sph/";

// const BASE_URL1 = "http://localhost/mega/streamingph/";
// const BASE_URL = "http://localhost/mega/streamingph/sph/";

const CHECK_VENDOR = BASE_URL + "check_vendor";
const PAY_REQUEST_ONLINE = BASE_URL + "pay_request_online";
const PAY_REQUEST_OTC = BASE_URL + "pay_request_otc"; //
const PAY_REQUEST_ONLINE_BANKING = BASE_URL + "pay_request_online_banking"; //pay_request_online_banking
const VERIFY_STATUS_REF = BASE_URL + "verify_status_txnid";
const GET_PLANS = BASE_URL + "get_provider_plans";
const GET_ARTICLES = BASE_URL + "get_articles";
const GET_TRAILERS = BASE_URL + "get_trailers";
const LOG_VISIT = BASE_URL + "log_site_visit";
const GET_CERTAIN_ARTICLE = BASE_URL + "get_article";
const SHARE_ARTICLE = BASE_URL1 + "view/article/";

export default {
  BASE_URL1,
  CHECK_VENDOR,
  PAY_REQUEST_ONLINE,
  VERIFY_STATUS_REF,
  PAY_REQUEST_OTC,
  GET_PLANS,
  GET_ARTICLES,
  GET_TRAILERS,
  PAY_REQUEST_ONLINE_BANKING,
  LOG_VISIT,
  GET_CERTAIN_ARTICLE,
  SHARE_ARTICLE,
};
