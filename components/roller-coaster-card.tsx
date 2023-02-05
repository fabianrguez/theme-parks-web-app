import { Image, LazyContent, Tooltip } from '@/components';
import Link from 'next/link';

interface RollerCoasterCardProps {
  id: number;
  name: string;
  image: string | undefined;
  parkName: string;
  status: string;
  state: string;
  city: string;
  region: string;
}

const Placeholder = (
  <div className="group animate-fadeIn max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl w-full relative min-h-[40]">
    <div className="md:flex">
      <div className="md:shrink-0 overflow-hidden relative md:aspect-square min-h-[10] min-w-[10]" />
      <div className="p-8 w-full">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-bold min-h-[2]"></div>
        <div className="tracking-wide text-sm text-black font-semibold min-h-[2]"></div>
        <div className="mt-4 min-h-[10]" />
        <div className="absolute top-5 right-5 bg-teal-200 p-2 rounded-xl text-gray-500 font-semibold min-h-[3]" />
      </div>
    </div>
  </div>
);

export default function RollerCoasterCard({
  id,
  name,
  image,
  parkName,
  status,
  state,
  city,
  region,
}: RollerCoasterCardProps) {
  return (
    <LazyContent placeholder={Placeholder} height={100}>
      <article className="group max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl w-full relative">
        <Link href={`/coasters/detail/${id}`}>
          <div className="md:flex">
            <figure className="md:shrink-0 overflow-hidden relative md:aspect-square">
              <Image
                className="h-48 w-full object-cover md:h-full md:w-48 group-hover:scale-125 transition duration-300"
                src={image}
                alt={name}
              />
            </figure>
            <div className="p-8 w-full">
              <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-bold">{name}</h2>
              <h4 className="tracking-wide text-sm text-black font-semibold">{parkName}</h4>
              <div className="mt-4">
                {state} - {city} - {region}
              </div>
              <span className="absolute top-5 right-5 bg-teal-200 p-2 rounded-xl text-gray-500 font-semibold">
                {status}
              </span>
            </div>
          </div>
        </Link>
      </article>
    </LazyContent>
  );
}
