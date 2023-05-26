import React, { createContext, useState, useContext } from "react";


import dark from "../styles/themes/dark";
import ligth from "../styles/themes/ligth";

interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

interface ITheme {
    title: string;

    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        sucess: string;
        info: string;
        warning: string;

    },
}

const ThemeContext = createContext<IThemeContext>({
    toggleTheme: () => {},
    theme: {} as ITheme,
  });

  const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSaved = localStorage.getItem('@minha-carteira:theme');

        if(themeSaved){
            return JSON.parse(themeSaved)
        }else{
            return dark;
        }
    });

    const toggleTheme = () => {
        if(theme.title ==='dark'){
            setTheme(ligth);
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(ligth));
        }else {
            setTheme(dark);
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark));

        }
    };
    return (
        <ThemeContext.Provider value = {{toggleTheme, theme}}>
            {children}
        </ThemeContext.Provider>
    )
};

function useTheme(): IThemeContext {
    const context = useContext (ThemeContext);

    return context;
}

export {ThemeProvider, useTheme}