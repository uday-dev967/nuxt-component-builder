module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ["@nuxtjs", "plugin:nuxt/recommended", "prettier"],
	parserOptions: {
		parser: "@babel/eslint-parser",
		requireConfigFile: false,
	},
	globals: {},
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error"],
		quotes: ["error", "double"],
		semi: ["error", "never"],
	},
}

// env: {
//   browser: true,
//   node: true,
// },
// parserOptions: {
//   parser: '@babel/eslint-parser',
//   requireConfigFile: false,
// },
// extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
// plugins: [],
// // add your custom rules here
// rules: {},
