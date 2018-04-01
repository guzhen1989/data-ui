import axios from 'axios';

let API;
let vuem;
API = {
    setVm (vm) {
        vuem = vm;
    },
    // 登陆
    login (username, password) {
        return axiosAction(
            {
                url: '/api/login/self',
                params: {'username': username, 'password': password},
                needLoading: false,
                needEncrypt: false,
                type: 'post'
            }
        );
    },
    getUsers (page, size) {
        return axiosAction(
            {
                url: '/api/uc/users',
                params: {'page': page, 'size': size},
                needLoading: false,
                needEncrypt: false,
                type: 'get'
            }
        );
    }
};

let ajax = axios.create({
    baseURL: '',
    timeout: 30000,
    withCredentials: true
});

// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.common['Content-Type'] = 'application/json';
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = window.localStorage.getItem('token');
    // 把token放到header里面
    if (token) {
        config.headers.common['X-Auth-Token'] = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log('错误的传参');
    return Promise.reject(error);
});

ajax.interceptors.response.use((res) => {
    let status = res.status;
    let token = res.headers['x-auth-token'];
    if (token) {
        window.localStorage.setItem('token', token);
    }
    if (status === 200) {
        return Promise.resolve(res.data);
    } else {
        return Promise.reject(res);
    }
}, (error) => {
    if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        if (error.response.status === 401 || error.response.status === 403) {
            // TODO 提示
            vuem.$Message.error('登陆失败');
            // TODO 跳转登录页
            vuem.$router.push({
                name: 'login'
            });
        } else if (error.response.status === 400) {
            // TODO 不提示
        }
        // this.$Message.error('系统错误');
        return Promise.reject(error.response.data);
    } else {
        vuem.$Message.error('网络错误');
    }
    return Promise.reject(error);
});
const ajaxMethod = ['get', 'post', 'options'];
const remote = {};
ajaxMethod.forEach((method) => {
    remote[method] = function (uri, data) {
        return new Promise(function (resolve, reject) {
            if('get'===method){
              ajax[method](uri, {params:data}).then(function (data) {
                resolve(data);
              }).catch(function (error) {
                reject(error);
              });
            }else {
              ajax[method](uri, data).then(function (data) {
                resolve(data);
              }).catch(function (error) {
                reject(error);
              });
            }

        });
    };
});

// 发出请求
function axiosAction (actionParams) {
    let axiosUrl = actionParams.url;
    let needLoading = actionParams.needLoading;
    let axiosParams = actionParams.params;
    let needEncrypt = actionParams.needEncrypt;
    let type = actionParams.type || 'post';

    if (!axiosUrl) {
        return;
    }

    // 是否出现loading
    needLoading = needLoading === undefined ? true : needLoading;
    if (needLoading) {
    // TODO
    } else {
    // TODO
    }
    // 是否加密
    if (needEncrypt) {
    // TODO
    }

    return remote[type](axiosUrl, axiosParams);
}
export default API;
