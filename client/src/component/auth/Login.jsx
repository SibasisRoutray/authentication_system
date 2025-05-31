import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/authApi';
 import { toast } from 'react-toastify'; // Uncomment if using toast

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loginUser, {
    data: loginData,
    error: loginError,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess,
  }] = useLoginMutation();

 

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({ email, password });
  };

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data?.message || "Login failed");
    }
  }, [
    loginIsSuccess,
    loginData,
    loginError,
    navigate,
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 w-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Welcome Back 👋
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loginIsLoading}
          className="w-full py-3 text-white bg-primary hover:bg-primary-dark transition-colors duration-300 rounded-lg font-semibold"
        >
          {loginIsLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account? <a href="/register" className="text-primary font-medium hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
