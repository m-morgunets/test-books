import { Item, ResponseBooks } from "./../../types/books";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { booksActions } from "./books.slice";

// Интерфейс с описанием данных которые должны быть переданы в параметрах
export interface IParamsGetBooks {
	search: string;
	amountBooks: number;
	category: string;
	sortType: string;
}

export const booksApi = createApi({
	reducerPath: "books/api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://www.googleapis.com/books/v1",
		method: "get",
	}),
	endpoints: (build) => ({

		// Запрос за конкретной книгой
		// В параметрах принимает только id этой книги
		getOneBook: build.query<Item, string>({
			query: (id: string) => ({
				url: `volumes/${id}`,
			}),
			async onQueryStarted({}, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;

				// Передаёт в сейт данные о книге
				dispatch(booksActions.setBookItem(data));
			},
		}),

		// Запрос за списком книг
		// В параметрах принимает строку запроса, категорию, текущее кол-во книг и тип сортировки
		getBooks: build.mutation<ResponseBooks, IParamsGetBooks>({
			query: ({ search, amountBooks, category, sortType }) => ({
				url: "volumes",
				params: {
					// Если категория не указана (равна пустой строке), то атрибут "+subject:" не добавляется
					q: `${search}${category ? `+subject:${category}` : ""}`,
					maxResults: 30,
					startIndex: amountBooks,
					orderBy: sortType,
					key: process.env.REACT_APP_GOOGLE_API_KEY,
				},
			}),
			async onQueryStarted({}, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;

				// Перебор книг и занесение в стейт данных о каждой книге
				data.items.forEach((item) => dispatch(booksActions.pushBooks(item)));
				// Передача данных о кол-ве книг доступных по запросу
				dispatch(booksActions.setTotalBooks(data.totalItems));
			},
		}),
	}),
});

export const { useLazyGetOneBookQuery, useGetBooksMutation } = booksApi;
