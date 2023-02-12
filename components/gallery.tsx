import type { MouseEvent } from 'react';
import Image from './image';
import { useIntersectionObserver } from '@/hooks';

export declare type GalleryImage = {
  id: number;
  url: string;
  caption: string;
};

declare type GalleryProps = {
  className?: string;
  images: GalleryImage[];
};

declare type GalleryItemProps = {
  index: number;
  url: string;
  caption: string;
  onItemIntersect: (entry: IntersectionObserverEntry[]) => void;
};

const GalleryItem = ({ index, url, caption, onItemIntersect }: GalleryItemProps) => {
  const itemRef = useIntersectionObserver(onItemIntersect);

  return (
    <figure ref={itemRef} data-index={index} className="shrink-0 snap-always snap-center overflow-hidden">
      <Image src={url} alt={caption} className="object-cover aspect-square h-80 w-auto" />
      <figcaption className="text-xs font-bold font-mono">{caption}</figcaption>
    </figure>
  );
};

export default function Gallery({ className, images }: GalleryProps) {
  const dotClasses = 'gallery__dot cursor-pointer inline-flex bg-indigo-500 h-2 w-2 rounded-full transition-all';
  const cssClasses = [
    'gallery__list relative w-full flex gap-6 snap-x snap-mandatory px-6 overflow-x-auto',
    className,
  ].join(' ');

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      const dots: NodeListOf<HTMLLIElement> = document.querySelectorAll<HTMLLIElement>('.gallery__dot');

      const currentActiveDot = Array.from(dots).find((dot: HTMLLIElement) =>
        dot.classList.contains('gallery__dot--active')
      );
      currentActiveDot?.classList.remove('gallery__dot--active');

      const activeIndex = entry.target.getAttribute('data-index');
      const activeDot = Array.from(dots).find(
        (dot: HTMLLIElement) => dot.getAttribute('data-image-index') === activeIndex
      );
      activeDot?.classList.add('gallery__dot--active');
    }
  };

  const onDotClicked =
    (imageIndex: number) =>
    (_: MouseEvent<HTMLLIElement>): void => {
      const image = document.querySelector(`figure[data-index="${imageIndex}"]`);

      image?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

  return (
    <div className="gallery">
      <div className={cssClasses}>
        {images.map((image: GalleryImage, index: number) => (
          <GalleryItem
            key={image.id}
            index={index}
            url={image.url}
            caption={image.caption}
            onItemIntersect={onIntersect}
          />
        ))}
      </div>
      <ul className="flex mt-4 gap-1 w-full h-2 items-center justify-center">
        {Array.from({ length: images.length })
          .fill(null)
          .map((_: unknown, index: number) => (
            <li
              key={index}
              data-image-index={index}
              className={index === 0 ? `gallery__dot--active ${dotClasses}` : `${dotClasses}`}
              onClick={onDotClicked(index)}
            />
          ))}
      </ul>
    </div>
  );
}
