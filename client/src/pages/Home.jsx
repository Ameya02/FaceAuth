import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState({});
	
	useEffect(()=> {
		const u = JSON.parse(localStorage.getItem('user'))|| null;
		if(!u){
			navigate("/signup")
		}
		else{
			setUser(u)
		}
	},[user,navigate])
	
	
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
				<button className="w-full bg-green-500 text-white py-2 my-4 rounded "
        onClick={logout}>Logout</button>
			</div>
		</div>
	);
};

export default Home;