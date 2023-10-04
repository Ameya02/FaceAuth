import React, { useRef, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import FaceAuth from '../components/FaceAuth';
const Signup = () => {
    const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			if (passwordRef.current.value !== passwordConfirmRef.current.value)
				throw new Error("Passwords do not match");
			const res = await axios.post(
				"https://face-auth-server.onrender.com/api/user/signup",
				{
					email: emailRef.current.value,
					password: passwordRef.current.value,
				},
				{
					withCredentials: true,
				}
			);
			setSuccess(res.data.msg);
			setLoading(false);
			setTimeout(() => {
				alert(res.data.msg);
			}, 100);
		} catch (err) {
			e.target.reset();
			console.error(err);
			setError(err.response ? err.response.data.msg : err.msg);
			setLoading(false);
		}
	};

	return (
        <div>
        {!success ? (
        <div className="max-w-md mx-auto mt-4 bg-white p-4 rounded-lg shadow-md">
          <form className="px-4 py-6" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold text-left py-4">Signup</h3>
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
              className={`w-full py-2 px-3 mb-3 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded`}
              minLength={6}
              placeholder="Password"
              name="password"
              required
              ref={passwordRef}
              disabled={loading}
            />
            <input
              type="password"
              className={`w-full py-2 px-3 mb-3 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded`}
              minLength={6}
              placeholder="Confirm Password"
              name="confirm password"
              required
              ref={passwordConfirmRef}
              disabled={loading}
            />
            <div className="mt-4">
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
                Signup
              </button>
            </div>
            <div className="mt-4 text-center text-gray-500">
              <span>
                Already have an account?{' '}
                <Link to="/facelogin" className="text-green-500 hover:underline">
                 Face Login
                </Link>
              </span>
            </div>
          </form>
        </div>) :(<FaceAuth />)}
      </div>
      
	);
};

export default Signup