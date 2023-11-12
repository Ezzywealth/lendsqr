/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'\\.(css|scss)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
