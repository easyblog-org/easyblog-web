import request from "~/config/request";


const prefix = '/h5/v1/article'

/**
 * 查询文章列表(通用)
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const queryArticleList = (params) => {
  return request({
    url: `${prefix}/list`,
    method: 'GET',
    data: params,
  })
}

/**
 * 查询文章列表(首页专用)
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const queryIndexPageArticleList = () => {
  return request({
    url: `${prefix}/index`,
    method: 'GET',
  })
}