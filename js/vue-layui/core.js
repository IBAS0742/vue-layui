/**
 * 封装缺点：必须有一个主页默认显示，并且该主页无法关闭
 * */

Vue.use(Vuex);

window.mainStore = new Vuex.Store({
    state: {
        bottomHTML : '底部文字',
        pageOPName : "页面操作",
        logo : "集团系统",
        lefttopmenu : [
            // {
            //     iconHtml : "<i class='iconfont icon-menu1'></i>",
            //     event : function () {
            //         console.log("fe");
            //     }
            // }
        ],
        righttopmenu : [
            // {
            //     iconHtml : "<i class='iconfont icon-shezhi1'></i>",
            //     text : "second",
            //     url : "page/user/userInfo.html" //弃用
            // },
            // {
            //     iconHtml : "<i class='iconfont icon-shezhi1'></i>",
            //     text : "third",
            //     click : function () {
            //         console.log("fe");
            //     }
            // }
        ],
        tabFrame : [
            // {
            //     url : "page/office/office.html"
            // }
        ],
        tabTitles : [
            // {
            //     iconHtml: "<i :class=\"indexIcon\"></i>",
            //     name: "窗口",
            //     id : 'first'
            // }
        ],
        menus : [],
        showMenu : ""
    },
    mutations: {
    }
});
var layui_prex = "layui";

/**
 * $ref.openTabMaxWidth
 * $ref.openTabUL
 * */
