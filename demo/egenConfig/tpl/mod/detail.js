/**
 * @file ${modName}模块详情修改action
 * @author ${userName} (${email})
 * @date ${createDate} 
 */

/**
 * ${actionName}
 * @constructor
 */
define(function (require) {
    var config = require('./config');
    require('tpl!./tpl/${tplFileName}.tpl.html');
    var DetailAction = require('er/DetailAction');
    ${actionName} = function(){
        DetailAction.call(this);
    };
    
    /**
     * to delete this comment
     * Detail页面主要API：
     * view 必须
     * initModel/CONTEXT_INITER_LIST 可选，基本都有
     * afterInit 必须
     * enterDocumentInternal 可选，一般没有
     * initBehaviorInternal 可选
     * modHandler 必须，点击修改打开modFrame的事件
     * saveHandler 必须，打开modFrame后点击保存的事件
     */
    ${actionName}.prototype = {
        view: '${viewName}',
        
        /**
         * 如果跨模块非正常的跳转，url上带上referer即可
         * @type {string}
         */
        BACK_LOCATION: '/${actionName}/list',
        
        /**
         * 数据初始化
         * @protected
         * @param {Object} argMap 初始化的参数.
         * @param {Function}
         */
        initModel: function (query, callback) {
            //ADD CODE HERE
            //e.g.
            /*                
            //取全局常量中字典项
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
        afterInit: function () {
            //继承自DetailAction，故须要声明'form'
            this.form = this.page.c('form');
        },
        
        /**
         * 页面控件已渲染(page.render)后的操作，如页面状态的修改切换等
         * @protected
         */
        enterDocumentInternal: function () {
            //ADD CODE HERE
            //e.g. 根据业务逻辑设置一些元素display = none;之类
        },
    
        /**
         * 绑定页面事件
         * @protected
         */
        initBehaviorInternal: function () {
            //ADD CODE HERE
        },
        
        /**
         * 点击修改事件
         * 打开modFrame，需要在编辑框中绑定当前值
         * @protected
         */
        modHandler : function () {
            //ADD CODE HERE e.g.
            /*
            var me = this;
            return function (callback){
                var modCtrl = this;
                me.modManager.set(modCtrl);
                switch(modCtrl.id){
                    case 'modFrUserName':
                        modCtrl.c('userName').setValue(modCtrl.editText);
                        break;                               
                    
                    case 'modFrPassword':
                        modCtrl.c('newPasswd').setValue('');
                        modCtrl.c('oldPasswd').setValue('');
                        modCtrl.c('password2').setValue('');
                        break; 
                     
                }
                callback();
            };
            */
        },
        
        /**
         * 保存事件
         * @protected
         */
        saveHandler : function (field) {
            //ADD CODE HERE
            //e.g.
            /*
            var me = this;
            return function(callback){
                var modCtrl = this;
                switch(modCtrl.id){
                    case 'modFrUserName':
                        var v = modCtrl.c('userName').getValue();                    
                        if(!modCtrl.validate()){return;}
                        ${actionName}.data.update('xxx=xxx&...', function(data){
                            if(data.success === 'true'){
                                callback(baidu.string.encodeHTML(v));
                            }else{
                                modCtrl.showError(dn.util.parseMessage(data.message));
                            }
                        });
                        break;
                    case 'modFrPassword':
                        //...
                        break;
                }       
            } 
            */
        },
        /*
         * action销毁处理handler
         * @protected
         */
        leave: function () {
            ${actionName}.superClass.leave.call(this);
        }
    };
    
    baidu.inherits(${actionName}, DetailAction);
    
    return ${actionName};
});
