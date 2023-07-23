import { PatternResponse, patternProps } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const headers = {
  apikey: process.env.NEXT_PUBLIC_API_KEY!,
};

export const fetchAllWikiPatterns = async (patternProps: patternProps) => {
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

export const fetchWikiPatternById = async (id: string, patternProps: patternProps) => {
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

const constructUrl = (baseUrl: string, queryParams: patternProps) => {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  }
  return url;
};
