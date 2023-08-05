import request from "~/config/request";


const prefix = '/h5/v1/user'

/**
 * 生成6位验证码（纯数字）
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const sendCaptchaCode = (params) => {
  return request({
    url: `${prefix}/captcha-code`,
    method: 'GET',
    data: params,
  })
}

/**
 * 注册账号
 * @param params
 */
export const register = (params) => {
  return request({
    url: `${prefix}/register`,
    method: 'POST',
    data: params,
  })
}

/**
 * 登录账号
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const login = (params) => {
  return request({
    url: `${prefix}/login`,
    method: 'POST',
    data: params,
  })
}

/**
 * 检查登录状态
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const logged = (params) => {
  return request({
    url: `${prefix}/logged/${params}`,
    method: 'GET'
  })
}

/**
 * 退出登录
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const logout = (params) => {
  return request({
    url: `${prefix}/logout`,
    method: 'POST',
    data: params,
  })
}
