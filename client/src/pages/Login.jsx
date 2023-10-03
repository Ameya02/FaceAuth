import React, { useRef, useState } from 'react'
import { Link, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate();
	const emailRef = useRef();
  const [searchParams,setSearchParams] = useSearchParams()
	const passwordRef = useRef();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
  const [openFace, setOpenFace] = useState(false)
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			const res = await axios.post(
				"/api/user/login",
				{
					email: emailRef.current.value,
					password: passwordRef.current.value,
				},
				{
					withCredentials: true,
				}
			);
      console.log(res.data.user);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
			setSuccess(res.data.msg);
			setLoading(false);
			setTimeout(() => {
				alert(res.data.msg);
       navigate("/")
			}, 1000);
		} catch (err) {
			e.target.reset();
			console.error(err);
			setError(err.response ? err.response.data.msg : err.msg);
			setLoading(false);
		}
	};

	return (
		<div>
    
  <div className="max-w-md mx-auto mt-4 p-4">
    <form className="mx-4 p-4 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h3 className="text-left text-2xl pt-4 pb-3">Login</h3>
      {error && (
        <div className="p-2 bg-red-200 text-red-700 rounded mb-4">
          <i className="bi bi-exclamation-triangle-fill mx-1"></i>
          {error}
        </div>
      )}
      {success && (
        <div className="p-2 bg-green-200 text-green-700 rounded mb-4">
          <i className="bi bi-check-circle-fill mx-1"></i>
          {success}
        </div>
      )}
      <input
        type="email"
        className={`w-full py-2 px-3 mb-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded`}
        placeholder="Email"
        name="email"
        required
        ref={emailRef}
        disabled={loading}
      />
      <input
        type="password"
        className={`w-full py-2 px-3 mb-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded`}
        minLength={6}
        placeholder="Password"
        name="password"
        required
        ref={passwordRef}
        disabled={loading}
      />
      <div className="mt-3">
        <button
          type="submit"
          disabled={loading || success}
          className={`w-full bg-blue-500 text-white py-2 rounded ${
            loading && 'opacity-75 cursor-not-allowed'
          }`}
        >
          {loading && (
            <span className="spinner-grow spinner-grow-sm mx-1" role="status" aria-hidden="true"></span>
          )}
          Login
        </button>
      </div>
      <button
         onClick={()=> navigate("/facelogin")}
          className={`w-full bg-green-500 text-white py-2 my-4 rounded ${
            loading && 'opacity-75 cursor-not-allowed'
          }`}
        >
          {loading && (
            <span className="spinner-grow spinner-grow-sm mx-1" role="status" aria-hidden="true"></span>
          )}
          FaceLogin
        </button>
    
      <div className="mt-3 text-center text-gray-500">
        <span>
        Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </span>
      </div>
    </form>
  </div>
</div>

	);
}

export default Login