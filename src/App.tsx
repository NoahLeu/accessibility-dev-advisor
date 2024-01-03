import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Result from "./pages/Result";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/analysis" element={<Analysis />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</>
	);
}

export default App;
