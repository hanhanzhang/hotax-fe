import axios from "axios";

// 请求拦截
axios.interceptors.request.use(
  config => {
    // TODO: add user information
    return config;
  },
  error => {
    // 异常处理
    return Promise.reject(error);
  }
);

const failure = (msg) => {
  return {
    code: -1,
    msg: msg
  }
};

// 响应拦截
axios.interceptors.response.use(
  response => {
    /*
     * 某个请求的响应包含的信息:
     * {
     *    data: {},           // 服务响应的内容
     *    status: {},         // HTTP 状态码
     *    statusText: 'OK',   // 服务器响应 HTTP 状态信息
     *    headers: {},        // 响应的头部信息
     *    config: {},
     *    request: {}
     * }
     * */
    if (response.status < 200 || response.status >= 300) {
      return failure('远程服务请求异常, 请联系管理员');
    }
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);


export default {

  post (opts, data) {
    return axios({
      method: 'post',
      url: opts.url,
      data: JSON.stringify(data),
      timeout: opts.hasOwnProperty('timeout') ? opts.timeout : 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  },

  get (opts, params) {
    return axios({
      method: 'get',
      url: opts.url,
      params: params,
      timeout: opts.hasOwnProperty('timeout') ? opts.timeout : 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }
}
