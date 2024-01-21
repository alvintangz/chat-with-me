/** @type {import('tailwindcss').Config} */
import exposeColors from "@tailwind-plugin/expose-colors";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            white: "#fff",
            primary: "#0d2c54", // Prussian Blue
            secondary: "#9cafb7", // Pewter Blue
            tertiary: "#3a5a40", // Hunter Green
            quaternary: "#de6b48", // Burnt Sienna
            quinary: "#dbf5a7", // Yellow Green Crayola
        },
        extend: {
            fontFamily: {
                serif: ["Rubik"],
            },
            keyframes: {
                opacityOnAndOff: {
                    "0%": { opacity: 0 },
                    "50%": { opacity: 1 },
                    "100%": { opacity: 0 },
                },
            },
        },
    },
    plugins: [exposeColors({ extract: ["quinary"] })],
};
