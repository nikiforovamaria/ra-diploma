import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCatalogCategories,
  fetchCatalogCategoriesChange,
  fetchCatalogItemsRequest,
} from '../actions/catalogActions';
import Card from './Card';

export default function Catalog() {
  const {
    categories,
    activCategory,
    responseItemsAmount,
    items,
    search,
    loading,
    loadingCategory,
    error
  } = useSelector((state) => state.catalogList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogCategories());
  },[dispatch]);

  const handleChangeCategory = (e, id) => {
    e.preventDefault();
    dispatch(fetchCatalogCategoriesChange(id));
  };

  const handleItemsMore = () => {
    dispatch(fetchCatalogItemsRequest());
  };

  const handleRepeat = () => {
    if (categories.length <= 1) {
      dispatch(fetchCatalogCategories());
    } else {
      dispatch(fetchCatalogItemsRequest());
    }
  };

  return (
    <React.Fragment>
      {!loadingCategory && <React.Fragment>
        {categories.length > 1 && <ul className="catalog-categories nav justify-content-center">
          {categories.map((item) => (
            <li className="nav-item" key={item.id}>
              <a className={item.id === activCategory ? "nav-link active" : "nav-link"} href="#" onClick={(e) => {
                handleChangeCategory(e, item.id);
              }}>{item.title}</a>
            </li>
          ))}
        </ul>}
        <div className="row">
          {!loading && search && !items.length && <p>Нечего не найдено</p>}
          {items.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </React.Fragment>}

      {loading && <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>}

      {error && <div className="error-msg">
        <p>Произошла ошибка</p>
        <div onClick={handleRepeat}>Повтрорить запрос</div>
      </div>}

      {responseItemsAmount > 5 && <div className="text-center">
        <button onClick={handleItemsMore} className="btn btn-outline-primary" disabled={loading}>Загрузить ещё</button>
      </div>}
    </React.Fragment>
  )
}
