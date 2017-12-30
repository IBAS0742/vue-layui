/**
 * 该脚本最好引入每一个子页，这里为子页初始化了一些父页定义的内容
 * */
var
    //主页配置项
    mainStore = parent.mainStore,
    //vue 示例
    vm = parent.vm,
    //页面管理器
    pageManage = parent.pageManage,
    //维护 jquery.ajax 中的一个配置对象
    jqueryAjaxProxy = parent.jqueryAjaxProxy,
    //配置用户信息缓存代理对象
    userInfoCacheProxy = parent.userInfoCacheProxy,
    //基础请求 url
    baseApiUrl = parent.baseApiUrl,
    //父级的 layer 使用 pages 进行替代
    //layer = parent.layer,
    loading = function (show) {
        parent.vm.loading = show ? true : false;
    },
    //promise 管理器
    sailPromise = parent.sailPromise,
    //请求返回值配置文件
    apiReturnParam = parent.apiReturnParam,
    ajax = parent.$.ajax.bind(parent.$),
    menu = parent.menu;