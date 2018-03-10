/**
 * 该脚本内容说明
 * 1.定义了 四个前端缓存操作类，并支持对象缓存
 *      CookieManage、sessionStorageManage、localStorageManage、nullStorageManage
 * 2.splitAttrForManage 属性捡去分割函数
 * 3.bindToCache 对象缓存绑定
 * 4.pageManage 基于 layer 弹层的页面管理
 * 5.sailPromise 的使用简化封装（包括 promise 不存在时的定义）
 * 6.$AjaxProxy 使用代理（用于修改 ajax 请求前的数据预处理，这里做了简单的定义）
 * */

/**
 * 判断参数是否为对象
 * */
function isObject(obj) {
    return (obj instanceof Object) || (typeof obj == 'object');
};
function isFunction(fn) {
    return (fn instanceof Function) || (typeof fn == "function");
}

/**
 * cookie 操作类
 * 方法           参数（依次）                      \   返回值
 * 增 set        字段名 值 时间（天） 作用域        \   操作类
 * 删 del        字段名 作用域                      \   操作类
 * 改 change     字段名 新值                        \   操作类
 * 查 get        字段名                             \   值
 * */
var CookieManage = (function(adv) {
    var defaultDomain = '';
    if (window.location.href.indexOf('localhost') + 1) {
        defaultDomain = "localhost";
    }
    //var this_ = window;
    var setCookie,
        delCookie,
        setCookieValue,
        getCookieValue;
    if (adv) {
        setCookie = function(cname, cvalue, exdays,Domain){
            var d = new Date();
            if(!Domain){Domain=defaultDomain};
            if (exdays) {} else {
                exdays = 1;
            }
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            if (isObject(cvalue)) {
                document.cookie = cname + "=" + JSON.stringify(cvalue) + "; " + expires + ";" +
                    (Domain ? "path=/;domain="+Domain : 'path=/;');
            } else {
                document.cookie = cname + "=" + cvalue + "; " + expires + ";" +
                    (Domain ? "path=/;domain="+Domain : 'path=/;');
            }
            return this;
        };
        delCookie = function(name,Domain) {
            setCookie(name,"",-1,Domain);
            return this;
        };
        setCookieValue = function(cname, cvalue) {
            if (isObject(cvalue)) {
                document.cookie = cname + "=" + JSON.stringify(cvalue) + "; path=/;" +
                    (defaultDomain ? " domain="+defaultDomain : "");
            } else {
                document.cookie = cname + "=" + cvalue + "; path=/;" +
                    (defaultDomain ? " domain="+defaultDomain : "");
            };
            return this;
        };
        getCookieValue = function(cookieName) {
            var cookieValue = document.cookie;
            var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
            if (cookieStartAt == -1) {
                cookieStartAt = cookieValue.indexOf(cookieName + "=");
            }
            if (cookieStartAt == -1) {
                cookieValue = null;
            } else {
                cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
                cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
                if (cookieEndAt == -1) {
                    cookieEndAt = cookieValue.length;
                }
                cookieValue = unescape(cookieValue
                    .substring(cookieStartAt, cookieEndAt));// 解码latin-1
            }
            try {
                return JSON.parse(cookieValue);
            } catch (e) {
                console.warn("JSON.parse ocu error");
                return cookieValue;
            }
        };
    } else {
        delCookie = function(name,Domain) {
            setCookie(name, "", -1,Domain);
        };
        setCookie = function(cname, cvalue, exdays,Domain) {
            var d = new Date();
            if(!Domain){Domain=defaultDomain};
            if (exdays) {} else {
                exdays = 1;
            }
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/; domain="+Domain;
        };

        setCookieValue = function(cname, cvalue) {
            document.cookie = cname + "=" + cvalue + ";path=/; domain="+defaultDomain;
        };
        getCookieValue = function(cookieName) {
            var cookieValue = document.cookie;
            var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
            if (cookieStartAt == -1) {
                cookieStartAt = cookieValue.indexOf(cookieName + "=");
            }
            if (cookieStartAt == -1) {
                cookieValue = null;
            } else {
                cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
                cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
                if (cookieEndAt == -1) {
                    cookieEndAt = cookieValue.length;
                }
                cookieValue = unescape(cookieValue
                    .substring(cookieStartAt, cookieEndAt));// 解码latin-1
            }
            return cookieValue;
        };
    };
    return {
        add : setCookie,
        del : delCookie,
        change : setCookieValue,
        get : getCookieValue
    }
})(true);
/* 同上但少了时间和作用域 */
var sessionStorageManage = (function () {
    var add = function (sname,svalue) {
        if (isObject(svalue)) {
            sessionStorage.setItem(sname,JSON.stringify(svalue));
        } else {
            sessionStorage.setItem(sname,svalue);
        }
        return this;
    };
    var del = function (sname) {
        if (sname in sessionStorage) {
            delete sessionStorage[sname];
        }
        return this;
    };
    var change = function(sname,svalue) {
        this.add(sname,svalue);
        return this;
    };
    var get = function (sname) {
        if (sname in sessionStorage) {
            try {
                return JSON.parse(sessionStorage[sname]);
            } catch (e) {
                console.error('sname 对应于非对象值');
                return (sessionStorage[sname]);
            }
        } else {
            return null;
        }
    };
    return {
        add : add,
        del : del,
        change : change,
        get : get
    }
})();
/* 同上但少了时间和作用域 */
var localStorageManage = (function () {
    var add = function (sname,svalue) {
        if (isObject(svalue)) {
            localStorage.setItem(sname,JSON.stringify(svalue));
        } else {
            localStorage.setItem(sname,svalue);
        }
        return this;
    };
    var del = function (sname) {
        if (sname in localStorage) {
            delete localStorage[sname];
        }
        return this;
    };
    var change = function(sname,svalue) {
        this.add(sname,svalue);
        return this;
    };
    var get = function (sname) {
        if (sname in localStorage) {
            try {
                return JSON.parse(localStorage[sname]);
            } catch (e) {
                console.error('sname 对应于非对象值');
                return (localStorage[sname]);
            }
        } else {
            return null;
        }
    };
    return {
        add : add,
        del : del,
        change : change,
        get : get
    }
})();
/**
 * 空的存储管理，等同理解为电脑的空设备即可
 * 目的是表示出一个和正常存储对象一致的接口类
 * */
