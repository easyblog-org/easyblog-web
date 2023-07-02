import axios from 'axios';


// 创建axios自定义实例
const server = axios.create({
  // 默认请求地址，根据环境的不同可在.env 文件中进行修改
  baseURL: '/api',
  // 设置接口访问超时时间
  timeout: 50000, // request timeout，
  // 跨域时候允许携带凭证
  withCredentials: true,
})


// 请求拦截器
server.interceptors.request.use(request => {
  if (!process.env.NODE_ENV) {
    console.log(
      `${new Date().toLocaleString()}【 M=${request.url} 】P=`,
      request.params || request.data,
    );
  }
  return request;
}, error => {
  return Promise.reject(error);
});


//  response interceptor 接口响应拦截
server.interceptors.response.use(
  (response) => {
    // 直接返回res，当然你也可以只返回res.data
    // 系统如果有自定义code也可以在这里处理
    if (!response.data.success) {
      /* if (response.data.code === 'auth_token_not_found' ||
        response.data.code === 'auth_expired') {
        //可能是token过期，清除它
        const userStore = useUserStore()
        userStore.token = null;
        //跳转到登录页面
        routers.replace({
          path: '/login'
        });
      } */
      return Promise.reject(response)
    }
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default async (options = {method: 'GET'}) => {
  let isdata = true;
  if (
    options.method.toUpperCase() !== 'POST'
    && options.method.toUpperCase() !== 'PUT'
    && options.method.toUpperCase() !== 'PATCH'
  ) {
    isdata = false;
  }
  const res = await server({
    method: options.method,
    url: options.url,
    data: isdata ? options.data : null,
    params: !isdata ? options.data : null,
  });
  if (res.status >= 200 && res.status < 300) {
    if (!process.env.NODE_ENV) {
      console.log(
        `${new Date().toLocaleString()}【接口响应：】`,
        res.data,
      );
    }
    // 浏览器环境弹出报错信息
    if (typeof window !== "undefined" && res.data.code !== 0) {
      console.log(res.data.msg);
    }
    return res.data;
  } else {
    if (typeof window !== "undefined" && res.data.code !== 0) {
      console.log('请求错误');
    }
  }

};
