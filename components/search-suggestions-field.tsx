import { useDebounce } from '@/hooks';
import type { ChangeEvent } from 'react';
import { FocusEvent, useEffect, useState } from 'react';

type SearchFieldProps = {
  searchUrl: string;
  searchParam?: string;
  mapSuggestions: (entry: any, searchTerm: string) => any;
};

const defaultMapper = (entry: any, _: string) => entry;

export default function SearchSuggestionsField({
  searchUrl,
  searchParam = 'q',
  mapSuggestions = defaultMapper,
}: SearchFieldProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);
  const debouncedSearchValue = useDebounce(searchValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>): void => {
    e.preventDefault();

    if (!e.currentTarget.contains(e.relatedTarget) && isSuggestionsOpen) {
      setIsSuggestionsOpen(false);
    }
  };

  const handleFocus = (): void => {
    if (suggestions.length > 0) {
      setIsSuggestionsOpen(true);
    }
  };

  useEffect(() => {
    if (debouncedSearchValue) {
      const queryParams = new URLSearchParams({ [searchParam]: debouncedSearchValue });

      fetch(`${searchUrl}?${queryParams}`, { mode: 'cors' })
        .then((response: Response) => response.json())
        .then((data: any) => {
          const mapped = mapSuggestions(data, debouncedSearchValue);

          setSuggestions(mapped);

          if (mapped.length > 0) {
            setIsSuggestionsOpen(true);
          }
        });
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    }
  }, [debouncedSearchValue, searchParam, mapSuggestions, searchUrl]);

  return (
    <div
      className="sticky top-0 z-10 w-full h-16 px-4 flex flex-col items-center justify-center bg-white"
      aria-controls="suggestions"
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <div className="w-full md:w-[70%] lg:w-[30%]">
        <input
          type="search"
          className="bg-gray-50 border-2 border-indigo-500 text-black font-semibold placeholder:text-black text-sm rounded-lg outline-none block w-full p-2.5"
          placeholder="Roller coaster search ..."
          onChange={handleChange}
        />
      </div>
      {isSuggestionsOpen ? (
        <ul
          id="suggestions"
          className="absolute top-full bg-gray-50 dark:bg-gray-700 max-h-[40rem] w-[92%] md:w-[70%] lg:w-[30%] rounded-lg overflow-auto transition-all delay-700 hide-scrollbar"
        >
          {suggestions.map((suggestion: any, index: number) => (
            <li
              key={index}
              tabIndex={0}
              className="text-white p-4 after:border-b-2 cursor-pointer hover:dark:bg-gray-500 transition-all"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
