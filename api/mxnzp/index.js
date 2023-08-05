import request from "~/config/mxnzp_request";


/**
 * 获取客户端ip地址
 * @param params
 * @returns {Promise<any|undefined>|*}
 */
export const getIpInfo = () => {
  return request({
    url: `/api/ip/self?app_id=mabkjelflpmmiouq&app_secret=TzJHYkFDYmxDUXp5N1BrZXR4d2QwZz09`,
    method: 'GET',
  })
}

