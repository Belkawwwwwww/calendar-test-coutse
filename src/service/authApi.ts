import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:6001"
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { username: string; password: string }) => {
                return {
                    url: "/users/signin",
                    method: "POST",
                    body,
                }
            }
        })
    })
})

export const {useLoginUserMutation} = authApi;