var nullStorageManage = (function () {
    return {
        add : function () {},
        del : function () {},
        change : function () {},
        get : function () {}
    }
})();

/**
 * 这个函数本来是为了 跟高级的包装以上几个函数的，当然也可以有其他用法，使用方法为
 * splitAttrForManage(fn/object,param1,param2,...);
 * 第一个参数必须是对象或者函数，另外函数必须放回一个对象
 * 第二个参数为对象的属性链，不同级属性见用点隔开，
 * 例如
 * splitAttrForManage(fn,'window.location.href',param1,param2,...);
 * 同时当第一个参数为函数时，属性连的第一个参数为函数的第一个参数，如果为空请使用(.)开头表示
 * 例如
 * splitAttrForManage(fn,'.window.location.href',param1,param2,...);
 * 但是一定程度上限制了函数的编写规则，同时函数对象被重写，不能在函数中使用this关键字，因为此时的关键字已经改为了window，
 * =================================================================================
 * splitAttrForManage({a : {name : 'ibas'}},'a.name')  => "ibas"
 * ==================================================================================
 * sessionStorageManage.add('a',{name:'ibas'});
 * splitAttrForManage(sessionStorageManage.get,'a.name') => 'ibas'
 * */
var splitAttrForManage = function () {
    var args = arguments;
    if (args.length > 1) {
        var fn = args[0];
        if (isFunction(fn)) {
            var params = [];
            for (var i = 1;i < args.length;i++) {
                params.push(args[i]);
            }
            if (params[0].indexOf('.') + 1) {
                var attrs = params[0].split('.');
                params[0] = attrs.shift();
                if (params[0]) {} else {
                    params.shift();
                }
                var ret = fn.apply(null,params);
                attrs.forEach(function (i) {
                    if (!ret) {
                        return;
                    }
                    if (i in ret) {
                        ret = ret[i];
                    } else {
                        ret = null;
                        return null;
                    }
                });
                return ret;
            } else {
                return fn.apply(null,params);
            }
        } else if (isObject(fn)) {
            var top = fn;
            if (args[1]) {
                var attrs = args[1].split('.');
                attrs.forEach(function (i) {
                    if (i in fn) {
                        fn = fn[i];
                    } else {
                        return top;
                    }
                });
            }
            return fn;
        } else {
            throw new Error("第一个参数必须是一个函数或对象");
        }
    } else {
        throw new Error('参数个数不足');
    }
};

