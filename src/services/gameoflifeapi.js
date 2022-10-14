import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHeaders = {
  'x-rapidapi-host': process.env.REACT_APP_LIFE_API_HOST,
  'x-rapidapi-key': process.env.REACT_APP_LIFE_API_KEY,
};

const baseUrl = process.env.REACT_APP_LIFE_BASE_URL;

const createRequest = (url, options) => ({
  url,
  headers: apiHeaders,
  params: options,
});

export const lifeApi = createApi({
  reducerPath: 'lifeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Custom'],
  endpoints: (builder) => ({
    getWikiPatternNames: builder.query({
      query: () =>
        createRequest('/wikicollection/patterns/', {
          select: '["title"]',
          limit: 2339,
        }),
    }),
    getWikiPatternById: builder.query({
      query: (id) =>
        createRequest(`/wikicollection/patterns/${id}`, {
          select: '["author","title","description","size","rleString","date"]',
        }),
    }),
    getCustomPatternNames: builder.query({
      query: () =>
        createRequest('/customcollection/patterns/', {
          select: '["title"]',
          limit: 2339,
        }),
      providesTags: ['Custom'],
    }),
    getCustomPatternById: builder.query({
      query: (id) =>
        createRequest(`/customcollection/patterns/${id}`, {
          select: '["author","title","description","size","rleString","date"]',
        }),
    }),
    addCustomPattern: builder.mutation({
      query: (formData) => ({
        headers: { ...apiHeaders, 'Content-Type': 'application/json' },
        url: '/customcollection/patterns/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Custom'],
    }),
    deletePattern: builder.mutation({
      query(id) {
        return {
          headers: { ...apiHeaders },
          url: `/customcollection/patterns/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Custom'],
    }),
  }),
});

export const {
  useGetWikiPatternNamesQuery,
  useGetWikiPatternByIdQuery,
  useGetCustomPatternNamesQuery,
  useGetCustomPatternByIdQuery,
  useAddCustomPatternMutation,
  useDeletePatternMutation,
} = lifeApi;
