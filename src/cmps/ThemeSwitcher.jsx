import { useEffect, useRef, useState } from "react";

const themes = [
  "theme-light",
  "theme-dark",
  "theme-cheerful",
  "theme-pastel",
  // "theme-neon",
  "theme-natural"
]

export function ThemeSwitcher({ setActiveTheme }) {
  const buttonsRef = useRef({})

  const applyTheme = (theme) => {
    document.documentElement.classList.remove(...themes)

    if (theme !== "theme-light") {
      document.documentElement.classList.add(theme)
    }

    setActiveTheme(theme)
    localStorage.setItem("preferred-theme", theme)

    Object.values(buttonsRef.current).forEach((btn) =>
      btn.classList.remove("active-theme")
    )
    buttonsRef.current[theme]?.classList.add("active-theme")
  }

  return (
    <div className="theme-switcher">
      <h2>Themes 🎨</h2>
      <div className="theme-buttons">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => applyTheme(theme)}
            className="theme-btn"
            ref={(el) => (buttonsRef.current[theme] = el)}
          >
            {theme.replace("theme-", "")}
          </button>
        ))}
      </div>
    </div>
  )
}