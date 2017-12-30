/**
 * 该脚本只是看看用的
 * */
var
    //页面管理器
    pageManage,
    //维护 jquery.ajax 中的一个配置对象
    jqueryAjaxProxy,
    //配置用户信息缓存代理对象
    userInfoCacheProxy,
    //baseApiUrl = "http://localhost:8080",
    //promise 管理器
    sailPromise,
    apiReturnParam,
    layer,$,menu;



/**
 * pages 页面管理器
 *      职责：1.将所有必要的弹出页加入到记录中。
 *            2.在调用时，判断页面是否已经定义。
 * jqueryAjaxProxy jquery ajax 配置项类修改监听代理
 *      当配置项被修改时，自动重新将最新配置加入到 jquery ajax 配置中
 * userInfoCacheProxy 用户信息缓存代理
 *      当用户信息发生变化时，自动执行缓存到配置好的缓存对象中
 * baseApiUrl
 *      基础的 api 请求链接
 * layer,$
 * */