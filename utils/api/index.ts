import { PatternResponse, PatternProps } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const headers = {
  apikey: process.env.NEXT_PUBLIC_API_KEY!,
};

export const warmUpAPI = async () => {
  try {
    if (!baseUrl) throw new Error('No base url');
    await fetch(baseUrl);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchAllWikiPatterns = async (patternProps: PatternProps) => {
  const { select, offset, limit } = patternProps;

  const queryParams = {
    select,
    offset,
    limit,
  };

  const url = constructUrl(`${baseUrl}/wikicollection/patterns`, queryParams);

  const response = await fetch(url, {
    headers,
  });

  const result = (await response.json()) as PatternResponse[];

  return result;
};

export const fetchWikiPatternById = async (id: string, patternProps: PatternProps) => {
  const { select, offset, limit } = patternProps;
  const queryParams = {
    select,
    offset,
    limit,
  };

  const url = constructUrl(`${baseUrl}/wikicollection/patterns/${id}`, queryParams);
  const response = await fetch(url, {
    headers,
  });

  const result = (await response.json()) as PatternResponse;

  return result;
};

const constructUrl = (baseUrl: string, queryParams: PatternProps) => {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  }
  return url;
};
