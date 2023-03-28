import React, { useEffect } from "react";
import Search from "../../components/Search/Search";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./SingleBook.module.scss";
import { useLazyGetOneBookQuery } from "../../store/books/books.api";
import Loader from "../../components/Loader/Loader";
import ErrorComp from "../../components/Error/ErrorComp";

const SingleBook = () => {
	// Получение данных из стора
	const { bookItem } = useAppSelector((store) => store.books);
	// Получение id книги переданное в ссылке
	const { id } = useParams<{ id: string }>();

	// Получение фукнции для запроса к api
	const [reqBookItem, { isError, isLoading }] = useLazyGetOneBookQuery();

	// Запрос к api за информацией об отдельной книге при первой загрузке компоненты
	useEffect(() => {
		// Проверка, что id в параметрах пришёл
		if (id === undefined) throw new Error("Не указан id книги");
		reqBookItem(id);
	}, []);

	// Функция преобразование даты в формат "день.месяц.год"
	const formattingDate = (date: String | undefined) => {
		// Если пришёл undefined, то ничего не преобразовывается
		if (date === undefined) return;
		// Преобразование строки с датой в массив и разворот массива
		const arrDate = date.split("-").reverse();
		// Возвращает преобразованную строку с датой
		return arrDate.join(".");
	};

	return (
		<section className={styles.section}>
			<Search />

			{!isError && (
				<div className={styles.book}>
					<div className={styles.image}>
						<img src={bookItem?.imageLink} alt="" />
					</div>
					<div className={styles.info}>
						<ul className={styles.info__category}>
							{bookItem?.categories?.map((category) => (
								<li>{category}</li>
							))}
						</ul>
						<div className={styles.info__title}>{bookItem?.title}</div>
						<div className={styles.info__year}>
							<p className={styles.mefium}>Publication date:</p>{" "}
							{formattingDate(bookItem?.publishedDate)}
						</div>
						<div className={styles.info__authors}>
							<p className={styles.mefium}>Author:</p>{" "}
							{bookItem?.authors?.join(', ') ?? "-"}
						</div>
						<div className={styles.info__page}>
							<p className={styles.mefium}>Number of pages:</p>{" "}
							{bookItem?.pageCount ?? "-"}
						</div>
						{bookItem?.description && (
							<div className={styles.info__description}>
								<div
									dangerouslySetInnerHTML={{ __html: bookItem?.description }}
								/>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Вывод анимации загрузки */}
			{isLoading && <Loader />}
			{/* Вывод ошибок */}
			{isError && <ErrorComp />}
		</section>
	);
};

export default SingleBook;
