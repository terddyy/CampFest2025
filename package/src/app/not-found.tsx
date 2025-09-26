import Image from "next/image";
import { Metadata } from "next/types";
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found | Homely",
};

const ErrorPage = () => {
  return (
    <>
      <section className="flex justify-center pb-0!">
        <Image
          src="/images/404.png"
          alt="404"
          width={490}
          height={450}
          unoptimized={true}
        />
      </section>
      <section className="text-center bg-cover relative overflow-x-hidden" >
        <div className='flex gap-2.5 items-center justify-center'>
          <span>
            <Icon
              icon={'fa6-solid:campground'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-black'>
            Error 404
          </p>
        </div>
        <h2 className="text-black text-52 relative font-bold dark:text-white " >
          Lost Your Way? Find Your Camp!
        </h2>
        <p className="text-lg text-black font-normal w-full mx-auto">
          Don&apos;t fret, adventurer! We&apos;ll guide you back to the festival grounds.
        </p>
        <Link href="/" className="mt-8 inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border border-primary-500 bg-primary-500 text-black duration-300 hover:bg-transparent hover:text-black text-sm sm:text-base font-semibold rounded-full">
          <Icon icon="solar:arrow-left-linear" width={20} height={20} className="mr-2" />
          Back to Home
        </Link>
      </section>
    </>
  );
};

export default ErrorPage;