import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { basketChangeProduct, basketInitProduct } from '../actions/basketProductActions';
import { removeBasket, getLastBsket } from '../utils/basket-storage';
import SendOrder from './SendOrder';

export default function PageCart() {
  const { products } = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(products);
  const totalSum = products.reduce((sum, item) => sum + (item.price * item.amount), 0);

  useEffect(() => {
    if (getLastBsket()) {
      dispatch(basketInitProduct(getLastBsket()));
    }
  }, []);

  const handleProduct = (e, id) => {
    e.preventDefault();
    history.push(`catalog/${id}`);
  };

  const handleRemoveProduct = (idSize) => {
    dispatch(basketChangeProduct(removeBasket(idSize)));
  };

  return (
    <React.Fragment>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) =>
            <tr key={index}>
              <th scope="row">{++index}</th>
              <td><a onClick={(e) => {
                handleProduct(e, item.id);
              }}>{item.title}</a></td>
              <td>{item.size}</td>
              <td>{item.amount}</td>
              <td>{item.price} руб.</td>
              <td>{item.amount * item.price} руб.</td>
              <td><button className="btn btn-outline-danger btn-sm" onClick={() => {
                handleRemoveProduct(`${item.id}${item.size}`);
              }}>Удалить</button></td>
            </tr>
          )}
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>{totalSum} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <SendOrder />
  </React.Fragment>
  );
}