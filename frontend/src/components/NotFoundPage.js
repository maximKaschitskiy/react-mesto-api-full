import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFoundPage.css';

function NotFoundPage() {

  const navigate = useNavigate();

  return(
    <div className="not-found-page">
      <div className="not-found-page__wrapper">
        <h2 className="not-found-page__status">404</h2>
        <p className="not-found-page__message">Страница не найдена</p>
      </div>
      <button onClick={() => navigate(-1)} className="not-found-page__go-back-link">Назад</button>
    </div>
  );
}

export default NotFoundPage;
