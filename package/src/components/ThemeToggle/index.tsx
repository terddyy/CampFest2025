'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="text-gray-400 hover:text-white focus:outline-none"
    >
      {theme === 'dark' ? (
        <Icon icon="ph:sun-fill" className="w-5 h-5" />
      ) : (
        <Icon icon="ph:moon-fill" className="w-5 h-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