/**
 * 缓存绑定
 * obj              存储对象
 * cacheManage      缓存管理（对应上面上个中的一个），为空时表示不需要缓存
 * cacheName        位于缓存中的名称
 * init             是否进行初始化
 * check            用于检查从 缓存 中获取的内容
 * options          用于配置其他信息，例如用户可以配置token更新是，更新jquery的默认请求配置
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 例如 obj = { a : 1 }; 并存储在 cookie 中名为 cacheObj 则
 * obj = bindToCache({a : 1},CookieManage,"cacheObj");
 * 如果 obj 需要重 缓存 中进行获取，则使 init 为 true 即可
 * obj = bindToCache({a : 1},CookieManage,"cacheObj",true);
 * 如果在缓存中获取到了相关内容，则，原本的 obj 对象使用 缓存中的对象进行替代
 * 有时可能从 缓存 中获取的内容需要检查，这时可以使用 check 方法
 *
 * options = { set ,get , del } //两个函数 接受当前的 对象 属性名称 和 属性值
 *      options del 为一个有效的函数时，生成对象存在一个特定的方法
 *          _die_ 改方法触发时会执行 del 事件
 *          改方法将接受两个参数，cacheManage cacheName 缓存管理器和缓存名称
 * */
var bindToCache = function (obj_,cacheManage,cacheName,init,check,options) {
    var obj = {},
        deleteProperty;
    check = check || function (ret) {
        return (ret && isObject(ret)) ? ret : null;
    };
    options = options || {};
    options["set"] = options["set"] || function () {};
    options["get"] = options["get"] || function () {};
    options["del"] = options["del"] || function () {};
    cacheManage = cacheManage ? cacheManage : (obj = obj_,nullStorageManage);
    if (init) {
        obj = check(cacheManage.get(cacheName),obj_ || {}) || obj_;
    }
    if (options["del"] &&  isFunction(options["del"])) {
        obj["___exist___"] = true;
        obj["_die_"] = function () {
            delete this["___exist___"];
        };
        deleteProperty = function(target, property) {
            if ('___exist___' == property) {
                options["del"](cacheManage,cacheName);
            }
        };
    }
    return (function (obj,cacheManage,cacheName,options) {
        return new Proxy(obj,{
            set : function (obj,prop,value) {
                value = options.set(obj,prop,value) || value;
                obj[prop] = value;
                cacheManage.add(cacheName,obj);
            },
            deleteProperty : deleteProperty || function () {}
        });
    })(obj,cacheManage,cacheName,options);
};

/**
 * 其实该代码并不合理放置在这里，应该作为layer的插件，但是使用范围过小，时间紧任务重就先这样吧
 * --------------------------------
 * 定义页面配置
 * $            jQuery 对象
 * layer        弹窗对象
 * */
