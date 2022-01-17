import {
    SEND_ORDER_INIT,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILURE,
  } from '../types/sendOrderTypes';
  
  const initialState = {
    response: null,
    loading: false,
    error: null,
  };
  
  export default function sendOrderReducer(state = initialState, action) {
    switch (action.type) {
      case SEND_ORDER_INIT:
        return { ...initialState };
      case SEND_ORDER_REQUEST:
        return {
          ...state,
          response: null,
          loading: true,
          error: null,
        };
      case SEND_ORDER_SUCCESS: {
        const { success } = action.payload;
        return {
          ...state,
          response: success,
          loading: false,
          error: null,
        };
      }
      case SEND_ORDER_FAILURE: {
        const { error } = action.payload;
        return {
          ...state,
          response: null,
          loading: false,
          error,
        };
      }
      default:
        return { ...state };
    }
  }