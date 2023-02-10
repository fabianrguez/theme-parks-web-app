import { CoastersParksSearchField, Head, RollerCoasterCard, Sticky } from '@/components';
import paginationStyles from '@/styles/pagination.module.scss';
import Pagination from '@etchteam/next-pagination';
import type { GetServerSideProps } from 'next';

interface CoastersPageProps {
  coasters: any[];
  total: number;
  page: number;
  apiUrl: string;
}

const LIMIT: number = 20;

export default function CoastersPage({ coasters, total, page }: CoastersPageProps) {
  return (
    <>
      <Head pageTitle="Information" metaContent={`Show page ${page} of roller coasters information`}></Head>
      <main className="flex flex-col">
        <Sticky position="top">
          <CoastersParksSearchField />
        </Sticky>
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
  const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coasters?offset=${offset}&limit=${LIMIT}`);
  const data: any = await response.json();

  return {
    props: {
      coasters: data.data,
      total: Number(data.pagination.total),
      page: Number(page),
    },
  };
};