var pageManage = (function (layer) {
    var pageType = [{},{
            //name : "fullScreen"
            //index : 1
            type : 2,
            title : false,
            area : ["100%","100%"],
            closeBtn : false
        },{
            //name : "fullScreen"
            //index : 1
            type : 2,
            title : false,
            area : ["100%","100%"],
            closeBtn : 1,
            maxmin : true
        }],
        pagesInfo = {
            // pageName : {
            //     args : {
            //         content : "requestUrl",
            //         type : 2,
            //         ...
            //     },
            //     index : null,   //默认为 空，当有页面存在时为 索引值
            // }
        },
        baseUrl = location.href.substring(0,location.href.indexOf(location.host) + location.host.length);
    window.pageManage = {
        addPages : function (pageObjArr) {
            for (var i = 0;i < pageObjArr.length;i++) {
                (function ($this,args) {
                    $this.addPage.apply($this,args);
                })(this,pageObjArr[i]);
            }
        },
        /**
         * pageName     页的名称
         * pageArgs     页的配置信息
         * pageType_    页的类型(对应上面的 pageType 的序号)
         * newWindow    新页面打开
         * */
        addPage : function (pageName,pageArgs,pageType_,newWindow) {
            if (newWindow) {
                if (pageArgs.content.indexOf("http") == 0) {
                    pagesInfo[pageName] = pageArgs.content;
                } else {
                    pagesInfo[pageName] = baseUrl + pageArgs.content;
                }
            } else {
                var o = {};
                //$.extend(o,pageType[(pageType_ || 0)]);
                Object.assign(o,pageType[(pageType_ || 0)]);
                pagesInfo[pageName] = {
                    //args : $.extend(o,pageArgs),
                    args : Object.assign(o,pageArgs),
                    index : null
                };
            }
        },
        closePage : function (pageName) {
            if (pageName in pagesInfo) {
                if (pagesInfo[pageName].index) {
                    layer.close(pagesInfo[pageName].index);
                    pagesInfo[pageName].index = 0;
                }
            } else {
                throw new Error(pageName + "不存在！");
            }
        },
        showPage : function (pageName,args) {
            if (pageName in pagesInfo) {
                var pageArgs = pagesInfo[pageName];
                var str = [];
                if (isObject(args)) {
                    for (var i in args) {
                        str.push(i + "=" + args[i]);
                    }
                } else {
                    str = [args];
                }
                if (isObject(pageArgs)) {
                    var pageArg = Object.assign({},pageArgs.args);
                    Object.assign(pageArg,{
                        content : pageArg.content + "?" + str.join('&')
                    });
                    pagesInfo[pageName].index = layer.open(pageArg);
                } else {
                    window.open(pageArgs + "?" + str.join('&'));
                }
            } else {
                throw new Error(pageName + "不存在！");
            }
        },
        changeArgs : function (pageName,args) {
            if (pageName in pagesInfo) {
                Object.assign(pagesInfo[pageName].args,args);
                //$.extend(pagesInfo[pageName].args,args);
            } else {
                throw new Error(pageName + "不存在！");
            }
        }
    };
    return pageManage;
});

/**
 * promise 定义，用于某些缺失 promise 定义的浏览器
 * */
