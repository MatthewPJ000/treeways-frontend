"use client"
// ThemeButton.tsx
import React, { useState } from 'react';

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", 
  "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", 
  "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", 
  "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", 
  "dim", "nord", "sunset"
];

export default function ThemeButton() {
  const [theme, setTheme] = useState('light');

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="theme-selector" className="text-white-700 font-medium">
      Themes:
      </label>
      <select
        id="theme-selector"
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        className="select select-bordered select-sm w-full max-w-xs"
      >
        {themes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
