import styles from "./BookCard.module.scss";
import blankBook from "./../../assets/images/blankBook.png";
import { Link } from "react-router-dom";

// Интерфейс описывает данные которые должны придти в props
interface PropsTypes {
	id: string;
	imageLink: string | undefined;
	title: string;
	authors: string[];
	categories: string[] | undefined;
}

// Компонент отдельной карточки книги
const BookCard = ({ id, imageLink, title, authors, categories }: PropsTypes) => {
	return (
		// Ссылка страницу отдельной книги
		<Link to={`/book/${id}`} className={styles.item}>
			<div className={styles.image}>
				<img src={imageLink ? imageLink : blankBook} alt="" />
			</div>

			<div className={styles.box}>
				<div className={styles.category}>{categories?.join(", ")}</div>
				<div className={styles.title}>{title}</div>
				<div className={styles.authors}>{authors?.join(", ")}</div>
			</div>
		</Link>
	);
};

export default BookCard;
