import type { RollerCoaster } from '@/types';
import { SearchSuggestionsField } from '@/components';
import Link from 'next/link';
import { useCallback } from 'react';

export default function CoasterParksSearchField() {
  const apiUrl: string = String(process.env.NEXT_PUBLIC_API_URL);

  const mapSuggestions = useCallback(
    (entry: { coasters: RollerCoaster[]; totalMatched: number }, searchTerm: string) =>
      entry.coasters.map((coaster: RollerCoaster) => (
        <Link key={coaster.id} href={`/coasters/detail/${coaster.id}`}>
          <span>
            <strong>[{coaster.region}]</strong> {coaster.name} - {coaster.parkName}
          </span>
        </Link>
      )),
    []
  );

  return (
    <SearchSuggestionsField
      searchUrl={`${apiUrl}/api/coasters/search`}
      placeholder="Search coaster by name or park..."
      mapSuggestions={mapSuggestions}
    />
  );
}
