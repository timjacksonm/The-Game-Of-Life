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
    getWikiPatternNames: builder.query({
      query: () =>
        createRequest('/wikicollection/patterns/', {
          select: '["title"]',
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
        }),
    }),
    getCustomPatternById: builder.query({
      query: (id) =>
        createRequest(`/customcollection/patterns/${id}`, {
          select: '["author","title","description","size","rleString","date"]',
        }),
    }),
  }),
});

export const {
  useGetWikiPatternNamesQuery,
  useGetWikiPatternByIdQuery,
  useGetCustomPatternNamesQuery,
  useGetCustomPatternByIdQuery,
} = lifeApi;
