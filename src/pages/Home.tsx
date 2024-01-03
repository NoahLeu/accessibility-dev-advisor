import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="bg-gray flex flex-col justify-center items-center w-screen h-screen">
			<h1>Accessibility Advisor for Developers</h1>
			<p>context based accessibility advice for developers</p>
			<Link to="/analysis">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Click here to start
				</button>
			</Link>
		</div>
	);
};

export default Home;
