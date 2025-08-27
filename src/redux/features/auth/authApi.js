import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: `${process.env.REACT_APP_API_URL}`,
        baseUrl: `${getBaseUrl()}/api/auth`, // Replace with your actual API URL
        credentials: 'include', // Include credentials (cookies) in requests
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Users"],
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: { role }
            }),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: `/users/edit-profile`,
                method: "PATCH",
                body: profileData
            }),
        })
    }),
});

export const { useRegisterUserMutation, useLoginMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation, useEditProfileMutation } = authApi;
export default authApi;
