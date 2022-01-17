import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { SEND_ORDER_REQUEST } from '../types/sendOrderTypes';
import { sendOrderSuccess, sendOrderFailure } from '../actions/sendOrderActions';

export const sendOrderEpics = (action$) => action$.pipe(
  ofType(SEND_ORDER_REQUEST),
  map((o) => o.payload.itemOrder),
  switchMap((objSend) => ajax({
    url: `${process.env.REACT_APP_URL}order`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objSend),
  }).pipe(
    map((item) => sendOrderSuccess(item.status)),
    catchError((e) => of(sendOrderFailure(e))),
  )),
);