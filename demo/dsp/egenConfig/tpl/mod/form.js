/**
 * @file ${modName}模块表单action
 * @author ${userName} (${email})
 * @date ${createDate} 
 */

define(function (require) {
    var config = require('./config');
    require('tpl!./tpl/${tplFileName}.tpl.html');
    var FormAction = require('er/FormAction');
    /**
     * ${actionName}
     * @constructor
     */
    ${actionName} = function () {
        FormAction.call(this);
    };
    
    /**
     * to delete this comment
     * Form页面主要API：
     * view 必须
     * initModel/CONTEXT_INITER_LIST 可选，基本都有
     * afterInit 必须
     * enterDocumentInternal 可选，一般没有
     * initBehaviorInternal 可选，但一般都有
     */
    ${actionName}.prototype = {
        view: '${viewName}',
        
        /**
         * 如果跨模块非正常的跳转，url上带上referer即可
         * @type {string}
         */
        BACK_LOCATION: '/${modName}/list',
        
        
        /*
         * 模板所需的数据
         * @type {Object}
         */
        data: {
            
        },
        
        /**
         * 数据初始化
         * @protected
         * @param {Object} argMap 初始化的参数.
         * @param {Function}
         */
        initModel: function (argMap, callback) {
            //多个并行/串行请求处理可以分别使用
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
            
            
            //如果创建和修改页面在一起，则需要isModify来区分，
            //在本次平台修改大多都是针对单个字段的修改，所以一般用不到
            //e.g.
            /*
            if(this.isModify()){
                me.model.headerText = '修改消息';
                ${modName}.data.read('id=' + this.model.id)
                    .done(function(data){
                            var msg = data.result;
                            me.model.xxx = baidu.string.decodeHTML(msg.title); 
                            callback();
                        }
                    );
            }
            else{
                callback();
            } 
            */    
            
            //以下这句仅用于脚手架生成模块后即能看到页面
            callback();
        },
        
        /**
         * 页面控件创建(page.init)完后操作，声明一些主要控件供父类操作
         * @protected
         */
        afterInit: function () {
            //继承自FormAction，故须要声明'form', 'btnSubmit', 'btnCancel' 及 'requester'
            this.form = this.page.c('form');
            this.btnSubmit = this.form.c('btnSubmit');
            this.btnCancel = this.form.c('cancelLink');
            this.requester = config.data.create;
        },
        
        /**
         * 页面控件已渲染(page.render)后的操作，如页面状态的修改切换等
         * @protected
         */
        enterDocumentInternal: function () {
            //ADD CODE HERE
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
         * 表单提交时的跨控件验证
         * @protected
         * @return {boolean} true/false
         */
        associateValidate: function () {
            //MUST RETURN TRUE OR FALSE!
            //此API用的不多，一般验证交给控件自己，仅跨控件验证时需要
            var rtn = true;
            //e.g.
            /*
            if (parseInt(this.form.c('txtMaxImpressionPerDay').getValue(), 10) >
                parseInt(this.form.c('txtMaxImpressionPerCycle').getValue(), 10)) {
                ui.util.validate.showError(
                    baidu.g(this.form.c('txtMaxImpressionPerDay').getId()), 
                    '按天的频次必须小于按广告投放周期的频次'
                );
                rtn = false;
            }
            */
            //对应的隐藏方法为
            //ui.util.validate.hideError(baidu.g(this.form.c('txtMaxImpressionPerDay').getId()));
            return rtn;
        },
        
        /**
         * 提交表单时添加额外参数
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
        
        /*
         * action销毁处理handler
         * @protected
         */
        leave: function () {
            
            ${actionName}.superClass.leave.call(this);
        }
    };
    
    baidu.inherits(${actionName}, FormAction);

    return ${actionName};
});