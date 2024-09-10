import "@testing-library/jest-dom";

const originalConsoleError = console.error;

// Suppress console.error in all tests
console.error = (...args) => {
  // Optionally, you can log the errors in a custom way or ignore them completely
  if (
    typeof args[0] === "string" &&
    args[0].includes("specific error message")
  ) {
    originalConsoleError(...args); // Allow specific error messages
  } else {
    // Otherwise, suppress all console.errors
    return;
  }
};
