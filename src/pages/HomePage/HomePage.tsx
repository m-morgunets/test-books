import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import ErrorComp from "../../components/Error/ErrorComp";
import Loader from "../../components/Loader/Loader";
import Search from "../../components/Search/Search";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetBooksMutation } from "../../store/books/books.api";
import styles from "./HomePage.module.scss";

const HomePage = () => {
	// Использование хука для получения экшена 
	const { resetBooks } = useActions();

	// Использование хука для поулчения данных из стора
	const { search, category, sortType, books, amountBooks, totalBooks, lastSearch, } 
		= useAppSelector((store) => store.books);

	// Получение фукнции для запроса к api
	const [getBooks, { isError, isLoading }] = useGetBooksMutation();

	useEffect(() => {
		resetBooks(); // Очищение данных от прошлых запросов
		// Не делать запрос, если строка поиска пустая и не указана никакая категория
		if (lastSearch.trim().length !== 0 || category !== "") {
			// Запрос для получения книг
			getBooks({ search, amountBooks: 0, category, sortType });
		}
	}, [lastSearch, category, sortType]);

	// Функция вызывается при клике на кнопку, чтобы вывести больше книг
	const moreBooks = (e: React.MouseEvent<HTMLButtonElement>) => {
		getBooks({ search, amountBooks, category, sortType });
	};
	

	return (
		<section className={styles.section}>
			<Search />
			
			{!isError && (
				<div className={styles.box}>
					<div className={styles.amount}>Found {totalBooks} results</div>
					<div className={styles.books}>
						{/* Вывод всех книг используя компоненту BookCard */}
						{books.map((item) => (
							<BookCard
								key={item.id}
								id={item.id}
								imageLink={item.imageLink}
								title={item.title}
								authors={item.authors}
								categories={item.categories}
							/>
						))}
					</div>

					{amountBooks !== totalBooks ? (
						<button onClick={(e) => moreBooks(e)} className={styles.button}>
							Load more books
						</button>
					) : (
						""
					)}
				</div>
			)}

			{/* Вывод анимации загрузки */}
			{isLoading && <Loader />}
			{/* Вывод ошибок */}
			{isError && <ErrorComp />}
		</section>
	);
};

export default HomePage;
