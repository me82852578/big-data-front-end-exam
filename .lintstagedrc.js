const path = require('path')

const buildEslintCommand = (filenames) =>
  `eslint --ext .js,.jsx,.ts,.tsx --ignore-path .gitignore --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
