# Google Books API (React.js)

## Что умеет делать приложение

1) Запрос пользователем списка книг по введённой подстроке в текстовом поле 
2) Фильтрация по категориям (all, art, biography, computers, history, medical, poetry). Изначально происходит поиск без учёта категорий
3) Сортировка списка книг (relevance, newest)
4) Пагинация. Под списком книг расположена кнопка "Load more books", при нажатии на которую подгружается больше книг. Шаг пагинации: 30
5) При клике на карточку происходит переход на страницу с отдельной книгой, где выводится больше информации

## Основная информация

Приложение реализовано с помощью библиотеки **React.js**. В качестве state-менеджера используется **Redux Toolkit**, а для запросов к Google Books API используется модуль **RTK Query**. Для типизации кода используется **TypeScript**.

## Docker-контейнеры
В проекте реализовано развёртывание контейнеров для разработки и для просмотра конеченого build-а. Для этого используется специальная надстройка **Docker-compose**
Для развёртывания dev версии используется команда ``` docker-compose run -p 3000:3000 web-dev ```
Для развёртывания prod версии используется команда ``` docker-compose run -p 80:80 web-prod ```

## Технологии

```plaintext
Node.js (v18.12.0) : среда выполнения;
Docker (v20.10.23) : платформа для развёртывания приложения
React.js (v18.2.0) : клиентская часть;
TypeScript (v4.9.5) : типизация JS-кода;
Redux Toolkit (v1.9.3) : state-менеджмент и запросы;
Sass (v8.0.0) : написание CSS-стилей сайта;
```

[![](https://github.com/m-morgunets/test-books-api/screenshots/telegram.png)](https://t.me/m_morgunets)

## Скриншоты приложения

![](https://github.com/m-morgunets/test-books-api/screenshots/screenshot-1.png)

> Главная страница

![](https://github.com/m-morgunets/test-books-api/screenshots/screenshot-2.png)

> Страница отдельной книги