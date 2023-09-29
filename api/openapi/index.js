import request from "~/config/request/openapi";


/**
 * 获取客户端ip地址
 * @returns {Promise<any|undefined>|*}
 * @param ipAddr
 */
export const getIpLocation = (ipAddr) => {
  return request({
    url: `/ip/ipNewV3`,
    method: 'GET',
    data: {
      ip: ipAddr,
      key: '79618bdd93337d909b3425e083f593c1'
    },
  })
}

