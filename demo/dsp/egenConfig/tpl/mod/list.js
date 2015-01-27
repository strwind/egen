/**
 * @file ${modName}模块列表action
 * @author ${userName} (${email})
 * @date ${createDate} 
 */
define(function (require) {
    var config = require('./config');
    require('tpl!./tpl/${tplFileName}.tpl.html');
    var ListAction = require('er/ListAction');
    /**
     * ${actionName}
     * @constructor
     */
    ${actionName} = function () {
        ListAction.call(this);
    };
    
    /**
     * to delete this comment
     * List页面主要API：
     * view 必须
     * initModel/CONTEXT_INITER_LIST 可选，基本都有
     * afterInit 必须
     * enterDocumentInternal 可选，一般没有
     * initBehaviorInternal 可选，但一般都有
     */
    ${actionName}.prototype = {
        view: '${viewName}',
    
        /**
         * 数据初始化
         * @protected
         * @param {Object} argMap 初始化的参数.
         * @param {Function}
         */
        initModel:function (query, callback) {
            //ADD CODE HERE
            //e.g.
            //同页面动态字段可调用dn.util.customFields方法，一般用不到 
            this.model.fields = config.fields;
            /* 
            //取全局常量中字典项<或直接在模板中写： ’datasource:*messageTypeList‘>
            this.model.messageLevel = er.context.get('messageTypeList');
            //必须有，否则action流程走不下去
            callback();
            */
            
            
            //多个并行/串行请求处理可以分别使用ParallelWorkerManager/SerialWorkerManager
            //e.g.
            /*
           //使用Deferred来管理并行加载  （比较常用）
            var deferred1 = demo.data.list('a=1&b=1');
            deferred1.done(function(data) {
                console.log(1);
            });
            
            var deferred2 = demo.data.list('a=2&b=2');
            deferred2.done(function(data) {
                console.log(2);
            });
            
            Deferred.all([deferred1, deferred2]).then(callback);
            //或者
            Deferred.all(deferred1, deferred2).then(callback);
            
            //使用Deferred来管理串行加载 （不常用）
            
            var deferred1 = demo.data.list('a=1&b=1');
            deferred1
                .then(function(data) {
                    console.log('i,m demo list');
                    return data;
                })
                .then(function (data) {
                   var deferred2 = demo.data.list('a=2&b=2');
                   return deferred2.done(function (data) {
                       console.log("i,m demo list2");
                       callback();
                   });
                })
            });
            */
            
            //以下这句仅用于脚手架生成模块后即能看到页面
            callback();
            
        },
    
        /**
         * 页面控件创建(page.init)完后操作，声明一些主要控件供父类操作
         * @protected
         */
        afterInit: function (page) {
            //继承自ListAction，故须要声明'form', 'list', 'pnlBatch' 及 'requesterList'
            //'multiCalendar' 用于列表右侧的日历，页面无则可删除之
            /* e.g.
            this.form = page.c('formSearch');
            this.pnlBatch = page.c('pnlOperation');
            this.multiCalendar = this.form.c('multiCal');
            */
            this.list = page.c('list');
            this.requesterList = config.data.list;
        },
        
        /**
         * 页面控件已渲染(page.render)后的操作，如页面状态的修改切换等
         * @protected
         */
        enterDocumentInternal: function () {
            //ADD CODE HERE
        },
    
        /**
         * 绑定页面事件
         * @protected
         */
        initBehaviorInternal: function (page) {
            //ADD CODE HERE
            //e.g.
            /*
            var me = this;
            //新建按钮跳转 使用redirectHandler
            //this.page.c('btnCreate').onclick = dn.util.redirectHandler('#/${actionName}/create');
            me.pnlBatch.c('btnDelete').onclick = baidu.fn.bind(
                dn.util.confirmHandler,
                me,
                {
                    'content': '您确定要删除所选消息吗？',
                    'handler': me._batchEvent['delete']
                }
            );
            */
        },
        
        /**
         * 提交搜索表单时添加额外参数
         * @protected
         * @return {string}
         */
        getExtraParam: function () {
            //ADD CODE HERE
            //e.g.
            /*
            return this.model.id ? 
                'id=' + this.model.id :
                '';
            */
            return '';
        },
        
        //绑定事件时用到的一些方法 to delete this e.g.
        /*   
        _batchEvent:{
            'delete': function(argMap) {
                this.requesterBatch = message.data.batchDelete;
                this.batchUpdate(argMap);
            },
            'resend': funciton(argMap) {
                //...
            }
        },
        */
       
        /*
         * action销毁处理handler
         * @protected
         */
        leave: function () {
            ${actionName}.superClass.leave.call(this);
        }
    };
    
    baidu.inherits(${actionName}, ListAction);
    
    return ${actionName};
});