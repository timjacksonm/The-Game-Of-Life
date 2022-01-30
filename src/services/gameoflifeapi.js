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
  endpoints: (builder) => ({
    getPatternNames: builder.query({
      query: () =>
        createRequest('/wikicollection/patterns/', {
          select: '["title"]',
          count: 2339,
        }),
    }),
    getPatternById: builder.query({
      query: (id) =>
        createRequest(`/wikicollection/patterns/${id}`, {
          select: '["author","title","description","size","rleString","date"]',
        }),
    }),
  }),
});

export const { useGetPatternNamesQuery, useGetPatternByIdQuery } = lifeApi;
