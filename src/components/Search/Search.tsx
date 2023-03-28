import React from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./Search.module.scss";
import searchSvg from "./../../assets/images/search.svg";
import backgroundImage from "./../../assets/images/backgroundImage.jpg";
import { useNavigate } from "react-router-dom";

const Search = () => {
	// Использование хука для получения экшена 
	const { setSearch, setLastSearch, setCategory, setSortType } = useActions();

	// Использование хука для поулчения данных из стора
	const { search, category, sortType } = useAppSelector((store) => store.books);

	// Хук для редиректа на другую страницу
	const navigate = useNavigate();

	// Функция выбора категории в выпадающем списке
	const categoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		navigate("/home"); // Редирект на главную страницу со всеми книгами
		const index = e.target.selectedIndex;
		setCategory(e.target.options[index].value);
	};

	// Функция выбора типа сортировки в выпадающем списке
	const sortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		navigate("/home"); // Редирект на главную страницу со всеми книгами
		const index = e.target.selectedIndex;
		setSortType(e.target.options[index].value);
	};

	// Функция ввода запроса в строку поиска
	const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	// Фукнция перехватывающая нажатие клавиши Enter при фокусе на строке ввода
	const searchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			navigate("/home"); // Редирект на главную страницу со всеми книгами
			setLastSearch(search);
		}
	};

	// Функция клика по изображению в строке поиска
	const clickSearchImg = () => {
		navigate("/home"); // Редирект на главную страницу со всеми книгами
		setLastSearch(search);
	};

	return (
		<div className={styles.search}>
			<img className={styles.background} src={backgroundImage} alt="" />
			<div className={styles.title}>Search for books</div>
			<div className={styles.search__input}>
				<input
					type="text"
					value={search}
					onKeyPress={(e) => searchKeyPress(e)}
					onChange={(e) => searchChange(e)}
				/>
				<img onClick={clickSearchImg} src={searchSvg} alt="" />
			</div>

			<div className={styles.box}>
				<div className={styles.select}>
					<div className={styles.select__title}>Categories</div>
					<select
						onChange={(e) => categoryChange(e)}
						name="category"
						className={styles.select__item}
						value={category}
					>
						<option value="">all</option>
						<option value="art">art</option>
						<option value="biography">biography</option>
						<option value="computers">computers</option>
						<option value="history">history</option>
						<option value="medical">medical</option>
						<option value="poetry">poetry</option>
					</select>
				</div>

				<div className={styles.select}>
					<div className={styles.select__title}>Sorting by</div>
					<select
						onChange={(e) => sortTypeChange(e)}
						name="sortType"
						className={styles.select__item}
						value={sortType}
					>
						<option value="relevance">relevance</option>
						<option value="newest">newest</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Search;
