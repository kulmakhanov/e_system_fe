import React from "react";

const NotFoundPage = () => {
  return (
    <div className="wrapper">
      <img alt="NotFoundPage" src="https://i.imgur.com/Q2BAOd2.png" />
      <div id="info">
        <h2>Упс! Эта страница не может быть найдена</h2>
        <p>Извините, но данная страницы не существует или временно недоступеа</p>
        <a href="/" className="notFound">
          На главную
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;