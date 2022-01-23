import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHeaders = {
  'x-rapidapi-host': 'the-game-of-life.p.rapidapi.com',
  'x-rapidapi-key': 'Enter Key Here',
};

const baseUrl = 'https://the-game-of-life.p.rapidapi.com/';

const createRequest = (url, params) => ({
  url,
  headers: apiHeaders,
  params: params,
});

export const lifeApi = createApi({
  reducerPath: 'lifeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPatternNames: builder.query({
      query: () => createRequest('/wikicollection/patterns', '["title"]'),
    }),
  }),
});

export const { useGetPatternNamesQuery } = lifeApi;
