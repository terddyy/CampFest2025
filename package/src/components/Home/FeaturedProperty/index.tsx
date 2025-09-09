"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProprty } from "@/app/api/featuredproperty";
import { Icon } from "@iconify/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const FeaturedProperty: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };


  return (
    <section className='py-14 lg:py-28'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='mb-16'>
          <div className='flex gap-2.5 items-center justify-center mb-3'>
            <span>
              <Icon
                icon={'ph:house-simple-fill'}
                width={20}
                height={20}
                className='text-primary'
              />
            </span>
            <p className='text-base font-semibold text-dark/75 dark:text-white/75'>
              Featured Properties
            </p>
          </div>
          <h2 className='text-40 lg:text-52 font-medium text-black dark:text-white text-center tracking-tight leading-11 mb-2'>
            Your next chapter, in the perfect home.
          </h2>
          <p className='text-xm font-normal text-black/50 dark:text-white/50 text-center'>
            Experience refined living with unique blend of modern design and timeless elegance
          </p>
        </div>

        <Carousel setApi={setApi} className='w-full'>
          <CarouselContent className='-ml-1'>
            {featuredProprty.map((item, index) => (
              <CarouselItem
                key={index}
                className='pl-1 md:basis-1/2 lg:basis-1/3'>
                <div className='p-1'>
                  <div className='relative rounded-2xl overflow-hidden group'>
                    <Link href={`/properties/${item.title}`}>
                      <Image
                        src={item.image}
                        alt='featured property image'
                        width={300}
                        height={200}
                        className='w-full object-cover rounded-2xl transition group-hover:scale-110 h-[300px]'
                        unoptimized={true}
                      />
                    </Link>
                    <Link href={`/properties/${item.title}`} className='absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-8 pb-8 group-hover:top-0 duration-500'>
                      <div className='flex justify-end mt-6 mr-6'>
                        <div className='bg-white text-dark rounded-full w-fit p-4'>
                          <Icon icon='ph:arrow-right' width={24} height={24} />
                        </div>
                      </div>
                      <div className='flex flex-col gap-2.5'>
                        <h3 className='text-white text-2xl'>
                          {item.title}
                        </h3>
                        <p className='text-white/80 text-base leading-6'>
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='py-2 text-center text-sm text-black dark:text-white'>
            {current} of {count}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedProperty;
    