Vue.component(layui_prex + "vuelayermain",{
    template :
        '<!-- 主体 -->\
        <div ref="main" class="layui-layout layui-layout-admin showMenu">\
            <!-- 顶部 -->\
            <div class="layui-header header">\
                <div class="layui-main">\
                    <!-- logo -->\
                    <a style="background-color: #404040;" href="#" class="logo" v-html="logo"></a>\
                    <!-- 顶部菜单项 -->\
                    <' + layui_prex + 'lefttopmenu v-for="(tm,ind) in lefttopmenu" :key="ind" :menu="tm"></' + layui_prex + 'lefttopmenu>\
                    <!-- 顶部右侧菜单 -->\
                    <ul class="layui-nav top_menu">\
                        <' + layui_prex + 'righttopmenu v-for="(tm,ind) in righttopmenu" :key="ind" :menu="tm"></' + layui_prex + 'righttopmenu>\
                    </ul>\
                </div>\
            </div>\
            <!-- 左侧导航 -->\
            <div class="layui-side layui-bg-black">\
                <div class="navBar layui-side-scroll">\
                    <ul class="layui-nav layui-nav-tree" lay-filter="menus">\
                        <' + layui_prex + 'leftmenu v-for="(menu,ind) in menus" :key="ind" :menu="menu" @openurl="openurl"></' + layui_prex + 'leftmenu>\
                    </ul>\
                </div>\
            </div>\
            <!-- 右侧内容 -->\
            <div class="layui-body layui-form">\
                <div class="layui-tab marg0" lay-filter="bodyTab" id="top_tabs_box">\
                    <!-- 打开项 -->\
                    <ul ref="openTabUL" \
                        @mousedown.stop="dragStart($event)" \
                        @mousemove.stop="draging($event)" \
                        @mouseup.stop="dragEnd($event)" \
                        class="layui-tab-title top_tab" id="top_tabs">\
                        <' + layui_prex + 'tabtitle v-for="(tt,ind) in tabTitles" \
                            @close="closeTab(ind)"\
                            @active="activeTab(ind)"\
                            @mousedown.native=""\
                            :tabTitle="tt" \
                            :index="ind" \
                            :key="ind"\
                            ></' + layui_prex + 'tabtitle>\
                        <!--<li class="layui-this" lay-id=""><i :class="indexIcon"></i> <cite>{{indexName}}</cite></li>-->\
                    </ul>\
                    <!-- 菜单 -->\
                    <ul class="layui-nav closeBox">\
                        <li class="layui-nav-item">\
                            <a href="javascript:;"><i class="iconfont icon-caozuo"></i>{{pageOPName}}</a>\
                            <dl class="layui-nav-child ibasNav">\
                                <dd @click="closeAllTab">\
                                    <a href="javascript:;">\
                                        <i class="layui-icon">&#x1002;</i> 关闭所有\
                                     </a>\
                                </dd>\
                                <dd @click="closeOthers">\
                                    <a href="javascript:;">\
                                        <i class="iconfont icon-prohibit"></i> 关闭其他\
                                     </a>\
                                </dd>\
                                <dd @click="refleshTab">\
                                    <a href="javascript:;">\
                                        <i class="layui-icon">&#x1002;</i> 刷新当前\
                                     </a>\
                                </dd>\
                            </dl>\
                        </li>\
                    </ul>\
                    <!-- 子页 -->\
                    <div class="layui-tab-content clildFrame" ref="openTabMaxWidth">\
                        <' + layui_prex + 'tabFrame v-for="(tf,ind) in tabFrame" :key="ind" :tf="tf"></' + layui_prex + 'tabFrame>\
                    </div>\
                </div>\
            </div>\
            <!-- 底部 -->\
            <div class="layui-footer footer" v-html="bottomHTML"></div>\
        </div>',
    data : function () {
        return {
            curTab : 0,
            canReflesh : true,
            openTabs : {},
            tabInfo : {
                curTabLeft : 0,
                tabDraging : false,
                tabDragStartX : 0,
                maxWidth : 0,
                canDrag : false,
                tmpTabLeft : -1
            },
            menuShow : false
        }
    },
    computed : {
        tabFrame : function () {
            return mainStore.state.tabFrame;
        },
        tabTitles : function () {
            return mainStore.state.tabTitles;
        },
        bottomHTML : function () {
            return mainStore.state.bottomHTML;
        },
        pageOPName : function () {
            return mainStore.state.pageOPName;
        },
        pageOPs : function () {
            return mainStore.state.pageOPs;
        },
        logo : function () {
            return mainStore.state.logo;
        },
        lefttopmenu : function () {
            return mainStore.state.lefttopmenu;
        },
        righttopmenu : function () {
            return mainStore.state.righttopmenu;
        },
        menus : function () {
            return mainStore.state.menus;
        },
        showMenu : function () {
            switch (mainStore.state.showMenu) {
                case "open":
                    return "open";
                case "close" :
                    return "close";
                default :
                    return "";
            }
        }
    },
    methods : {
        alert : function (content,title) {
            layer.open({
                type: 1,
                title : title || "警告",
                content: content
            });
        },
        closeTab : function (ind) {
            var tt = this.tabTitles.splice(ind,1);
            this.openTabs[tt[0].id] = 0;
            this.tabFrame.splice(ind,1);
            if (ind <= this.curTab) {
                //关闭当前的 tab
                this.curTab--;
            }
            var id = this.tabTitles[this.curTab].id;
            var $this = this;
            setTimeout(function () {
                element.tabChange('bodyTab',id);
                $this.checkTabUlLeft();
            },50);
        },
        closeAllTab : function () {
            var t = 0;
            while (this.tabFrame.length > 1) {
                this.tabFrame.pop();
                t++;
            }
            while (this.tabTitles.length > 1) {
                var tt = this.tabTitles.pop();
                this.openTabs[tt.id] = 0;
            }
            if (!t) {
                layer.msg("已经没有其他可以关闭了");
            }
            //关闭当前的 tab
            this.curTab = 0;
            element.tabChange('bodyTab',this.tabTitles[this.curTab].id);
            this.checkTabUlLeft();
        },
        closeOthers : function () {
            var i,
                t = 0;
            for (i = this.tabFrame.length - 1;i > 0;i--) {
                if (i != this.curTab) {
                    this.tabFrame.pop();
                    t++;
                }
            }
            if (!t) {
                layer.msg("已经没有其他可以关闭了");
            }
            for (i = this.tabTitles.length - 1;i > 0;i--) {
                if (i != this.curTab) {
                    var tt = this.tabTitles.pop();
                    this.openTabs[tt[0].id] = 0;
                }
            }
            this.curTab = (this.curTab ? 0 : 1);
            this.checkTabUlLeft();
        },
        activeTab : function (ind) {
            //将 tab 尽可能往中间放
            this.curTab = ind;
            this.checkTabUlLeft();
        },
        checkTabUlLeft : function () {
            if (this.tabInfo.tabDraging) {
                return;
            }
            //计算当前的宽度是否适合放下所有的 tab
            var maxWidth = this.$refs.openTabMaxWidth.clientWidth,
                curWidth = this.$refs.openTabUL.clientWidth;
            if (maxWidth >= curWidth) {
                //不管了
                this.tabInfo.canDrag = false;
                this.$refs.openTabUL.style.left = "0px";
            } else {
                var ind = this.curTab;
                //最终将计算出来的居左距离
                var targetLeft = 0;
                var lis = this.$refs.openTabUL.getElementsByTagName("li");
                //当前居左
                var liLeft = lis[ind].offsetLeft;
                var liWidth = lis[ind].clientWidth;
                //当前居右
                var liRight = curWidth - liLeft - liWidth;
                //理想的中间
                var mid = (maxWidth - liWidth) / 2;
                if (liLeft < mid) {
                    targetLeft = 0;
                } else if (liRight < mid) {
                    targetLeft = curWidth - maxWidth;
                } else {
                    targetLeft = liLeft - mid;
                }
                this.tabInfo = {
                    curTabLeft : targetLeft,
                    tabDraging : false,
                    tabDragStartX : 0,
                    maxWidth : curWidth - maxWidth,
                    canDrag : true,
                    tmpTabLeft : -1
                };
                this.$refs.openTabUL.style.left = (- targetLeft) + "px";
            }
        },
        refleshTab : function() {
            if (this.canReflesh) {
                this.canReflesh = false;
                var $this = this;
                setTimeout(function () {
                    $this.canReflesh = true;
                },4000);
                $('[lay-filter="bodyTab"]').find('.layui-show>iframe')[0].contentWindow.location.reload();
            } else {
                layer.msg("请缓一下，频繁刷新我会受不了，\n大概能接受 4s 一次刷新。");
                return ;
            }
        },
        openurl : function (menu) {
            if (this.openTabs[menu.id]) {
                this.curTab = this.openTabs[menu.id];
                element.tabChange('bodyTab',this.tabTitles[this.curTab].id);
            } else {
                this.openTabs[menu.id] = this.tabFrame.length;
                this.curTab = this.tabFrame.length;
                this.tabTitles.push({
                    iconHtml: menu.iconHtml,
                    name: menu.title,
                    id : menu.id
                });
                this.tabFrame.push({
                    url : menu.href
                });
                var $this = this;
                setTimeout(function () {
                    element.tabChange('bodyTab',menu.id);
                    $this.checkTabUlLeft();
                },100);
            }
        },
        dragStart : function ($e) {
            if (this.tabInfo.canDrag) {
                $e.preventDefault();
                this.tabInfo.tabDraging = true;
                this.tabInfo.tabDragStartX = $e.clientX;
            }
        },
        draging : function ($e) {
            if (this.tabInfo.tabDraging) {
                $e.preventDefault();
                var info = this.tabInfo;
                var offsetX = $e.clientX - info.tabDragStartX;
                var cur = info.curTabLeft - offsetX;
                if (cur < 0) {
                    cur = 0;
                } else if (cur > info.maxWidth) {
                    cur = info.maxWidth;
                }
                this.tabInfo.tmpTabLeft = cur;
                this.$refs.openTabUL.style.left = (- cur) + "px";
            }
        },
        dragEnd : function ($e) {
            this.tabInfo.tabDraging = false;
            if (this.tabInfo.tmpTabLeft != -1) {
                $e.preventDefault();
                this.tabInfo.curTabLeft = this.tabInfo.tmpTabLeft;
                this.tabInfo.tmpTabLeft = -1;
            }
        }
    },
    mounted : function () {
        setTimeout(function () {
            element.tabChange('bodyTab',"first");
        },200);
        $('[data-url]').on('click',function () {
            var url = this.getAttribute("data-url");
            layer.open({
                type : 2,
                content : url,
                area : ["100%","100%"],
                maxmin : true
            });
        });
    },
    watch : {
        menus : function () {
            setTimeout(function () {
                element.render();
            },100);
            if (!this.menuShow) {
                this.menuShow = true;
                this.$refs.main.classList.remove("showMenu");
            }
        },
        showMenu : function (val,oldVal) {
            if (val == "open") {
                this.$refs.main.classList.remove("showMenu");
            } else if (val == "close") {
                this.$refs.main.classList.remove("showMenu");
                this.$refs.main.classList.add("showMenu");
            } else {
                this.$refs.main.classList.remove("showMenu");
                this.$refs.main.classList.add("showMenu");
            }
        }
    }
});

