import { Pattern } from '@/types';

export const generatePatternFilter = (inputValue: string | undefined) => {
  const lowerCasedInputValue = (inputValue || '').toLowerCase();

  return function patternFilter(pattern: Pattern) {
    const { title, author } = pattern;
    const lowerCasedTitle = (title || '').toLowerCase();
    const lowerCasedAuthor = (author || '').toLowerCase();

    const isMatch =
      !inputValue ||
      lowerCasedTitle.includes(lowerCasedInputValue) ||
      lowerCasedAuthor.includes(lowerCasedInputValue);
    return isMatch;
  };
};
