const TOKEN = localStorage.getItem(LocalStorageParam.TOKEN.name);
const HOST_NAME = "http://localhost:5000";

const URL_ORDER_SCHEDULE = HOST_NAME + "/api/order-schedule";
const GET_ORDER_SCHEDULES = URL_ORDER_SCHEDULE;
const GET_DETAIL_ORDER_SCHEDULE = URL_ORDER_SCHEDULE +"/get/";
const GET_LIST_DETAIL_ORDER_SCHEDULES = URL_ORDER_SCHEDULE+"/search";
const UPDATE_ORDER_SCHEDULE = URL_ORDER_SCHEDULE +"/update";
const IMPORT_DATA_ORDER_SCHEDULES =  URL_ORDER_SCHEDULE+ "/import/excel";
const SAVE_LIST_ORDER_SCHEDULES = URL_ORDER_SCHEDULE+ "/save";
const DOWLOAD_ORDER_SCHEDULES = URL_ORDER_SCHEDULE+ "/download";


const URL_USER = HOST_NAME + "/api/user";
const GET_USER = URL_USER + "/"
const GET_USERS = URL_USER + "/list";
const SAVE_USER = URL_USER + "/save";
const DELETE_USER = URL_USER + "/delete/";

const URL_ROLE = HOST_NAME + "/api/role";
const GET_ROLES = URL_ROLE + "/list";
const SAVE_ROLE = URL_ROLE + "/save";
const GET_ROLE = URL_ROLE + "/";
const DELETE_ROLE = URL_ROLE + "/delete/";


const AUTH_URL = HOST_NAME + "/api/auth";
const SIGNIN_URL = AUTH_URL + "/signin";
const SIGNUP_URL = AUTH_URL + "/signup";
const LOGOUT_URL = AUTH_URL + "/logout";

// Tranfer pages
const DIRECT_ORDER_SCHEDULE = "./order_schedules.html";
const DIRECT_LOGIN="./login.html";
const DIRECT_LOGOUT=DIRECT_LOGIN;
const ERROR_PAGE = "./404.html";

const GET_CURR_USER= HOST_NAME+"/api/user/me";