Vue.component(layui_prex + "lefttopmenu",{
    template : '<a href="javascript:;" style="margin-left: 0.5em;" class="leftTopMenu" @click="menu.event" v-html="menu.iconHtml"></a>',
    props : ['menu'],
    computed : {
    }
});

Vue.component(layui_prex + "righttopmenu",{
    template :
        '<li class="layui-nav-item">\
            <a href="javascript:;" @click="menu.click" v-html="content">\
            </a>\
        </li>',
    props : ['menu'],
    computed : {
        content : function () {
            return this.menu.iconHtml + '<cite>' + this.menu.text + '</cite>'
        }
    }
});

/**
 * iconHtml
 * name
 * first
 *      非 first 需要绑定一个 close 事件
 * close 关闭页
 * active 活动页
 * */
Vue.component(layui_prex + 'tabtitle',{
    template :
            '<li :lay-id="tabTitle.id" @click="active">' +
            '   <i v-html="html"></i>' +
            '   <i v-if="this.index != 0" @click.stop="close" class="layui-icon layui-unselect layui-tab-close">ဆ</i>' +
            '</li>',
    props : ['tabTitle','index'],
    computed : {
        html : function() {
            var tabTitle = this.tabTitle;
            return (
                    (tabTitle.iconHtml || "") +
                    ' <cite>'+ tabTitle.name + '</cite>'
                );
        }
    },
    methods : {
        close : function () {
            this.$emit("close");
        },
        active : function () {
            this.$emit("active");
        }
    }
});

