/**@type {import("prettier").Config} */
const config = {
    "tabWidth": 2,
    "semi": false,
    "singleQuote": true,
    "jsxSingleQuote": true,
    "plugins": [
        "@trivago/prettier-plugin-sort-imports",
        "prettier-plugin-tailwtaindcss",
    ],
    "tailwindFunctions": ['clsx'],
    "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^@app/(.*)$", "^[./]"],
    "importOrderSeparation": false,
}

export default config