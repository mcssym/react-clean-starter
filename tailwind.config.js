/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = withMT({
    content: ['./src/presentation/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Ysabeau', ...defaultTheme.fontFamily.sans],
                'serif': ['Ysabeau', ...defaultTheme.fontFamily.serif],
                'body': ['Ysabeau', 'system-ui', 'sans-serif']
            },
        },
        fontFamily: {
            'ysabeau': ['Ysabeau', 'sans-serif'],
        },
        colors: {
            // Override the default color palette with your custom colors
            primary: {
                light: '#8D6E63', // Brown Earth (light mode)
                dark: '#705C53',  // Darker variant for dark mode
            },
            secondary: {
                light: '#638D6E', // Earth green (light mode)
                dark: '#4D7053',  // Darker green for dark mode
            },
            tertiary: {
                light: '#8D6373',  // Earth pink (light mode)
                dark: '#705360',   // Darker pink for dark mode
            },
            error: {
                light: '#D32F2F',  // Bright red for errors (light mode)
                dark: '#B3261E',   // Darker error red for dark mode
            },
            surface: {
                light: '#FFFFFF',  // Light surface
                dark: '#1E1E1E',   // Dark surface
            },
            'on-primary': {
                light: '#FFFFFF',  // White text on primary (light mode)
                dark: '#FFFFFF',   // White text on primary (dark mode)
            },
            'on-secondary': {
                light: '#FFFFFF',  // White text on secondary (light mode)
                dark: '#FFFFFF',   // White text on secondary (dark mode)
            },
            'on-tertiary': {
                light: '#FFFFFF',  // White text on tertiary (light mode)
                dark: '#FFFFFF',   // White text on tertiary (dark mode)
            },
            'on-error': {
                light: '#FFFFFF',  // White text on error (light mode)
                dark: '#FFFFFF',   // White text on error (dark mode)
            },
            'on-surface': {
                light: '#000000',  // Black text on light surface
                dark: '#E0E0E0',   // Light grey text on dark surface
            },
            outline: {
                dark: '#BDBDBD',  // Outline color for light mode
                light: '#757575',   // Outline color for dark mode
            },
            // You can define additional custom colors or override defaults
        },
        borderRadius: {
            // Override default border-radius values
            DEFAULT: '12px',  // Set 12px as the default border radius
        }
    },
    plugins: [],
});