(function(w,re){
    var Promise_ = w.Promise;
    if (isObject(Promise_) && !re) {
        // Promise 关键字存在，不需要理会
        return ;
    } else {
        // 创建 Promise 类，实现
        /*
         * Promise 基本原型功能和使用的编程实例
         * (new Promise(function(s,f){
         * 		var fn = function(d) {
         * 			s(d);
         * 		}
         * 		$.ajax({
         * 			url : "",
         * 			success : fn
         * 		});
         *		// 或者使用 setTimeout 模拟延时效果
         * 		setTimeout(function(){
         * 			s("成功");
         * 		},0);
         * }))
         * .then(function(d){
         * 		console.log(d); //获取到setTimeout中的“成功”或者$.ajax中的d数据
         * 		return d; //返回内容可以是一个数据，之后的then可以继续使用
         * 				  //也可以是一个promise对象，随后可以使用then继续链式调用
         * })
         * .catch(function(err){
         * 		失败是将获取到错误信息，可自定义报错内容
         * });
         * */
        var Promise_ = function(fn) {
            var succCB = null;
            var callSCB = function(data) {
                succData = {
                    data : data
                };
                if (succCB) {
                    try {
                        var succData_ = succCB(data);
                        if (succData_ instanceof Promise) {
                            var bd = succData_.baseInfo();
                            this.then = succData_.then;
                            this["catch"] = succData_["catch"];
                            succData = bd.succData;
                            failData = bd.failData;
                            succCB = bd.succCB;
                            failCB = bd.failCB;
                            return this;
                        }
                        succData = {
                            data : succData_
                        }
                        if (!!succData_) {
                        } else {
                            //判断为非 0 和 false ，避免错误
                            if (succData_ instanceof Number) {
                            } else if (new Boolean(false) == succData_) {
                            } else {
                                succData_ = null;
                            }
                        }
                    } catch (e) {
                        succData = null;
                        failData = e;
                    }
                }
            }
            var failCB = null;
            var callFCB = function(data) {
                if (failCB) {
                    failCB(data);
                    failData = null;
                } else {
                    failData = data;
                }
            }
            var succData = null;
            var failData = null;

            /*
             * s : 成功回调
             * f : 失败回调
             * */
            this.then = function(s,f) {
                if (isFunction(s)) {} else {
                    throw new Error("s is not a function");
                }
                succCB = s;
                failCB = f;
                if (!!succData) {
                    callSCB(succData.data);
                } else if (!!failData) {
                    callFCB(failData);
                }
                return this;
            }

            this["catch"] = function(f) {
                if (isFunction(s)) {} else {
                    throw new Error("f is not a function");
                }
                failCB = f;
                if (failData) {
                    callFCB(failData);
                }
                return this;
            }

            this.baseInfo = function() {
                return {
                    failData : failData,
                    succData : succData,
                    succCB : succCB,
                    failCB : failCB
                }
            }

            try {
                fn(callSCB);
            } catch (e) {
                failCB(e);
            }
            return this;
        }
    }
    w.Promise = Promise_;
})(window,false);

/**
 * promise 管理器
 * */
/**
 * 第一次封装，封装目的及封装结果说明
 * 目的：使所有的数据可以多次反复重用，使用 promise 的进行实现，减少不必要的服务器访问
 * 结果：一个通用的接口，通过传递一个请求参数进行完成
 * 参数：
 * 		id : 当前 promise 对象的一个唯一标识
 * 		obj : $.ajax 中的 {url : url,data : data}
 * 使用方法：
 * 	1.初始化定义
 * 		sailPromise.getPromise("唯一标识",{url:"",data:{},head:{},...})//.dearFn = function(ret){ return ret; };
 * 	2.获取内容
 * 		sailPromise.getPromise("唯一标识").init().then(function(){});
 * 		sailPromise.getPromise("唯一标识").then(function(){});	//如果初始化过可以不需要调用 init，但是调用也不会出错
 * 																//最好使用init()，避免因为其他位置调用了reload()
 * 	3.重新加载数据
 * 		sailPromise.getPromise("唯一标识").reload();		//进行数据库操作后可以这样进行调用即可
 * 		sailPromise.getPromise("唯一标识").reload().init().then(function(){});
 * 		//不推荐使用第二种，因为破坏了规定和使用的初衷
 * 		sailPromise.getPromise("唯一标识").reload({url:"",data:{},head:{},...}).init().then(function(){});
 * */
