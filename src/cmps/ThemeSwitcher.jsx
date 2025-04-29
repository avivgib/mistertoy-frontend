export function ThemeSwitcher() {
    const themes = [
      "theme-cheerful",
      "theme-pastel",
      "theme-neon",
      "theme-natural"
    ];
  
    const setTheme = (theme) => {
      document.documentElement.classList.remove(...themes)
      document.documentElement.classList.add(theme);
    }
  
    const toggleDarkMode = () => {
      document.documentElement.classList.toggle("theme-dark")
    }
  
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Choose a Color Theme 🎨</h2>
        {themes.map((theme) => (
          <button key={theme} onClick={() => setTheme(theme)}>
            {theme.replace("theme-", "")}
          </button>
        ))}
        <hr />
        <button onClick={toggleDarkMode}>
          🌙 Toggle Dark / ☀️ Light Mode
        </button>
      </div>
    )
  }
  