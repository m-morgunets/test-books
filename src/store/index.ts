import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { booksApi } from "./books/books.api";
import booksSlice from "./books/books.slice";

export const store = configureStore({
	reducer: {
		books: booksSlice,
		[booksApi.reducerPath]: booksApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(booksApi.middleware),
});

// Утилита, используемая для включения refetchOnFocusи refetchOnReconnectповедения
// Требуется dispatch-метод из store
setupListeners(store.dispatch);

// Кастомный тип, чтобы понимать с какими данными мы работаем в сторе
export type RootState = ReturnType<typeof store.getState>;
