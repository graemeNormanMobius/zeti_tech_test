import { createContext, useState, useLayoutEffect } from 'react';

export const ThemeContextV2 = createContext({
    isDarkTheme: false,
    toggleTheme: () => {}
});

const ThemeProvider = ({ children } : { children: any }) => {
    const isSessionThemeDarkMode = localStorage.getItem('darkMode');
    const [isDarkTheme, setIsDarkTheme] = useState(isSessionThemeDarkMode === 'true');
    localStorage.setItem('darkMode', isDarkTheme ? 'true' : 'false');
    const toggleTheme = (): void => {
        setIsDarkTheme(!isDarkTheme);
        localStorage.setItem('darkMode', isDarkTheme ? 'true' : 'false');
    };

    useLayoutEffect(() => {
        if (!isDarkTheme) {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.classList.add('dark-mode');
        }
    }, [isDarkTheme]);

    return (
        <ThemeContextV2.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContextV2.Provider>
    );
};

export default ThemeProvider;
