import { useEffect, useRef, useState } from 'react'

export function useResponsiveMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const closeWhenOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const closeAtDesktopWidth = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeWhenOutside)
    document.addEventListener('keydown', closeWithKeyboard)
    window.addEventListener('resize', closeAtDesktopWidth)

    return () => {
      document.removeEventListener('pointerdown', closeWhenOutside)
      document.removeEventListener('keydown', closeWithKeyboard)
      window.removeEventListener('resize', closeAtDesktopWidth)
    }
  }, [])

  return {
    headerRef,
    menuOpen,
    closeMenu: () => setMenuOpen(false),
    toggleMenu: () => setMenuOpen((open) => !open),
  }
}
