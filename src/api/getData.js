import fetch from '../plugins/fetch';
export const adminLogin = params => fetch('/api/login', params, 'POST');
export const getCategory = params => fetch('/api/newCategory', params, 'POST');
export const newArticle = params => fetch('/api/newArticle', params, 'POST');
