import { Head, RollerCoasterCard } from '@/components';
import type { RollerCoaster } from '@/types';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';

type HomeProps = {
  randomCoaster: RollerCoaster;
};

export default function Home({ randomCoaster }: HomeProps) {
  return (
    <>
      <Head metaContent="Show roller coasters information">
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="flex items-center justify-center">
          <h1 className="text-3xl font-extrabold font-mono">Theme Parks App</h1>
        </section>

        <section>
          <h2>Random Coaster</h2>
          <RollerCoasterCard
            id={randomCoaster.id}
            name={randomCoaster.name}
            image={randomCoaster.mainPicture?.url}
            parkName={randomCoaster.parkName}
            status={randomCoaster.status.state}
            state={randomCoaster.state}
            city={randomCoaster.city}
            region={randomCoaster.region}
          />
        </section>
        <section className="flex items-center justify-center mt-4">
          <Link
            className="font-semibold bg-indigo-500 rounded-md p-4 hover:-rotate-6 hover:scale-110 text-white transition-all duration-150"
            href="/coasters/1"
          >
            Discover roller coasters!
          </Link>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const randomCoaster = await fetch(`${process.env.API_URL}/api/coasters/random`).then((response: Response) =>
    response.json()
  );

  return {
    props: {
      randomCoaster,
    },
  };
};