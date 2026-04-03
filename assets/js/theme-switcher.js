// Theme Toggle Functionality
const themeToggle = () => {
    // Select the root HTML element
    const rootElement = document.documentElement;

    // Get the current theme mode
    const currentTheme = rootElement.getAttribute('data-theme-mode');

    // Toggle between light and dark themes
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Update the root element's theme attribute
    rootElement.setAttribute('data-theme-mode', newTheme);

    // Persist theme preference in local storage
    localStorage.setItem('theme-preference', newTheme);
};

// Initialize theme on page load
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme-preference');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme based on saved preference or system preference
    const initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme-mode', initialTheme);
};

// Add event listener for theme toggle
const themeToggleButton = document.querySelector('#theme-toggle');
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', themeToggle);
}

// Initialize theme when script loads
initializeTheme();