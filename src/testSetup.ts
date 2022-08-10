// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import server from './mock/server';

fetchMock.enableMocks();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
