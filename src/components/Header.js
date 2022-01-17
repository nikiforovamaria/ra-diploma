import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchChange } from '../actions/catalogActions';
import { basketInitProduct } from '../actions/basketProductActions';
import { clearBasket, getLastBsket } from '../utils/basket-storage';

export default function Header() {
  const [searchFormVisible, setSerchFormVisible] = useState(true);
  const [valueSearch, setValueSearch] = useState('');
  const { products } = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (getLastBsket()) {
      dispatch(basketInitProduct(getLastBsket()));
    } else {
      clearBasket();
    }
  }, []);

  const handleClickSearch = (event) => {
    event.preventDefault();
    if (!valueSearch) {
      setSerchFormVisible(!searchFormVisible);
    } else {
      dispatch(searchChange(valueSearch));
      setSerchFormVisible(!searchFormVisible);
      setValueSearch('');
      history.push('/catalog');
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setValueSearch(value);
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Главная</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/catalog">Каталог</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">О магазине</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contacts">Контакты</Link>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleClickSearch}></div>
                  <div className="header-controls-pic header-controls-cart" onClick={() => history.push('/cart')}>
                    {!!products.length && <div className="header-controls-cart-full">{products.length}</div>}
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className={`header-controls-search-form form-inline${searchFormVisible && ' invisible'}`} onSubmit={handleClickSearch}>
                  <input className="form-control" placeholder="Поиск" onChange={handleChange} value={valueSearch} />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}