var sailPromise = (function(ajax) {
    //this.ajax = ajax;
    this.ids = {};
    var newPromise = function (obj) {
        var promise_ = {
            promise_ : null,
            bak : {},
            dear : function (data) {
                return data;
            }
        };
        Object.defineProperty(promise_, "obj"		  , 		{
            configurable : false,
            value: obj
        });
        Object.defineProperty(promise_, "bak"		  , 		{
            configurable : false
        });
        Object.defineProperty(promise_, "promise_"	  , 		{
            configurable : false
        });
        Object.defineProperty(promise_, "promise"	  , 		{
            configurable : false,
            get : function () {
                return this.promise_;
            },
            set : function (obj) {
                console.log("here");
                console.log(obj);
                this.promise_ = obj;
            }
        });
        Object.defineProperty(promise_, "first"	  , 		{
            configurable : false,
            value: true
        });
        Object.defineProperty(promise_, "comb"		  , 		{
            configurable : false,
            writable : false,
            /**
             * newObj 新的 obj 信息，是 $.ajax 的参数
             * des 表示修改的信息节点，
             * 		例如修改 data 字段
             * 			reload({page : 1},"data");
             * 		正常的写法是
             * 			reload({url : "",data : {page : 1}},null);
             * */
            value: function (newObj,des) {
                if (newObj) {
                    if (des) {
                        this.obj[des] = newObj;
                    } else {
                        this.obj = newObj;
                    }
                }
                return this;
            }
        });
        Object.defineProperty(promise_, "reload"	  , 		{
            configurable : false,
            writable : false,
            /**
             * data		请求数据
             * des 		字段描述（用于更新部分请求数据）
             * bakId	备份id（用于删除备份）
             * newObj 新的 obj 信息，是 $.ajax 的参数
             * des 表示修改的信息节点，
             * 		例如修改 data 字段
             * 			reload({page : 1},"data");
             * 		正常的写法是
             * 			reload({url : "",data : {page : 1}},null);
             * 和 init 存在的差别就是传递 bakId 的时候，使用 init 可以获取缓存，使用 reload 会清除缓存
             * */
            value: function (newObj,des,bakId) {
                if (newObj) {
                    this.comb(newObj,des);
                }
                if (bakId) {
                    delete this.bak[bakId];
                }
                this.promise = null;
                return this;
            }
        });
        Object.defineProperty(promise_, "init"		  , 		{
            configurable : false,
            writable : false,
            /**
             * data		请求数据
             * des 		字段描述（用于更新部分请求数据）
             * bakId	备份id（用于创建备份）
             * 这个方法是简化链式调用
             * 原本可能是
             * 		obj.reload({},"des").init();
             * 现在可以简化为
             * 		obj.init({},"des");
             * 存在的差别就是传递 bakId 的时候，使用 init 可以获取缓存，使用 reload 会清除缓存
             * */
            value: function(data,des,bakId) {
                var this_ = this;
                if (data) {
                    this.comb(data,des);
                    this.promise = null;
                }
                if (bakId) {
                    if (bakId in this.bak) {
                        this.promise = new Promise(function(success) {
                            success(this_.bak[bakId]);
                        });
                        return this;
                    }
                }
                if (this.promise == null) {
                    this.promise = new Promise(function(success) {
                        this_.obj.success = function(s) {
                            if (bakId) {
                                this_.bak[bakId] = s;
                            }
                            success(s);
                        };
                        ajax(this_.obj);
                    });
                }
                return this;
            }
        });
        Object.defineProperty(promise_, "then"		  , 		{
            configurable : false,
            writable : false,
            value: function (fn) {
                var this_ = this;
                this.promise.then(function (d) {
                    d = this_.dear_(d);
                    fn(d);
                    return d;
                });
                return this;
            }
        });
        Object.defineProperty(promise_, "dear"		  , 		{
            configurable : false
        });
        Object.defineProperty(promise_, "dearFn"	  , 		{
            configurable : false,
            get : function () {
                return this.dear;
            },
            set : function (fn) {
                if (isFunction(fn)) {
                    this.dear = fn;
                } else {
                    throw new Error("参数应该是一个函数");
                }
                return this;
            }
        });
        Object.defineProperty(promise_, "dear_"	  , 		{
            configurable : false,
            writable : false,
            value: function (data) {
                if (this.first) {
                    this.first = false;
                    return this.dearFn(data);
                } else {
                    return data;
                }
            }
        });
        Object.defineProperty(promise_, 'clearCache', 		{
            configurable : false,
            writable : false,
            /**
             * 将所有缓存的内容进行清空
             * */
            value: function () {
                this.bak = {};
                return this;
            }
        });
        return promise_;
    };
    this.getPromise = function(id,obj) {
        if (id in this.ids) {
            //return ids[id];
        } else {
            //this.ids[id] = new this.constructor(obj);
            if (!obj.type) {
                obj.type = "post";
            }
            this.ids[id] = newPromise(obj);
        }
        return this.ids[id];
    };
});


