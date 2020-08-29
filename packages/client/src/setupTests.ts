import 'jest-extended'
import '@testing-library/jest-dom/extend-expect'
import { server } from 'freya-shared/mocks'
require('dotenv').config()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })
