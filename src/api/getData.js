import fetch from '../plugins/fetch';
export const adminLogin = params => fetch('/api/login', params, 'POST');
export const newArticle = params => fetch('/api/newArticle', params, 'POST');

/**
 *
 * @param {*}  分类操作
 */

export const queryCategory = params => fetch('/api/queryCategory', params, 'GET');
export const createCategory = params => fetch('/api/createCategory', params, 'POST');
export const updateCategory = params => fetch('/api/updateCategory', params, 'POST');
export const deleteCategory = params => fetch('/api/deleteCategory', params, 'POST');

/**
 *
 * @param {*}  分类操作
 */

export const queryArticle = params => fetch('/api/queryArticle', params, 'GET');
export const createArticle = params => fetch('/api/createArticle', params, 'POST');
export const updateArticle = params => fetch('/api/updateArticle', params, 'POST');
export const deleteArticle = params => fetch('/api/deleteArticle', params, 'POST');