/**
 * 创建一个 ajax 代理对象
 * $ 不管是什么东西，只要存在 $.ajax 即可
 * baseUrl 请求基础路径
 * cor 是否跨域
 * */
var $AjaxProxy = (function ($,baseUrl,cor) {
    var ajax_ = $.ajax.bind($);
    var ajaxParams = [];
    var ajaxParamsNames = [];
    var ajaxParamsUrls = [];
    baseUrl = baseUrl || "/";
    var defaultDear = {
        type : function (obj,param) {
            obj.type = param;
            //return obj;
        },
        jsonType : function (obj,param) {
            obj.headers = obj.headers || {};
            switch (param) {
                case 'strict':
                    obj.headers["content-type"] = "application/json; charset=UTF-8";
                    obj.data = JSON.stringify(obj.data || {});
                    break;
                case 'normal':
                    obj.headers["content-type"] = "application/x-www-form-urlencoded; charset=UTF-8";
                    break;
                case 'join':
                    //todo 连接方法有可能是有一定顺序的
                    for (var i in obj.data) {
                        obj.url += obj.data[i];
                        break;
                    }
                    obj.data = {};
                    break;
                default:
                    break;
            }
        },
        url : function (obj,url) {
            obj.url = url || obj.url;
            //return obj;
        }
    };
    if (window["Proxy"] !== undefined) {
        $.ajax = new Proxy($.ajax,{
            apply: function(target, that, args) {
                args = args[0];
                var param = {};
                if ("name" in args && ajaxParamsNames.includes(args['name'])) {
                    param = ajaxParams[ajaxParamsNames.indexOf(args['name'])];
                } else if ("url" in args && ajaxParamsUrls.includes(args['url'])) {
                    param = ajaxParamsUrls[ajaxParamsNames.indexOf(args['url'])];
                }
                for (var i in param) {
                    if (i == "others") {
                        for (var j in param[i]) {
                            param[i][j](args);
                        }
                    } else {
                        if (i in defaultDear) {
                            defaultDear[i](args,param[i]);
                        }
                    }
                }
                if (cor) {
                    args.xhrFields = {
                        withCredentials:true
                    };
                }
                console.log(args);
                target.apply($,[args]);
            }
        });
    } else {
        $.ajax_ = $.ajax;
        $.ajax = function (args) {
            var param = {};
            if ("name" in args && (ajaxParamsNames.indexOf(args['name']) + 1)) {
                param = ajaxParams[ajaxParamsNames.indexOf(args['name'])];
            } else if ("url" in args && (ajaxParamsUrls.indexOf(args['url']) + 1)) {
                param = ajaxParamsUrls[ajaxParamsNames.indexOf(args['url'])];
            }
            for (var i in param) {
                if (i == "others") {
                    for (var j in param[i].others) {
                        param[i].others[j](args);
                    }
                } else {
                    defaultDear[i](args,param[i]);
                }
            }
            if (cor) {
                args.xhrFields = {
                    withCredentials:true
                };
            }
            console.log(args);
            $.ajax_(args);
        }
    }
    window.$AjaxProxy = {
        sets : function (objArr) {
            var $this = this;
            objArr.forEach(function (obj) {
                $this.set(obj);
            });
        },
        /**
         * obj = {
         *      type : "get/post/put",//发送类型
         *      jsonType : "strict/normal/join",//严格/正常/连接
         *      name ; "login",//相当于id,
         *      url : "/hello/login",//请求位置 也可以相当于id,
         *      others : {},
         *      preUlr : "",默认使用 baseUrl 作为 url 前缀
         * }
         * */
        set : function (obj) {
            ajaxParams.push({
                type : obj.type || "get",
                url : (obj.preUrl || baseUrl) + (obj.url || ""),
                jsonType : obj.jsonType || ""
            });
            if (obj.name)
                ajaxParamsNames.push(obj.name || "");
            if (obj.url)
                ajaxParamsUrls.push(obj.url || "");
        }
    };
    return $AjaxProxy;
});