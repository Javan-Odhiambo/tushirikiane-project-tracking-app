import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

import { setAuth, logout } from '../features/auth/authSlice'
import { Mutex } from 'async-mutex'

// process.env.BACKEND_URL = process.env.BACKEND_URL

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
    baseUrl: `https://tushirikiane-project-tracking-app.onrender.com/`,
    credentials: "include"
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                    {
                        url: "/auth/jwt/refresh/",
                        method: "POST"
                    },
                    api,
                    extraOptions
                )
                if (refreshResult.data) {
                    api.dispatch(setAuth())
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logout())
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Project", "Members", "Projects", "Tasks", "Requests"],
    endpoints: builder => ({
    })
})
