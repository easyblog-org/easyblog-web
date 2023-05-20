import {get, post, put} from '../http'

/**
 * 登录
 * @param p
 * @returns {Promise<unknown>}
 */
export const login = p => post('/v1/auth/login', p);

/**
 * 获取验证码
 * @param p
 * @returns {Promise<unknown>}
 */
export const sendCaptchaCode = p => get('/v1/auth/captcha-code', p)

/**
 * 退出登录
 * @param p
 * @returns {Promise | Promise<unknown>}
 */
export const logout = p => post('/v1/auth/logout', p)

/**
 * 注册账号
 * @param p
 * @returns {Promise | Promise<unknown>}
 */
export const register = p => post('/v1/auth/register', p)
