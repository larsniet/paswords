import React, { createContext, useMemo, useState } from "react";

import useCustomEffect from "../hooks/useCustomEffect.hook";

export interface ThemeContextProps {
    theme: string;
    setTheme: (theme: string) => void;
}

/**
 * Theme Context.
 */

export const ThemeContext = createContext<ThemeContextProps>({
    theme: "light",
    setTheme: () => {},
});

/**
 * Theme Context Provider.
 *
 * @param value string
 * @param children ReactNode
 * @returns ReactNode
 */
export const ThemeContextProvider = ({
    value = "light",
    children,
}: {
    value?: string;
    children: React.ReactNode;
}) => {
    const [theme, setTheme] = useState(value);

    useCustomEffect(() => {
        const storeTheme = localStorage.getItem("theme");
        setTheme(storeTheme || "light");
        applyTheme(storeTheme || "light");
    }, []);

    /**
     * Apply theme to 'html' tag on DOM.
     *
     * @param theme string
     */
    const applyTheme = (theme: string = "light") => {
        let newTheme = theme;
        const html = document.getElementsByTagName("html")[0];
        localStorage.setItem("theme", theme);
        (html as any).setAttribute("data-theme", newTheme);
    };

    /**
     * Handle Theme change.
     *
     * @param theme string
     */
    const handleThemeChange = (theme: string) => {
        setTheme(theme);
        applyTheme(theme);
    };

    /**
     * Current context value for theme.
     */
    const val = useMemo(
        () => ({
            theme,
            setTheme: handleThemeChange,
        }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>
    );
};
