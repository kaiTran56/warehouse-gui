const TOKEN = localStorage.getItem(LocalStorageParam.TOKEN.name);
const HOST_NAME = "http://localhost:5000";

const URL_ORDER_SCHEDULE = HOST_NAME + "/api/order-schedule";
const GET_ORDER_SCHEDULES = URL_ORDER_SCHEDULE;
const GET_DETAIL_ORDER_SCHEDULE = URL_ORDER_SCHEDULE +"/get/";
const GET_LIST_DETAIL_ORDER_SCHEDULES = URL_ORDER_SCHEDULE+"/search";
const UPDATE_ORDER_SCHEDULE = URL_ORDER_SCHEDULE +"/update";
const IMPORT_DATA_ORDER_SCHEDULES =  URL_ORDER_SCHEDULE+ "/import/excel";
const SAVE_LIST_ORDER_SCHEDULES = URL_ORDER_SCHEDULE+ "/save";


const AUTH_URL = HOST_NAME + "/api/auth";
const SIGNIN_URL = AUTH_URL + "/signin";
const SIGNUP_URL = AUTH_URL + "/signup";

// Tranfer pages
const DIRECT_ORDER_SCHEDULE = "./order_schedules.html";
const DIRECT_LOGIN="./login.html";
const DIRECT_LOGOUT=DIRECT_LOGIN;