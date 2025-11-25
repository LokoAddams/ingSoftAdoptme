// Jest setup: mock browser dialogs so jsdom tests don't throw
if (typeof window !== 'undefined') {
  window.alert = jest.fn();
  window.confirm = jest.fn(() => true);
}

// also expose on global for environments where tests reference global.alert
global.alert = global.alert || jest.fn();
global.confirm = global.confirm || jest.fn(() => true);

// Ensure a `fetch` function exists so tests can spyOn or mock it.
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn();
}

// Make navigator.onLine writable so tests can set it (some environments provide a getter-only).
if (typeof global.navigator === 'undefined') {
  global.navigator = {};
}
try {
  Object.defineProperty(global.navigator, 'onLine', {
    value: true,
    configurable: true,
    writable: true,
  });
} catch (e) {
  // ignore if cannot redefine; tests should still work when they don't set navigator.onLine
}
