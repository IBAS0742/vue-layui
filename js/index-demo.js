var vm,
    tab;
baseApiUrl = "./json";

layui.use(['form','element','layer',"jquery"],function() {
    layer = layui.layer;
    $ = layui.jquery;
    element = layui.element;

    //配置型函数
    var configure = function () {
        //将 登陆、注册、表格例子的模拟数据 接口加入到 ajax 管理器中
        $AjaxProxy($,baseApiUrl)
            .sets([
                {
                    name : "login",
                    url : "/login.json",
                    type : "get",
                    jsonType : "normal"
                },
                {
                    name : "register",
                    url : "/register",
                    type : "get",
                    jsonType : "strict"
                },
                {
                    name : "tableExample",
                    url : "/tableE.json",
                    type : "get"
                }
            ]);
        //将 登陆、注册、图标 页加入管理器中
        pageManage(layer)
            .addPages([
            [
                    //装载 登陆 页面信息
                "login",{
                    content : "page/login/login.html"
                },1
            ],
            [
                //装载 注册 页面信息
                "register",{
                    content : "page/login/register.html"
                },1
            ],
            [
                //装载 注册 页面信息
                "icons",{
                    content : "page/iconSelector.html",
                    closeBtn : 1,
                    title : "图标集合"
                },1
            ],
            [
                //装载 注册 页面信息
                "note",{
                    content : "page/building.html",
                    closeBtn : 1,
                    title : "笔记"
                },1
            ],
            [
                //装载 注册 页面信息
                "layui-table",{
                    content : "http://www.layui.com/doc/modules/table.html",
                    closeBtn : 1,
                    title : "数据表格"
                },1
            ]
        ]);
        /**
         * 维护 jquery.ajax 中的一个配置对象
         * 这里配置了，当用户信息发生改变时，如果是 token 发生变化则，将 token 加入到 header 中
         * 这里假定是一个用户拥有多种角色，所以配置了另一个参数 roleId ，当该参数变化时，也加入到头部
         * 而同时这里假定角色每次要通过获取用户信息才能设置，所以在初始化函数中将 roleId 置空
         * */
        jqueryAjaxProxy = bindToCache({
            dataType: "json",
            //contentType : "application/json",
            cache: false,
            type : "post",
            token : null,
            headers: {
                "roleId": "",
                "token": ""
            },
            xhrFields: {
                //跨域请求头
                withCredentials: true
            },
            error : function (xhr,status,error) {
                console.log(xhr);
            }
        },nullStorageManage,"jqueryAjax",true,function (manager,obj) {
            delete obj["roleId"];
            $.ajaxSetup(obj);
        },{
            set : function (obj) {
                $.ajaxSetup(obj);
            }
        });
        /**
         * 这里假定的需求是模块不同显示不同菜单
         * 方法是 mainStore.state.menus = [{}];
         * 由于每一个菜单项有一个唯一 id，并且该 id 与 tab 项关联
         * 由此需要为每一个菜单项赋予不同的 id 的同时将 id 进行记录
         * 这里编写了一个代理，
         * menu = {
         *      oldMenu : {
         *          menuOneHash : [ menus ],
         *          menuTwoHash : [ menus ]
         *      },
         *      menu : [ menus ]
         * }
         * 使用方法
         * menu.menus = [ menus ];
         * 当赋予新的菜单时，将计算菜单内容的 哈希值 并检查是否有使用过，
         *      有则重缓存中获取带 id 的菜单内容
         *      没有则为每一个菜单项赋予 id ，并缓存
         * */
        menu = bindToCache({
            menu : [],
            oldMenu : {}
        },nullStorageManage,"menu",true,null,{
            set : function (obj,prop,value) {
                if (prop == "menu") {
                    var hash = "hash_" + this.getHashCode(JSON.stringify(value).substring(0,100));
                    if (hash in obj.oldMenu) {
                        value = obj.oldMenu[hash];
                    } else {
                        if ($.isArray(value)) {} else {
                            value = [value];
                        }
                        for (var j = 0;j < value.length;j++) {
                            if (value[j].children) {
                                for (var i = value[j].children.length - 1;i + 1;i--) {
                                    value[j].children[i].id = "menu_" + (new Date()).getTime() + "_" + parseInt(Math.random() * 100);
                                }
                            } else {
                                value[j].id = "menu_" + (new Date()).getTime() + "_" + parseInt(Math.random() * 100);
                            }
                        }
                        obj.oldMenu[hash] = value;
                    }
                    while (mainStore.state.menus.length) {
                        mainStore.state.menus.pop();
                    }
                    value.forEach(function (i) {
                        mainStore.state.menus.push(i);
                    });
                    return value;
                }
            },
            getHashCode : function(str,caseSensitive){
                if(!caseSensitive){
                    str = str.toLowerCase();
                }
                var hash  =   1315423911,i,ch;
                for (i = str.length - 1; i >= 0; i--) {
                    ch = str.charCodeAt(i);
                    hash ^= ((hash << 5) + ch + (hash >> 2));
                }
                return  (hash & 0x7FFFFFFF);
            }
        });
        //配置全局的请求返回内容参数默认值设定（仅仅为了利于维护，非框架）
        apiReturnParam = bindToCache({
            successCode : 0 //请求成功代码
        },nullStorageManage,"apiReturnParam",true,null,{});
        //配置用户信息缓存代理对象
        userInfoCacheProxy = bindToCache({},CookieManage,"userInfo",true,function (obj) {
            //console.log(obj);
            if (obj && obj.token) {
                var header = jqueryAjaxProxy.headers;
                header.token = obj.token;
                jqueryAjaxProxy.headers = header;
            }
            return obj;
        },{
            set : function (obj,prop,value) {
                var header = jqueryAjaxProxy.headers;
                    if (prop == "token") {
                        $.extend(header,{
                            token : value
                        });
                    } else if(prop == "roleId") {
                        $.extend(header,{
                            currentDeptId : value
                        });
                    }
                    jqueryAjaxProxy.headers = header;
            }
        });
        //初始化封装 promise 对象
        sailPromise = new sailPromise($.ajax.bind($));
        // 配置主体框架
        {
            mainStore.state.$ = $;
            mainStore.state.logo = "后台系统";
            mainStore.state.bottomHTML = "copyright @2017";
            mainStore.state.lefttopmenu = [
                {
                    iconHtml : "<i class='layui-icon'>&#xe65f;</i>",
                    click : function () {
                        if (mainStore.state.showMenu == "open") {
                            mainStore.state.showMenu = "close";
                        }
                        else {
                            mainStore.state.showMenu = "open";
                        }
                    }
                }
            ];
            mainStore.state.righttopmenu = [
                {
                    iconHtml : "<i class=\"iconfont icon-gonggao\"></i>",
                    title : "日历",
                    click : function () {
                        layer.msg("。。。进行中");
                    }
                },
                {
                    iconHtml : "<i class=\"iconfont icon-gonggao\"></i>",
                    title : "记事本",
                    click : function () {
                        pageManage.showPage("note");
                    }
                },
                {
                    iconHtml : "<i class=\"iconfont icon-gonggao\"></i>",
                    title : "登出",
                    click : function () {
                        userInfoCacheProxy.token = "";
                        location.reload();
                    }
                }
            ];
            mainStore.state.tabFrame = [
                {
                    href : "page/main.html"
                }
            ];
            mainStore.state.tabTitles = [
                {
                    iconHtml: "<i class='layui-icon'>&#xe857;</i>",
                    title: "主页",
                    id : 'first'
                }
            ];
            mainStore.state.windowsAction = [
                {
                    html : '<i class="layui-icon">&#x1007;</i> 关闭所有',
                    event : ['self','closeAllTab']
                },
                {
                    html : '<i class="iconfont">&#x1006;</i> 关闭其他',
                    event : ['self','closeOthers']
                },
                {
                    html : '<i class="layui-icon">&#x1002;</i> 刷新当前',
                    event : ['self','refleshTab']
                }
            ];
        }
    };

    vm = new Vue({
        el: '#app',
        data: {
            loading : true,
            logo: "管理系统"
        },
        mounted : function () {
            setTimeout(function () {
                configure();
                element.render();
                pageManage.showPage("login");
            });
        }
    });
});