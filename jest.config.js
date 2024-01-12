module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
        // Mocks SVG and other static file imports
        '\\.(svg|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
    ],
};