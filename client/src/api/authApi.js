import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {login, logout} from '../store/authSlice';  // Import logout action too
const USER_API_URL = 'http://localhost:8080/api/auth';
import { toast } from 'react-toastify';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: USER_API_URL, credentials: 'include'}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(login({user: result.data.user}));
                } catch (error) {
                    console.error('Login failed:', error);
                    toast.error(error?.data?.message || "Login failed");
                }
            }
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(logout());  // Clear redux state on success
                } catch (error) {
                    console.error('Logout failed:', error);
                    toast.error(error?.data?.message || "Logout failed");
                }
            }
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
