import {
    BANK_LOGIN_REQUEST,
    BANK_LOGIN_FAIL,
    BANK_LOGIN_SUCCESS,
    BANK_REGISTER_USER_REQUEST,
    BANK_REGISTER_USER_SUCCESS,
    BANK_REGISTER_USER_FAIL,
    BANK_LOAD_USER_REQUEST,
    BANK_LOAD_USER_SUCCESS,
    BANK_LOAD_USER_FAIL,
    BANK_LOGOUT_SUCCESS,
    BANK_LOGOUT_FAIL,
   
    // ALL_USERS_REQUEST,
    // ALL_USERS_SUCCESS,
    // ALL_USERS_FAIL,
    // DELETE_USER_REQUEST,
    // DELETE_USER_SUCCESS,
    // DELETE_USER_FAIL,
    // DELETE_USER_RESET,
  
    BANK_USER_DETAILS_REQUEST,
    BANK_USER_DETAILS_SUCCESS,
    BANK_USER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/bankconstant";
  
  export const bankuserReducer = (state = { bankuser: {} }, action) => {
    switch (action.type) {
      case BANK_LOGIN_REQUEST:
      case BANK_REGISTER_USER_REQUEST:
      case BANK_LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case BANK_LOGIN_SUCCESS:
      case BANK_REGISTER_USER_SUCCESS:
      case BANK_LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          bankuser: action.payload,
        };
  
      case BANK_LOGOUT_SUCCESS:
        return {
          loading: false,
          bankuser: null,
          isAuthenticated: false,
        };
      case BANK_LOGIN_FAIL:
      case BANK_REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          bankuser: null,
          error: action.payload,
        };
  
      case BANK_LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          bankuser: null,
          error: action.payload,
        };
  
      case BANK_LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  


  
//   export const allUsersReducer = (state = { users: [] }, action) => {
//     switch (action.type) {
//       case ALL_USERS_REQUEST:
//         return {
//           ...state,
//           loading: true,
//         };
//       case ALL_USERS_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           users: action.payload,
//         };
  
//       case ALL_USERS_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
  
//       case CLEAR_ERRORS:
//         return {
//           ...state,
//           error: null,
//         };
  
//       default:
//         return state;
//     }
//   };
  
  export const userDetailsReducer = (state = { bankuser: {} }, action) => {
    switch (action.type) {
      case BANK_USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case BANK_USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          bankuser: action.payload,
        };
  
      case BANK_USER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  