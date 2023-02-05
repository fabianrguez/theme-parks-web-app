import { Head, RollerCoasterCard, SearchSuggestionsField } from '@/components';
import paginationStyles from '@/styles/pagination.module.scss';
import { RollerCoaster } from '@/types';
import Pagination from '@etchteam/next-pagination';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useCallback } from 'react';

interface CoastersPageProps {
  coasters: any[];
  total: number;
  page: number;
  apiUrl: string;
}

const LIMIT: number = 20;

export default function CoastersPage({ coasters, total, page, apiUrl }: CoastersPageProps) {
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
    <>
      <Head pageTitle="Information" metaContent={`Show page ${page} of roller coasters information`}></Head>
      <main className="flex flex-col">
        <SearchSuggestionsField searchUrl={`${apiUrl}/api/coasters/search`} mapSuggestions={mapSuggestions} />
        <section className="flex flex-col gap-4 p-4">
          {coasters?.map((coaster: any) => (
            <RollerCoasterCard
              key={coaster.id}
              id={coaster.id}
              name={coaster.name}
              image={coaster.mainPicture.url}
              parkName={coaster.parkName}
              status={coaster.status.state}
              state={coaster.state}
              city={coaster.city}
              region={coaster.region}
            />
          ))}
          <Pagination total={total} sizes={[LIMIT]} theme={paginationStyles} />
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page } = query;

  const offset: number = (Number(page) - 1) * LIMIT + 1;
  const response: Response = await fetch(`${process.env.API_URL}/api/coasters?offset=${offset}&limit=${LIMIT}`);
  const data: any = await response.json();

  return {
    props: {
      coasters: data.data,
      total: Number(data.pagination.total),
      page: Number(page),
      apiUrl: process.env.API_URL,
    },
  };
};
