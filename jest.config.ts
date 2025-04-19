// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock styles
        '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.ts', // Mock images
    },
    // moduleNameMapper: {
    //     '^@/(.*)$': '<rootDir>/src/$1',
    //     '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock styles
    //     '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.ts', // Optional: Mock images
    // },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
