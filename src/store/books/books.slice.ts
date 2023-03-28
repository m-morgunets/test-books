import { Item } from "./../../types/books";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейс описывает данные отдельной книги
export interface BookItem {
	id: string;
	title: string;
	imageLink: string | undefined;
	authors: string[];
	categories: string[] | undefined;
	publishedDate: string;
	pageCount: number;
	description: string | undefined;
}

// Интерфейс описывает данны инициализационного стейта
export interface IInitialState {
	books: BookItem[];
	bookItem: BookItem | null;
	amountBooks: number;
	search: string;
	lastSearch: string;
	category: string;
	sortType: string;
	totalBooks: number;
}

const initialState: IInitialState = {
	books: [],
	bookItem: null,
	amountBooks: 0,
	search: "",
	lastSearch: "",
	category: "",
	sortType: "relevance",
	totalBooks: 0,
};

const booksSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		// Функция очистки данных при новом запросе
		resetBooks: (state, action: PayloadAction<void>) => {
			state.books = [];
			state.amountBooks = 0;
			state.totalBooks = 0;
		},

		// Функция задания отдельной книги в стейте
		setBookItem: (state, action: PayloadAction<Item>) => {
			state.bookItem = {
				id: action.payload.id,
				title: action.payload.volumeInfo.title,
				imageLink: action.payload.volumeInfo.imageLinks?.thumbnail,
				categories: action.payload.volumeInfo?.categories,
				authors: action.payload.volumeInfo.authors,
				publishedDate: action.payload.volumeInfo.publishedDate,
				pageCount: action.payload.volumeInfo.pageCount,
				description: action.payload.volumeInfo?.description,
			};
		},

		// Функция задания кол-ва книг доступных по запросу
		setTotalBooks: (state, action: PayloadAction<number>) => {
			state.totalBooks = action.payload;
		},

		// Функция задания последнего запроса
		setLastSearch: (state, action: PayloadAction<string>) => {
			state.lastSearch = action.payload;
		},

		// Фукнция задания категории
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},

		// Функция задания типа сортировки
		setSortType: (state, action: PayloadAction<string>) => {
			state.sortType = action.payload;
		},

		// Функция добавления элемента в массив книг
		pushBooks: (state, action: PayloadAction<Item>) => {
			state.books.push({
				id: action.payload.id,
				title: action.payload.volumeInfo.title,
				imageLink: action.payload.volumeInfo.imageLinks?.thumbnail,
				categories: action.payload.volumeInfo?.categories,
				authors: action.payload.volumeInfo.authors,
				publishedDate: action.payload.volumeInfo.publishedDate,
				pageCount: action.payload.volumeInfo.pageCount,
				description: action.payload.volumeInfo?.description,
			});

			state.amountBooks++;
		},

		// Функция задания строки запроса
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
});

export const booksActions = booksSlice.actions;

export default booksSlice.reducer;
