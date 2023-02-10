import { CoastersParksSearchField, Gallery, Head, If, Image, Sticky } from '@/components';
import { GalleryImage } from '@/components/gallery';
import { useWindowSize } from '@/hooks';
import type { RollerCoaster, RollerCoasterPicture } from '@/types';
import { camelCaseToSpaceSeparated } from '@/utils';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type CoasterDetailPageProps = {
  coaster: RollerCoaster;
};

export default function CoasterDetailPage({ coaster }: CoasterDetailPageProps) {
  const router = useRouter();
  const { width } = useWindowSize();

  const displayStat = (stat: string | string[]) => {
    if (Array.isArray(stat)) {
      return new Intl.ListFormat().format(stat);
    }

    return stat;
  };

  const mapCoasterImagesToGallery = (images: RollerCoasterPicture[]): GalleryImage[] =>
    images.map((image: RollerCoasterPicture) => ({
      id: image.id,
      url: image.url,
      caption: `${image.copyName} - ${image.copyDate}`,
    }));

  return (
    <>
      <Head pageTitle={coaster.name} metaContent={`${coaster.name} roller coaster information`} />
      <Sticky
        position="top"
        className="coaster-detail-page__sticky-search flex flex-col items-center bg-white w-full transition-all shadow-lg"
      >
        <CoastersParksSearchField />
        {/* TODO: Move to custom component BacKNavigation */}
        <section className="flex w-full h-16 md:h-10 bg-inherit">
          <button className="btn--back h-full rounded-sm" onClick={router.back}>
            <span>Back</span>
          </button>
          <If condition={width < 768}>
            <div className="flex items-center overflow-hidden" title={coaster.name}>
              <h2 className="whitespace-nowrap justify-center w-full overflow-hidden font-extrabold text-indigo-500 text-lg ml-2 text-ellipsis">
                {coaster.name}
              </h2>
            </div>
          </If>
        </section>
      </Sticky>
      <main className="flex flex-col p-0 md:px-32 md:py-10">
        <section className="flex flex-col md:flex-row">
          <figure className="relative flex-1 w-full md:max-h-96 md:max-w-fit h-full group overflow-hidden md:rounded-md">
            <Image
              src={coaster.mainPicture?.url}
              className="h-92 w-full object-cover md:h-full transition duration-300"
              alt={coaster.name}
            />
            <figcaption className="absolute bottom-0 text-center bg-indigo-500 text-white w-full max-h-0 group-hover:max-h-10 transition-all duration-500 rounded-t-lg">
              {coaster.mainPicture?.copyName} - {coaster.mainPicture?.copyDate}
            </figcaption>
          </figure>
          <div className="px-2 md:px-6 flex-1">
            <header className="flex justify-between items-center py-2">
              <If condition={width > 768}>
                <h1 className="hidden md:block font-extrabold text-3xl text-indigo-500">{coaster.name}</h1>
              </If>
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
        <If condition={coaster.pictures.length > 0}>
          <section className="flex flex-col mt-4 p-2">
            <h2 className="font-bold text-2xl border-b-4 text-indigo-800 border-indigo-800">Gallery</h2>
            <Gallery className="mt-4" images={mapCoasterImagesToGallery(coaster.pictures)} />
          </section>
        </If>
        <If condition={Object.keys(coaster?.stats ?? {}).length > 0}>
          <section className="flex flex-col mt-4 p-2">
            <h2 className="font-bold text-2xl border-b-4 text-indigo-800 border-indigo-800">Stats</h2>
            <ul className="flex flex-col md:gap-0 md:flex-row flex-wrap justify-between">
              {Object.entries(coaster.stats ?? {}).map(([key, value]: [string, any], index: number) => (
                <li key={index} className="flex md:basis-1/3 my-1 md:my-4 h-max">
                  <span className="font-semibold">{camelCaseToSpaceSeparated(key)}:</span>
                  <p className="flex ml-2">{displayStat(value)}</p>
                </li>
              ))}
            </ul>
          </section>
        </If>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const coaster: RollerCoaster = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coasters/${id}`)
    .then((response: Response) => response.json())
    .then((data: RollerCoaster) => data);

  return {
    props: {
      coaster,
    },
  };
};
