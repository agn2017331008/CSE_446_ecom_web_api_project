
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
    // UPDATE_USER_REQUEST,
    // UPDATE_USER_SUCCESS,
    // UPDATE_USER_FAIL,
    // USER_DETAILS_REQUEST,
    // USER_DETAILS_SUCCESS,
    // USER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/bankconstant";
  import axios from "axios";
  
  // Login
  export const loginBankUser = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: BANK_LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `/api/v1/bankuser/login`,
        { email, password },
        config
      );
      dispatch({ type: BANK_LOGIN_SUCCESS, payload: data.bankuser });
      
    } catch (error) {
      dispatch({ type: BANK_LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  
  // Register
  export const registerBankUser = (bankuserData) => async (dispatch) => {
    try {
      dispatch({ type: BANK_REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/api/v1/bankuser/register`, bankuserData, config);
  
      dispatch({ type: BANK_REGISTER_USER_SUCCESS, payload: data.bankuser });
    } catch (error) {
      dispatch({
        type: BANK_REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Load User
  export const loadBankUser = () => async (dispatch) => {
    try {
      dispatch({ type: BANK_LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`/api/v1/bankuser/me`);
  
      dispatch({ type: BANK_LOAD_USER_SUCCESS, payload: data.bankuser });
    } catch (error) {
      dispatch({ type: BANK_LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };
  
  // Logout User
  export const logoutBankUser = () => async (dispatch) => {
    try {
      await axios.get(`/api/v1/bankuser/logout`);
  
      dispatch({ type: BANK_LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: BANK_LOGOUT_FAIL, payload: error.response.data.message });
    }
  };
  


  

  
  // // get All Users
  // export const getAllUsers = () => async (dispatch) => {
  //   try {
  //     dispatch({ type: ALL_USERS_REQUEST });
  //     const { data } = await axios.get(`/api/v1/admin/users`);
  
  //     dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  //   } catch (error) {
  //     dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  //   }
  // };
  
  // // get  User Details
  // export const getUserDetails = (id) => async (dispatch) => {
  //   try {
  //     dispatch({ type: USER_DETAILS_REQUEST });
  //     const { data } = await axios.get(`/api/v1/admin/user/${id}`);
  
  //     dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  //   } catch (error) {
  //     dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  //   }
  // };
  
  // // Update User
  // export const updateUser = (id, userData) => async (dispatch) => {
  //   try {
  //     dispatch({ type: UPDATE_USER_REQUEST });
  
  //     const config = { headers: { "Content-Type": "application/json" } };
  
  //     const { data } = await axios.put(
  //       `/api/v1/admin/user/${id}`,
  //       userData,
  //       config
  //     );
  
  //     dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  //   } catch (error) {
  //     dispatch({
  //       type: UPDATE_USER_FAIL,
  //       payload: error.response.data.message,
  //     });
  //   }
  // };
  
  // // Delete User
  // export const deleteUser = (id) => async (dispatch) => {
  //   try {
  //     dispatch({ type: DELETE_USER_REQUEST });
  
  //     const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
  
  //     dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  //   } catch (error) {
  //     dispatch({
  //       type: DELETE_USER_FAIL,
  //       payload: error.response.data.message,
  //     });
  //   }
  // };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  