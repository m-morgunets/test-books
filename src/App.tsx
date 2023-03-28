import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SingleBook from "./pages/SingleBook/SingleBook";

function App() {
	return (
		<>
			<Routes>
				<Route path="/home" element={<HomePage />} />
				<Route path="/book/:id" element={<SingleBook />} />
				<Route path="/*" element={<Navigate to={"/home"} />} />
			</Routes>
		</>
	);
}

export default App;
