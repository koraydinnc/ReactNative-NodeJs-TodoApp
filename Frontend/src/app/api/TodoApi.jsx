import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const apiBaseUrl = process.env.APP_API_BASE_URL || "http://192.168.1.11:5000/api";

console.log("API Base URL:", apiBaseUrl);  



export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({baseUrl:apiBaseUrl}), 
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (newTask) => ({
        url: '/add-todo',
        method: 'POST',
        body: newTask,
      }),
    }),
    getTodo: builder.query({
      query: () => ({
        url: '/get-todo',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddTaskMutation, useGetTodoQuery } = todoApi;
