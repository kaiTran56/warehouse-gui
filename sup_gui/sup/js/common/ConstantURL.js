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
const DELETE_ALL_ORDER_SCHEDULES = URL_ORDER_SCHEDULE + "/delete/all"


const URL_POD = HOST_NAME + "/api/pod";
const GET_PODS = URL_POD+ "/list";
const GET_POD = URL_POD + "/";
const GET_PRODUCTS_BY_POD = URL_POD + "/products/"
const SAVE_POD = URL_POD + "/save";
const DELETE_POD = URL_POD+ "/delete/";


const URL_PRODUCT = HOST_NAME + "/api/product";
const GET_PRODUCTS = URL_PRODUCT+ "/list";
const GET_PRODUCT = URL_PRODUCT + "/";
const SAVE_PRODUCT = URL_PRODUCT + "/save";
const DELETE_PRODUCT = URL_PRODUCT+ "/delete/";


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


const URL_USER_LOG = HOST_NAME+"/api/user-log";
const GET_USER_LOGS = URL_USER_LOG + "/list";


const URL_PICKING = HOST_NAME+"/api/picking";
const GET_PICKING_ORDERS = URL_PICKING + "/list";
const UPDATED_PICKING_ORDER = URL_PICKING + "/update";

const URL_STOWING = HOST_NAME+"/api/stowing";
const GET_STOWING_ORDERS = URL_STOWING + "/list";
const UPDATED_STOWING_ORDER = URL_STOWING + "/update";


const URL_STOCKTAKING = HOST_NAME+"/api/stocktaking";
const GET_STOCKTAKING_ORDERS = URL_STOCKTAKING + "/list";
const UPDATED_STOCKTAKING_ORDER = URL_STOCKTAKING + "/update";



const AUTH_URL = HOST_NAME + "/api/auth";
const SIGNIN_URL = AUTH_URL + "/signin";
const SIGNUP_URL = AUTH_URL + "/signup";
const LOGOUT_URL = AUTH_URL + "/logout";

// Tranfer pages
const DIRECT_ORDER_SCHEDULE = "./order_schedules.html";
const DASHBOARD ="./dashboard.html"
const DIRECT_LOGIN="./login.html";
const DIRECT_LOGOUT=DIRECT_LOGIN;
const ERROR_PAGE = "./404.html";

const GET_CURR_USER= HOST_NAME+"/api/user/me";