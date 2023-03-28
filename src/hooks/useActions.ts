import { booksActions } from './../store/books/books.slice';
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// Все экшены из файлов .slice.ts
const actions = {
	...booksActions
};

// Хук сделан для того, чтобы не делать каждый раз обёртку dispatch(action)
// bindActionCreators сам создаёт обёртку dispatch (второй параметр)
// и в компонентах можно будет использовать экшены сразу как функции
export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(actions, dispatch);
};
