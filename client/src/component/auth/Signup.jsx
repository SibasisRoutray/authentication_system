import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../api/authApi';
import { toast } from 'react-toastify';

const Signup = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [registerUser, { isLoading: registerIsLoading }] = useRegisterMutation();

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleLoginAfterSignup = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include', // important for cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      if(data){
         toast.success('Logged in successfully! 🎉');
      navigate('/'); // Redirect after login
      }
     
    } catch (err) {
      toast.error(err.message || 'Login failed after signup');
      navigate('/login'); // fallback to login page
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      }).unwrap();

      toast.success('Registration successful! Logging you in...');

      // Auto login after successful signup
      await handleLoginAfterSignup();
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 w-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
        autoComplete="off"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Create an Account 🚀
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 text-black dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-secondary hover:bg-secondary-dark transition-colors duration-300 rounded-lg font-semibold"
          disabled={registerIsLoading}
        >
          {registerIsLoading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-secondary font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
