module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: [
    "**/__tests__/**/*.spec.ts"
  ],
  bail: true,
  testEnvironment: "node"
};
