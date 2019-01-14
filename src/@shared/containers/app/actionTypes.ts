/** *****************************************
 * APP Actions
 */
export default {
  // 通用操作
  INIT_CONFIG: '@app/INIT_CONFIG',
  UPDATE_ROUTER: '@app/UPDATE_ROUTER',
  // tslint:disable-next-line:object-literal-sort-keys
  REFRESH_ALL: '@app/REFRESH_ALL',
  RECEIVE_PRODUCT_INFO: '@app/RECEIVE_PRODUCT_INFO',

  // 数据验证
  START_VALIDATE_ALL: '@app/START_VALIDATE_ALL',
  RESET_VALIDATE_MSG: '@app/RESET_VALIDATE_MSG',
  REPORT_VALID_ERROR: '@app/REPORT_VALID_ERROR',

  // Ajax
  REQUEST_SAVE: '@app/REQUEST_SAVE',
  RECEIVE_SAVE: '@app/RECEIVE_SAVE',
  RQ_FETCH: '@app/REQUEST_FETCH',
  RC_FETCH: '@app/RECEIVE_FETCH',
  RECEIVE_AJAX_ERROR: '@app/RECEIVE_AJAX_ERROR',
  RECEIVE_SERVER_ERROR: '@app/RECEIVE_SERVER_ERROR',

  // Login
  CHANGE_LOGIN_STATUS: '@app/CHANGE_LOGIN_STATUS',
  CHANGE_LOGIN_STATE: '@app/CHANGE_LOGIN_STATE',

  // Model框
  CREATE_MODAL: '@app/CREATE_MODAL',
  CHANGE_MODAL_STATE: '@app/CHANGE_MODAL_STATE',

  // dictionary: 全局数据字典
  RECEIVE_DICTIONARY: '@app/RECEIVE_DICTIONARY',
    // companyInfo: 公司信息
  COMPANY_INFO: '@app/COMPANY_INFO'
};
