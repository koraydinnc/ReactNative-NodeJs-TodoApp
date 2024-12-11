import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const apiBaseUrl = process.env.API_BASE_URL;

export const todoApi = createApi({
    reducerPath:'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: apiBaseUrl}),
    endpoints: (builder) => ({
        addTask: builder.mutation({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask
            })
        })
    })

})


export const { useAddTaskMutation } = todoApi;