import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHeaders = {
  'x-rapidapi-host': process.env.REACT_APP_LIFE_API_HOST,
  'x-rapidapi-key': process.env.REACT_APP_LIFE_API_KEY,
};

const baseUrl = process.env.REACT_APP_LIFE_BASE_URL;

const createRequest = (url, params) => ({
  url,
  headers: apiHeaders,
  params: { select: params, count: 5 },
});

export const lifeApi = createApi({
  reducerPath: 'lifeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPatternNames: builder.query({
      query: () => createRequest('/wikicollection/patterns/', '["title"]'),
    }),
  }),
});

export const { useGetPatternNamesQuery } = lifeApi;