/**
 * show
 * url
 * */
Vue.component(layui_prex + 'tabFrame',{
    template :
        '<div class="layui-tab-item">' +
        '   <iframe :src="tf.url"></iframe>' +
        '</div>',
    props : ['tf']
});

/**
 * iconHtml
 * href
 * title
 * children : [{
 *      iconHtml
 *      href
 *      title
 * }]
 * */
Vue.component(layui_prex + 'leftmenu',{
    template :
        '<li class="layui-nav-item" v-if="menu.children">\
            <a href="javascript:;" v-html="title">\
            </a>\
            <dl class="layui-nav-child">\
                <dd v-for="(cm,ind) in menu.children" :key="ind" @click="openUrl(cm)">\
                    <a href="javascript:;">\
                        <i v-html="cm.iconHtml"></i>\
                        <span>{{cm.title}}</span>\
                    </a>\
                </dd>\
            </dl>\
        </li>\
        <li class="layui-nav-item" v-else @click="openUrl(menu)">\
            <a href="javascript:;" v-html="title">\
            </a>\
        </li>',
    props : ['menu'],
    computed : {
        title : function () {
            return ((this.menu.iconHtml + "&nbsp;&nbsp;") || "") + "<span>" + this.menu.title + "</span>"
        }
    },
    methods : {
        openUrl : function (menu) {
            this.$emit("openurl",menu);
        }
    }
});