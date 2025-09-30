'use client'

import Link from 'next/link';
import { Icon } from '@iconify/react';

interface BackButtonProps {
  href: string;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, text }) => {
  return (
    <Link 
      href={href} 
      scroll={false}
      onClick={() => {
        if (window.location.pathname === '/') {
          document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = href;
        }
      }}
      className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
    >
      <Icon icon="ph:arrow-left" className="w-5 h-5" />
      {text}
    </Link>
  );
};

export default BackButton;
