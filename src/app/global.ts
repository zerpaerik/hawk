import { environment } from '../environments/environment';
import { environmentsonicu } from '../environments/environment';


const server_name = environment.apiUrl;
const server_sonicu = environmentsonicu.apiUrl;

export const global = {
    // USERS
    API_USER_LOGIN: server_name + '/auth/customer/login/',

    API_USER_LOGOUT: server_name + '/auth/customer/logout/',

    API_REGISTER_USER: server_name + '/auth/customer/',

    API_REGISTER_USER_CONFIRMATION: server_name + '/auth/customer/request-confirm-email/ ',

    API_VALIDATE_EMAIL: server_name + '/auth/customer/__token__/confirm-email/',

    API_REQUEST_RECOVER_PASSWORD: server_name + '/auth/customer/request-reset-password/',

    API_RESET_PASSWORD: server_name + '/auth/customer/__token__/reset-password/',

    API_GET_USER_DETAILS:server_name + '/admin/authentication/customer/',

    API_GET_USER_INFO:server_name+'/auth/customer/',

    // LOGIN SONICU

    API_USER_LOGIN_SONICU: server_name + '/product/instrumentation/login/',

    //COUNTRIES
    API_GET_ALL_COUNTRIES: server_name + '/meta/countries/',

    API_GET_ZIP_CODES: server_name + '/meta/zips/',

    //FILTERS
    API_GET_FILTERS: server_name + '/filter/',

    API_GET_ALL_FILTERS: server_name + '/case/filter/',

    API_SEARCH_FILTERS: server_name + '/case/filter/?__part_url__name=__name__&part_number=__part_number__&size_depth_min=__size_depth_min__&size_depth_max=__size_depth_max__&size_width_min=__size_width_min__&size_width_max=__size_width_max__&size_height_min=__size_height_min__&size_height_max=__size_height_max__&max_press_drop_min=__max_press_drop_min__&max_press_drop_max=__max_press_drop_max__&efficiency_max=__efficiency_max__&efficiency_min=__efficiency_min__&test_airflow_max=__test_airflow_max__&test_airflow_min=__test_airflow_min__&pdf_date_max=__pdf_date_max__&pdf_date_min=__pdf_date_min__&e1_max=__e1_max__&e1_min=__e1_min__&e2_max=__e2_max__&e2_min=__e2_min__&e3_max=__e3_max__&e3_min=__e3_min__',

    //CASES
    API_CASES: server_name + '/case/case-study/',

    API_EDIT_CASE: server_name + '/case/case-study/__case_id__/',

    API_GET_CASE_BY_ID:server_name + '/case/case-study/__case_id__/',

    API_GET_COST_BY_TIME:server_name+'/case/case-study/__case_id__/costs/?time=__given_time__',

    API_GET_ENERGY_COSTS:server_name + '/meta/zip/__zipcode__/__industry__/',

    API_GET_DP_VALUES:server_name + '/case/case-study/__report__/min-pressure/',

    // REPORTS
    API_GET_REPORTS_LIST: server_name + '/reports/',

    API_UPDATE_REPORT: server_name + '/reports/__id_report__/',

    API_UPLOAD_PDF_REPORT: server_name + '/case/reports/',

    API_REPORT_POINTS: server_name + '/report-points/?report=__id_report__',

    API_SET_REPORT_POINTS: server_name + '/report-points/',

    //NORMS
    API_GET_NORMS: server_name + '/meta/standards/',

    //LABS
    API_GET_LABS: server_name + '/meta/labs/',

    //ADVANCED_FILTER
    API_GET_FILTER_TYPE: server_name + '/meta/advance-filter/filter-type',

    API_GET_MEDIA_TYPE: server_name + '/meta/advance-filter/media-type',

    API_GET_FRAME_TYPE: server_name + '/meta/advance-filter/frame-type',

    API_GET_FRAME_MATERIAL: server_name + '/meta/advance-filter/frame-material',

    API_GET_DUST_TYPE: server_name + '/meta/advance-filter/dust-type',

    API_GET_PROVIDER_TYPE: server_name + '/meta/advance-filter/provider-type',

    API_GET_MANUFACTURERS: server_name + '/meta/manufactures',

    //PROFILE PAYMENT METHODS

    API_PAYMENT_METHODS:server_name + '/product/payment-methods/',

    API_PAYMENT_METHOD_DETAILS:server_name + '/product/payment-methods/__payment_id__',

    API_PAYMENT_METHOD_DELETE:server_name + '/product/payment-methods/__payment_id__',

    CAPTCHA_API_KEY: '' + '6LdoqrAUAAAAAPaw_kYkeBYC3COUZsLVITFSEL2R',

    COUNTRIES:'',

    ZIP_CODES:'',

    SERVER_NAME:server_name,

    //PLANS AND SUBSCRIPTIONS
    API_SUBSCRIPTION_PLANS:server_name + '/product/subscriptions/plans/',

    API_USER_SUBSCRIPTIONS:server_name + '/product/subscriptions/',

    API_DELETE_USER_SUBSCRIPTIONS:server_name + '/product/subscriptions/__plan_id__',

    API_SET_DEFAULT_PAYMENT:server_name + '/product/payment-methods/__payment-method__/set-default/',

    //COMPARISONS
    API_CASE_COMPARISONS: server_name + '/case/comparison/case-study/__case_id__/',

    API_GET_COMPARISON_RESULT: server_name + '/case/comparison/__filter_id__/',


    //INSTRUMENT
    API_GET_INSTRUMENT: server_name + '/product/instrumentation/',

    //CHARTS

    API_GET_CASE_CHART_COST: server_name + '/case/case-study/__case_id__/costs-chart/',

    API_CASE_OPTIMAL_CHART: server_name + '/case/case-study/__case_id__/chart/',

    API_GET_COMPARISON_CHART_COST: server_name + '/case/comparison/__filter_id__/costs-chart/',

    API_COMPARISON_OPTIMAL_CHART: server_name + '/case/comparison/__filter_id__/chart/',

};
