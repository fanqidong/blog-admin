import fetch from '../plugins/fetch';
export const adminLogin = (username, password) =>
  fetch(
    '/api/login',
    {
      username,
      password
    },
    'POST'
  );
export const getCategory = params =>
  fetch(
    '/api/newCategory',
    {
      ...params
    },
    'POST'
  );
