import React, { useRef } from 'react'
import CamPreview from './CamPreview';
import axios from "axios";
import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { imageCapturer } from "./imageCapturer";

const FaceAuth = () => {
    const navigate = useNavigate();
	const videoParentRef = useRef();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			const formData = new FormData();
			const imgFile = await imageCapturer({ videoParentRef });
			formData.append("pic", imgFile);
			const res = await axios.post("/api/user/faceauth", formData, {
				withCredentials: true,
			});
			setSuccess(res.data.msg);
			setLoading(false);
			setTimeout(() => {
				alert(res.data.msg);
        localStorage.setItem("user", JSON.stringify(res.data.user))
				navigate("/");
        
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
  <div className="max-w-md mx-auto mt-4 p-4" style={{ maxWidth: "450px" }}>
    <form className="mx-4 p-4 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h3 className="text-left text-2xl pt-4 pb-3">Fack Lock</h3>
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
      <div className="relative w-full" ref={videoParentRef}>
        <CamPreview />
      </div>
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
          Authenticate
        </button>
      </div>
      <div className="mt-3 text-center text-gray-500">
        <span>
          Login with a different account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Login
          </a>
        </span>
      </div>
    </form>
  </div>
</div>

	);
};
export default FaceAuth