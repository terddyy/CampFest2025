import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-dark">
      <div className="container mx-auto max-w-8xl pt-8 sm:pt-14 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col sm:flex-row justify-center items-center py-6 gap-6">
          <p className="text-white/40 text-sm text-center ">
          <Link href="https://terd.zentariph.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer"> ©2025 Zentari - Design & Developed by <span className="text-teal-400">Terd Inocentes</span></Link>
          </p>
          <div className="flex gap-8 items-center">
            <Link href="#" className="text-white/40 hover:text-primary text-sm">
              Terms of service
            </Link>
            <Link href="#" className="text-white/40 hover:text-primary text-sm">
              Privacy policy
            </Link>
            <Link href="/login" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 text-sm font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;