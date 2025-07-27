import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const apiUrl = process.env.REACT_APP_API_URL;
const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const[loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin =async (e) => {
       e.preventDefault();
       setLoading(true)
       try {
        const response = await axios.post(`${apiUrl}/api/login/`, {
            username,password
        })
        navigate("/Join");
        const decoded = jwtDecode(response.data.access);
        console.log(decoded);
        console.log(response.data);
        
       }
       catch(error) {
       console.error(error);
       
       }
       finally {
        setLoading(false)
       }
    }
  return (
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* {error && <p className="text-red-600 text-sm mb-4">{error}</p>} */}

        {loading && (
          <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium mb-2">
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Logging in...</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-900">
             User Name
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="userName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="userName"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm ${
                loading ? 'bg-indigo-200 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {loading?'Logging in..':'Login'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <span onClick={() => navigate("/Join")} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
