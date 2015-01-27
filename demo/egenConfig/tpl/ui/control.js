
/**
 * @file ${modName}模块表单action
 * @author ${userName} (${email})
 * @date ${createDate} 
 */
define(function (require) {
    require('tpl!./tpl/${className}.html');
    
    var ${superClassName} = require('./${superClassName}');
    
    /**
     * ${className}
     * @constructor
     * @param {Object} options 控件初始化参数.
     * @extends ${superClassName}
     */
    ${className} = function (options) {
        ${superClassName}.call(this, options);
        
        /**
         * 控件的类型，用来生成class的时候用到
         * @type {string}
         */
        this.type = '${type}'; 
        
        /**
         * 使用的模板
         * @type {string}
         */
        this.view = '${viewName}';
        
        /**
         * 设置控件属性默认值 e.g.
         * @override
         * 
        this.setDefault({
            width: 80
        });
        */
    };
    
    
    ${className}.prototype = function () {
    
        //私有方法 e.g.
        /**
         * 点击处理函数
         * inner 
         */
        function clickHandler() {
            this.onclick();
        }
    
        return {
            
            onclick: function () {},
            
            /**
             * to delete this comment
             * 根据模板view生成控件树
             * 若没有使用模板，但又想在render前添加其他子控件或dom对象时可使用该函数，一般不推荐。
             *   添加单独子控件可以 new ui.XXX;this.addChild(xx);
             *   对模板内生成控件可以 ui.util.buildControlTree
             * 大部分控件不需要该方法，可删除。
             */        
            /**
             * 根据模板view生成控件树
             * @protected
             */
            init: function () {
                ${className}.superClass.init.call(this);
                
                //add code here
            },
    
            /**
             * 为控件属性赋上model里的值，在render前准备好控件各属性值
             * 作为简单控件，可以对控件属性做些改变，或根据属性值对其他属性再赋值
             * 作为组合控件，通常需要在此为其子控件手动bindModel
             * 若无上述需求，一般不需要重写bindModel方法，可删除。
             */
            /**
             * 为控件属性赋上model里的值，在render前准备好控件各属性值
             * @protected
             */
            bindModel: function (model) {
                ${className}.superClass.bindModel.call(this, model);
                
                //add code here
                //根据控件属性，做一些修改或为其他属性赋值
                /**e.g:
                  if (parseInt(this.width, 10) > 0) {
                      this.labelMaxWidth = parseInt(this.width, 10) - 100;
                  } else {
                      this.labelMaxWidth = 0;
                  }
                 */
                //为子控件bindModel：
                /**e.g:
                this.c('list').bindModel({
                    datasource2: this.datasource,
                    fields: this.fields
                });             
                */
            },
    
            /**
             * 渲染控件
             * @param {Element} opt_main 一般不需要设置
             * @protected
             */
            render: function (opt_main) {
                ${className}.superClass.render.call(this, opt_main);
                
                //如果需要根据某属性值来使部分内容显示或隐藏，逻辑在这里写。
                //如果控件本身没有模板，则在此给this.main赋innerHTML
            },
    
            /**
             * 绑定事件
             * @protected
             */
            bindEvent: function () {
                ${className}.superClass.bindEvent.call(this);
    
                //尽量使用baidu.fn.bind
                //this.c('btnOk').onclick = baidu.fn.bind(clickHandler, this);
            },
    
            /**
             * 销毁控件
             * @protected
             */
            dispose: function () {
                //this.c('btnOk').onclick = null;
    
                ${className}.superClass.dispose.call(this);
            }
        };
    }();
    
    baidu.inherits(${className}, ${superClassName});
    return ${className};
});
