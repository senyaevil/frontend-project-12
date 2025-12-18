import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../api/routes.js';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messagesPath(),
    prepareHeaders: (headers, { getState }) => {
      const { auth: { userToken } } = getState();

      if (userToken) {
        headers.set('Authorization', `Bearer ${userToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    editMessage: builder.mutation({
      query: (message) => ({
        method: 'PATCH',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),

});

export default messagesApi;
