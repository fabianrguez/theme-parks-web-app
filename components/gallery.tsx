import galleryStyles from '@/styles/gallery.module.scss';
import Image from './image';

export declare type GalleryImage = {
  id: number;
  url: string;
  caption: string;
};

declare type GalleryProps = {
  className?: string;
  images: GalleryImage[];
};

export default function Gallery({ className, images }: GalleryProps) {
  const cssClasses = ['relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto', className].join(' ');

  return (
    <div className={galleryStyles['gallery']}>
      <div className={cssClasses}>
        {images.map((image: GalleryImage) => (
          <figure key={image.id} className="shrink-0 snap-always snap-start overflow-hidden">
            <Image src={image.url} alt={image.caption} className="object-cover aspect-square h-80" />
            <figcaption className="text-xs font-bold font-mono">{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
