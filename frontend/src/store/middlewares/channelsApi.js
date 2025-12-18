import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../api/routes.js';

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channelsPath(),
    prepareHeaders: (headers, { getState }) => {
      const { auth: { userToken } } = getState();

      if (userToken) {
        headers.set('Authorization', `Bearer ${userToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Channels'],
  endpoints: (build) => ({
    getChannels: build.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
    addChannel: build.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: build.mutation({
      query: (channel) => ({
        url: channel.id,
        method: 'PATCH',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: build.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

export default channelsApi;
