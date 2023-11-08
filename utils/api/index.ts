import { PatternResponse, PatternProps, PatternAPIError } from '@/types';

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

export const fetchAllWikiPatterns = async (
  queryParams?: PatternProps,
): Promise<PatternResponse | PatternAPIError> => {
  const url = constructUrl(`${baseUrl}/wikicollection/patterns`, queryParams ?? {});

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    const error = (await res.json()) as PatternAPIError;
    console.error(error);
    throw error;
  }

  return res.json() as unknown as PatternResponse;
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

  return (await response.json()) as PatternResponse;
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
