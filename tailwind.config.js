
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./views/**/*.pug",
        "./public/**/*.js",
        "./src/**/*.js",
        "./src/**/*.ts",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}