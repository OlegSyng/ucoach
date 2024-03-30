/**@type {import("prettier").Config} */
const config = {
    "tabWidth": 2,
    "semi": false,
    "singleQuote": true,
    "jsxSingleQuote": true,
    "plugins": [
        require("@trivago/prettier-plugin-sort-imports"),
        require("prettier-plugin-tailwindcss"),
    ],
    "tailwindFunctions": ['clsx', 'tv'],
    "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^@app/(.*)$", "^[./]"],
    "importOrderSeparation": false,
}

export default config