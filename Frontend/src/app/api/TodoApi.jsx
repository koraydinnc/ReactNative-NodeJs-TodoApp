import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = 'http://192.168.1.44:5000/api' ;


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
    }),
    getDateTodos: builder.mutation({
      query: (date) => ({
        url:'/get-date-todos',
        method:'POST',
        params: {date}
      })
    }),
    updateTodo: builder.mutation({
      query: (todoId, updates) => ({
        url: `/update-todo/${todoId}`,
        method: 'PUT',
        body: updates
      })
    })
  }),
});

 export const {useAddTodoMutation,useUpdateTodoMutation, useGetTodoQuery, useDeleteTodoMutation, useCompletedTodoMutation, useGetDateTodosMutation } = todoApi;
