export const generateRandomString = () =>
  window.btoa(Math.random()).slice(0, 20);
