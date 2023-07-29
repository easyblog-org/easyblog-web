import request from "~/config/request";


const prefix = '/h5/v1/static'

/**
 * 查询
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const queryArticleReportEvent = () => {
  return request({
    url: `${prefix}/article-events`,
    method: 'GET',
  })
}
