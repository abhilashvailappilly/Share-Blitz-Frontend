import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <label
      htmlFor="themeToggle"
      className="themeToggle st-sunMoonThemeToggleBtn w-12 h-12 relative cursor-pointer"
    >
      <input
        type="checkbox"
        id="themeToggle"
        className="themeToggleInput opacity-0 w-full h-full absolute inset-0"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <svg
        width="48"
        height="48"
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="none"
        className="absolute left-0 w-full h-full transition-transform transform rotate-[40deg]"
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="20" height="20" fill="white"></rect>
          <circle cx="11" cy="3" r="8" fill="black"></circle>
        </mask>
        <circle
          cx="10"
          cy="10"
          r="8"
          mask="url(#moon-mask)"
          transform-origin="center center"
          className="transition-transform transform scale-100 sunMoon"
        ></circle>
        <g>
          <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
          <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5"></circle>
          <circle className="sunRay sunRay3" cx="6" cy="16.928" r="1.5"></circle>
          <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
          <circle className="sunRay sunRay5" cx="6" cy="3.1718" r="1.5"></circle>
          <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5"></circle>
        </g>
      </svg>
    </label>
  );
};

export default ThemeToggle;