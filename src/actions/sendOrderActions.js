import {
    SEND_ORDER_INIT,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILURE,
  } from '../types/sendOrderTypes';
  
  export function sendOrderInit() {
    return { type: SEND_ORDER_INIT };
  }
  
  export function sendOrderRequest(itemOrder) {
    return { type: SEND_ORDER_REQUEST, payload: { itemOrder } };
  }
  
  export function sendOrderSuccess(success) {
    return { type: SEND_ORDER_SUCCESS, payload: { success } };
  }
  
  export function sendOrderFailure(error) {
    return { type: SEND_ORDER_FAILURE, payload: { error } };
  }