// hooks/useTheme.js
import { useEffect } from 'react'

export function useTheme(themes, defaultTheme = 'theme-light') {
    useEffect(() => {
        const savedTheme = localStorage.getItem("preferred-theme") || defaultTheme
        document.documentElement.classList.remove(...themes)
        document.documentElement.classList.add(savedTheme)
    }, [])
}
