import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem('user'))|| null;
	console.log(user)
	useEffect(() => {
		if (user){
			navigate("/signup")
		}
	}, [])
	
	
	const logout = () => {
		localStorage.clear()
		navigate("/signup")
	}
	return (
		<div>
			<div style={{ maxWidth: "500px" }} className="mt-4 p-4 fs-5 lh-1 font-monospace rounded-3 card mx-auto">
				<p className="card-text">
					<b>User:</b> {user.email}
				</p>
				<p className="card-text">
					<b>Email:</b> {user.email}
				</p>
				<p className="card-text">
					<b>PrevLoign:</b> {user.createdAt}
				</p>
				<button className={`w-full bg-green-500 text-white py-2 my-4 rounded ${
            loading && 'opacity-75 cursor-not-allowed'
          }`} onClick={logout}>Logout</button>
			</div>
		</div>
	);
};

export default Home;