import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-bd-react-redux-node-server.vercel.app/',
  }),
  tagTypes: [
    'comments',
    'editBooks',
    'deleteBooks',
    'userData',
    'addNewProduct',
  ],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/products',
    }),
    getSpecificBooks: builder.query({
      query: (id) => `/product/${id}`,
    }),
    //comment api
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),

    //edit books
    editBooks: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/books/${_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['editBooks'],
    }),
    //delete books
    deleteBooks: builder.mutation({
      query: (_id) => ({
        url: `/book/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deleteBooks'],
    }),
    //User Information
    userData: builder.mutation({
      query: ({ data }) => ({
        url: '/user',
        method: 'POST',
        bosy: data,
      }),
      invalidatesTags: ['userData'],
    }),
    //comment api
    addNewProduct: builder.mutation({
      query: (data) => ({
        url: `/product`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['addNewProduct'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSpecificBooksQuery,
  usePostCommentMutation,
  useGetCommentQuery,
  useEditBooksMutation,
  useDeleteBooksMutation,
  useUserDataMutation,
  useAddNewProductMutation,
} = api;
