import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FaceAuth from '../components/FaceAuth';
const FaceLogin = () => {
    const navigate = useNavigate();
	const emailRef = useRef();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
    const [openFace, setOpenFace] = useState(false)

    useEffect(() => {
     
    }, [openFace])
    
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			const res = await axios.post(
				"/api/user/login2",
				{
					email: emailRef.current.value,
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
            setOpenFace(true)
		} catch (err) {
			e.target.reset();
			console.error(err);
			setError(err.response ? err.response.data.msg : err.msg);
			setLoading(false);
		}
	};

	return (
		<div>
    {!openFace ? (
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
    
      <div className="mt-3">
        <button
          type="submit"
          disabled={loading || success}
          className={`w-full bg-green-500 text-white px-10 rounded ${
            loading && 'opacity-75 cursor-not-allowed'
          }`}
        >
          {loading && (
            <span className="spinner-grow spinner-grow-sm mx-1" role="status" aria-hidden="true"></span>
          )}
          Verify Email
        </button>
      </div>
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
  ): (<FaceAuth />)}
</div>

	);
}

export default FaceLogin