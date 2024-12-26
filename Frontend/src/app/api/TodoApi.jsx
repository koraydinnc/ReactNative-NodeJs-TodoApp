import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = 'http://192.168.1.29:5000/api' ;

console.log("API Base URL:", apiBaseUrl);

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    addTodo: builder.mutation({
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
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: '/delete-todo',
        method: 'DELETE',
        params: { todoId },
      }),
    }),
    completedTodo: builder.mutation({
      query: (todoId) => ({
        url:'/completed-todo',
        method:'POST',
        params:{todoId}
      })
    })
  }),
});

export const { useAddTodoMutation, useGetTodoQuery, useDeleteTodoMutation, useCompletedTodoMutation } = todoApi;
