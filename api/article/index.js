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
 * 查询文章详情
 * @param code
 * @returns {Promise<any|undefined>|*}
 */
export const queryArticleDetails = (code,params) => {
  return request({
    url: `${prefix}/${code}`,
    method: 'GET',
    data: params,
  })
}

/**
 * 更新文章
 * @param code
 * @param params
 */
export const updateArticle = (code, params) => {
  return request({
    url: `${prefix}/${code}`,
    method: 'PUT',
    data: params,
  })
}

/**
 * 更新统计指标
 * @param code
 * @param params
 */
export const updateStatistics = (params) => {
  return request({
    url: `${prefix}/statistics`,
    method: 'PUT',
    data: params,
  })
}

/**
 * 查询统计指标
 * @param code
 * @param params
 */
export const statistics = (params) => {
  return request({
    url: `${prefix}/statistics`,
    method: 'GET',
    data: params,
  })
}


/**
 * 查询统计文章数量
 * @param code
 * @param params
 */
export const countArticles = (params) => {
  return request({
    url: `${prefix}/count`,
    method: 'GET',
    data: params,
  })
}

/**
 * 查询
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const queryArticleReportEvent = () => {
  return request({
    url: `${prefix}/count`,
    method: 'GET',
  })
}
