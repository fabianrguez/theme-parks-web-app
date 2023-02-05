import { Head, Image } from '@/components';
import { RollerCoaster } from '@/types';
import { log } from 'console';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type CoasterDetailPageProps = {
  coaster: RollerCoaster;
};

export default function CoasterDetailPage({ coaster }: CoasterDetailPageProps) {
  const router = useRouter();

  return (
    <>
      <Head pageTitle={coaster.name} metaContent={`${coaster.name} roller coaster information`} />
      <div className="flex items-center">
        <button className="btn--back" onClick={router.back}>
          Back
        </button>
        <h1 className="md:hidden inline-flex items-center justify-center w-full font-extrabold text-indigo-500 text-lg ml-2">
          {coaster.name}
        </h1>
      </div>
      <main className="flex flex-col p-0 md:px-32 md:py-10">
        <section className="grid grid-cols-1 md:grid-cols-2">
          <figure className="relative w-full max-h-fit md:max-h-96 md:max-w-fit h-full group overflow-hidden md:rounded-md">
            <Image
              src={coaster.mainPicture?.url}
              className="h-48 w-full object-cover md:h-full transition duration-300"
              alt={coaster.name}
            />
            <figcaption className="absolute bottom-0 text-center bg-indigo-500 text-white w-full max-h-0 group-hover:max-h-10 transition-all duration-500 rounded-t-lg">
              {coaster.mainPicture?.copyName} - {coaster.mainPicture?.copyDate}
            </figcaption>
          </figure>
          <div className="p-2 md:p-6">
            <header className="flex justify-between items-center py-2">
              <h1 className="hidden md:block font-extrabold text-3xl text-indigo-500">{coaster.name}</h1>
              <span className="bg-indigo-800 w-full md:w-fit text-white text-center font-semibold p-2 rounded-lg">
                {coaster.status.state}
              </span>
            </header>
            <h3 className="font-semibold text-xl">{coaster.parkName}</h3>
            <h4>{coaster.region}</h4>
            <div className="flex flex-col mt-4">
              <span className="font-bold">{coaster.make}</span>
              <span>
                {coaster.model} ({coaster.design})
              </span>
            </div>
          </div>
        </section>
        <section className="flex flex-col mt-4 p-2">
          <h2 className="font-semibold text-2xl">Stats</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 ">
            {Object.entries(coaster.stats ?? {}).map(([key, value]: [string, any], index: number) => (
              <li key={index}>
                <span className="font-semibold">{key}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const coaster: RollerCoaster = await fetch(`${process.env.API_URL}/api/coasters/${id}`)
    .then((response: Response) => response.json())
    .then((data: RollerCoaster) => data);

  return {
    props: {
      coaster,
    },
  };
};
